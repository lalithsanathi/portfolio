import { useState, useEffect, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";

const MIN_LIGHTBOX_SIZE = 100;

export default function LightboxProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [image, setImage] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.tagName !== "IMG") return;

      const img = target as HTMLImageElement;
      if (!img.closest("[data-lightbox]")) return;
      if (img.closest("[data-no-lightbox]")) return;
      if (
        img.clientWidth < MIN_LIGHTBOX_SIZE ||
        img.clientHeight < MIN_LIGHTBOX_SIZE
      )
        return;

      setImage({ src: img.src, alt: img.alt });
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    if (!image) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setImage(null);
    }

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [image]);

  return (
    <>
      {children}
      <AnimatePresence>
        {image && (
          <motion.div
            key="lightbox"
            className="fixed inset-0 z-50 flex items-center justify-center cursor-zoom-out p-6 md:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setImage(null)}
          >
            <motion.div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />
            <motion.img
              src={image.src}
              alt={image.alt}
              className="relative max-h-full max-w-full rounded-lg object-contain"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              draggable={false}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
