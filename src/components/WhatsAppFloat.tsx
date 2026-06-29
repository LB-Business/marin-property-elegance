import { motion } from "motion/react";

const WHATSAPP_URL = "https://wa.me/5491173610605";

export function WhatsAppFloat() {
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Consultar por WhatsApp"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-50 grid place-items-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-whatsapp text-white shadow-elevated"
    >
      <svg viewBox="0 0 32 32" className="w-7 h-7 md:w-8 md:h-8" fill="currentColor" aria-hidden="true">
        <path d="M16.001 3C9.374 3 4 8.373 4 14.999c0 2.355.69 4.546 1.873 6.395L4 29l7.8-1.834A11.94 11.94 0 0 0 16.001 27C22.627 27 28 21.626 28 14.999 28 8.373 22.627 3 16.001 3zm6.97 17.025c-.296.83-1.717 1.59-2.388 1.69-.61.092-1.382.13-2.227-.139-.513-.163-1.17-.382-2.012-.747-3.54-1.527-5.853-5.087-6.03-5.32-.176-.234-1.444-1.916-1.444-3.656 0-1.74.913-2.595 1.237-2.95.323-.354.706-.443.94-.443.234 0 .47.002.674.012.216.01.506-.082.793.605.296.71 1.005 2.45 1.094 2.628.089.177.148.385.03.62-.118.235-.177.382-.354.59-.176.207-.371.463-.53.62-.176.176-.36.367-.155.72.205.354.911 1.502 1.957 2.434 1.343 1.197 2.476 1.566 2.83 1.744.353.177.56.148.766-.089.207-.235.882-1.029 1.117-1.382.234-.354.47-.295.793-.177.323.118 2.052.967 2.405 1.144.353.176.589.265.677.413.089.148.089.86-.207 1.69z"/>
      </svg>
    </motion.a>
  );
}
