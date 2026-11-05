#!/usr/bin/env bash
set -Eeuo pipefail
umask 022
source_dir='/home/marin-propiedades/marin-property-elegance-source'
web='/home/marin-propiedades/htdocs/marinpropiedades.com.ar'
base='https://marinpropiedades.com.ar'
for command in git npm node rsync curl flock tar; do command -v "$command" >/dev/null || { echo "Falta $command"; exit 1; }; done
exec 9>"/home/marin-propiedades/.marin-deploy.lock"
flock -n 9 || { echo 'Hay otro despliegue en curso.'; exit 1; }
cd "$source_dir"
test -d "$web" && test ! -L "$web"
test -z "$(git status --porcelain)" || { echo 'El repositorio tiene cambios locales. Revisalos antes de publicar.'; exit 1; }
commit=$(git rev-parse HEAD)
stage=$(mktemp -d /home/marin-propiedades/marin-build.XXXXXX)
backup="/home/marin-propiedades/backups/marin-$(date +%Y%m%d-%H%M%S)-$$"
changed=0
cleanup() {
  result=$?
  trap - EXIT
  if (( result != 0 && changed == 1 )); then
    echo "Falló la publicación; restaurando $backup/publicacion"
    if rsync -a --delete "$backup/publicacion/" "$web/"; then
      echo 'Archivos anteriores restaurados. Verificar también la caché pública.'
    else
      echo "ERROR DE RESTAURACIÓN: conservar y recuperar $backup/publicacion" >&2
    fi
  fi
  rm -rf -- "$stage"
  exit "$result"
}
trap cleanup EXIT
# Build isolated from working tree: the published code is exactly this commit.
git archive "$commit" | tar -x -C "$stage"
cd "$stage"
npm ci
npm run build
test -s dist/index.html
test -s dist/politica-de-privacidad/index.html
test -s dist/sitemap.xml
grep -q '/politica-de-privacidad</loc>' dist/sitemap.xml
grep -q 'Formularios de Facebook e Instagram' dist/politica-de-privacidad/index.html
mkdir -p "$backup/publicacion"
rsync -a "$web/" "$backup/publicacion/"
printf '%s\n' "$commit" > "$backup/commit-publicado.txt"
git -C "$source_dir" archive "$commit" > "$backup/codigo-publicado.tar"
changed=1
# Publish assets first; retain older hashed assets for already-open tabs.
rsync -a --delay-updates dist/assets/ "$web/assets/"
rsync -a --delay-updates --exclude='/assets/' --exclude='/index.html' dist/ "$web/"
cp dist/index.html "$web/.index-next.html"
mv -f "$web/.index-next.html" "$web/index.html"
cmp dist/index.html "$web/index.html"
cmp dist/politica-de-privacidad/index.html "$web/politica-de-privacidad/index.html"
# A 200 SPA fallback is not enough: compare the actual policy HTML and sitemap.
for pathname in politica-de-privacidad sitemap.xml; do
  expected="dist/$pathname"
  [[ "$pathname" == 'politica-de-privacidad' ]] && expected="$expected/index.html"
  curl --fail --silent --show-error --location --max-time 40 --retry 2 \
    -H 'Cache-Control: no-cache' -D "$stage/headers" "$base/$pathname" -o "$stage/remote"
  if grep -i '^x-robots-tag:.*noindex' "$stage/headers"; then echo 'El servidor impide la indexación'; exit 1; fi
  cmp "$expected" "$stage/remote"
done
curl --fail --silent --show-error --location --max-time 40 "$base/" -o "$stage/home"
cmp dist/index.html "$stage/home"
while IFS= read -r asset; do
  curl --fail --silent --show-error --max-time 30 "$base/${asset#dist/}" -o "$stage/asset"
  cmp "$asset" "$stage/asset"
done < <(find dist/assets -type f \( -name '*.js' -o -name '*.css' \))
changed=0
printf '\nPUBLICACIÓN VERIFICADA\nCommit: %s\nRespaldo: %s\n%s/politica-de-privacidad\n' "$commit" "$backup" "$base"
