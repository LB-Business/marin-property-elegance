import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Minus, Plus, RotateCcw, X } from "lucide-react";

interface Props {
  images: { url: string }[];
  initialIndex: number;
  title: string;
  onClose: () => void;
}

export function ImageViewer({ images, initialIndex, title, onClose }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const picture = useRef<HTMLImageElement>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const view = useRef({ scale: 1, x: 0, y: 0 });
  const [transform, setTransform] = useState(view.current);
  const [index, setIndex] = useState(initialIndex);
  const [failed, setFailed] = useState(false);

  function update(scale: number, x = view.current.x, y = view.current.y) {
    scale = Math.min(5, Math.max(1, scale));
    const box = stage.current;
    const img = picture.current;
    const maxX = box && img ? Math.max(0, (img.clientWidth * scale - box.clientWidth) / 2) : 0;
    const maxY = box && img ? Math.max(0, (img.clientHeight * scale - box.clientHeight) / 2) : 0;
    view.current = { scale, x: Math.max(-maxX, Math.min(maxX, x)), y: Math.max(-maxY, Math.min(maxY, y)) };
    setTransform(view.current);
  }
  function change(delta: number) {
    setIndex(i => (i + delta + images.length) % images.length);
    setFailed(false);
    pointers.current.clear();
    update(1, 0, 0);
  }

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    const modal = dialog.current!;
    modal.showModal();
    document.body.style.overflow = "hidden";
    const resize = () => update(1, 0, 0);
    window.addEventListener("resize", resize);
    return () => {
      modal.close();
      document.body.style.overflow = overflow;
      window.removeEventListener("resize", resize);
      previous?.focus();
    };
  }, []);

  useEffect(() => {
    const element = stage.current!;
    const wheel = (event: WheelEvent) => {
      event.preventDefault();
      update(view.current.scale * Math.exp(-event.deltaY * 0.002));
    };
    element.addEventListener("wheel", wheel, { passive: false });
    return () => element.removeEventListener("wheel", wheel);
  }, []);

  const control = "flex h-11 min-w-11 items-center justify-center rounded-full border border-white/30 bg-black/40 px-3 text-white hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white disabled:opacity-30";
  return (
    <dialog ref={dialog} aria-label={`Fotos de ${title}`} aria-describedby="photo-help"
      onCancel={event => { event.preventDefault(); onClose(); }}
      onKeyDown={event => {
        if (event.key === "ArrowRight") { event.preventDefault(); change(1); }
        if (event.key === "ArrowLeft") { event.preventDefault(); change(-1); }
      }}
      className="fixed inset-0 m-0 h-[100dvh] max-h-none w-screen max-w-none overflow-hidden border-0 bg-black/95 p-0 text-white backdrop:bg-black/90">
      <div className="flex h-full flex-col">
        <div className="z-10 flex shrink-0 items-center justify-between gap-3 p-3 sm:p-5">
          <p className="min-w-0 truncate text-sm">{title} · {index + 1} / {images.length}</p>
          <button type="button" autoFocus className={control} aria-label="Cerrar fotos" onClick={onClose}><X size={22} /></button>
        </div>
        <div ref={stage} className="relative flex min-h-0 flex-1 touch-none select-none items-center justify-center overflow-hidden"
          style={{ cursor: transform.scale > 1 ? "grab" : "zoom-in" }}
          onDoubleClick={() => update(view.current.scale > 1 ? 1 : 2.5, 0, 0)}
          onPointerDown={event => {
            if (event.pointerType === "mouse" && event.button !== 0) return;
            event.currentTarget.setPointerCapture(event.pointerId);
            pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
          }}
          onPointerMove={event => {
            const old = pointers.current.get(event.pointerId);
            if (!old) return;
            const before = [...pointers.current.values()];
            pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
            const after = [...pointers.current.values()];
            if (after.length === 2) {
              const distance = (p: typeof after) => Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y);
              const start = distance(before);
              if (start > 0) update(view.current.scale * distance(after) / start);
            } else if (after.length === 1 && view.current.scale > 1) {
              update(view.current.scale, view.current.x + event.clientX - old.x, view.current.y + event.clientY - old.y);
            }
          }}
          onPointerUp={event => pointers.current.delete(event.pointerId)}
          onPointerCancel={event => pointers.current.delete(event.pointerId)}
          onLostPointerCapture={event => pointers.current.delete(event.pointerId)}>
          {failed ? <p role="alert">No se pudo cargar esta foto. Probá con la siguiente.</p> :
            <img ref={picture} key={images[index].url} src={images[index].url} alt={`${title}, foto ${index + 1}`} draggable={false}
              onError={() => setFailed(true)}
              className="block h-auto max-h-full w-auto max-w-full object-contain"
              style={{ transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})` }} />}
        </div>
        <div className="z-10 shrink-0 bg-black/60 px-3 pt-3 pb-[max(16px,env(safe-area-inset-bottom))]">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {images.length > 1 && <button type="button" className={control} aria-label="Foto anterior" onClick={() => change(-1)}><ChevronLeft /></button>}
            <button type="button" className={control} aria-label="Alejar" disabled={transform.scale <= 1 || failed} onClick={() => update(view.current.scale - 0.5)}><Minus /></button>
            <span className="w-14 text-center text-sm" aria-live="polite">{Math.round(transform.scale * 100)}%</span>
            <button type="button" className={control} aria-label="Acercar" disabled={transform.scale >= 5 || failed} onClick={() => update(view.current.scale + 0.5)}><Plus /></button>
            <button type="button" className={control} aria-label="Restablecer zoom" onClick={() => update(1, 0, 0)}><RotateCcw size={19} /></button>
            {images.length > 1 && <button type="button" className={control} aria-label="Foto siguiente" onClick={() => change(1)}><ChevronRight /></button>}
          </div>
          <p id="photo-help" className="mt-3 text-center text-xs text-white/65">Usá + y −, la rueda o dos dedos para ampliar. Arrastrá para ver los detalles.</p>
        </div>
      </div>
    </dialog>
  );
}
