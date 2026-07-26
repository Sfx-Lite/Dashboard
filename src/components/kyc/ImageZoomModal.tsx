import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

type ImageZoomModalProps = {
  src: string;
  alt: string;
  onClose: () => void;
};

export default function ImageZoomModal({ src, alt, onClose }: ImageZoomModalProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragState = useRef<{ startX: number; startY: number; originX: number; originY: number } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleImageClick = () => {
    if (isZoomed) {
      setIsZoomed(false);
      setOffset({ x: 0, y: 0 });
    } else {
      setIsZoomed(true);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isZoomed) return;
    dragState.current = {
      startX: e.clientX,
      startY: e.clientY,
      originX: offset.x,
      originY: offset.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragState.current) return;
    const dx = e.clientX - dragState.current.startX;
    const dy = e.clientY - dragState.current.startY;
    setOffset({
      x: dragState.current.originX + dx,
      y: dragState.current.originY + dy,
    });
  };

  const handleMouseUp = () => {
    dragState.current = null;
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-5 right-6 font-rh-sb text-white/90 hover:text-white"
      >
        Close ✕
      </button>

      <motion.div
        className="max-h-[96vh] max-w-[96vw] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      >
        <img
          src={src}
          alt={alt}
          onClick={handleImageClick}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          draggable={false}
          className={`select-none transition-transform duration-200 ${
            isZoomed ? "scale-[2] cursor-grab active:cursor-grabbing" : "scale-100 cursor-zoom-in"
          } max-h-[96vh] max-w-[96vw] object-contain`}
          style={
            isZoomed
              ? { transform: `scale(2) translate(${offset.x / 2}px, ${offset.y / 2}px)` }
              : undefined
          }
        />
      </motion.div>

      <p className="absolute bottom-5 font-rh-sb text-sm text-white/70">
        {isZoomed ? "Click to zoom out · drag to pan" : "Click to zoom in"}
      </p>
    </motion.div>
  );
}