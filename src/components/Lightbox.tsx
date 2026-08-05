import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface LightboxProps {
  images: string[];
  index: number;
  onClose: () => void;
}

export function Lightbox({ images, index, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(index);

  function prev() {
    setCurrent((c) => (c - 1 + images.length) % images.length);
  }
  function next() {
    setCurrent((c) => (c + 1) % images.length);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[250] flex items-center justify-center bg-ink/60 backdrop-blur-xl p-6"
    >
      <button
        onClick={onClose}
        className="absolute right-6 top-6 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-ivory hover:bg-white/20 transition-colors"
      >
        <X className="h-6 w-6" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        className="absolute left-4 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-ivory hover:bg-white/20 transition-colors"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <motion.img
        key={current}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        src={images[current]}
        alt=""
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain"
      />

      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        className="absolute right-4 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-ivory hover:bg-white/20 transition-colors"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
            className={`h-1.5 rounded-full transition-all ${i === current ? 'w-8 bg-gold' : 'w-1.5 bg-ivory/30'}`}
          />
        ))}
      </div>
    </motion.div>
  );
}

export function LightboxWrapper({ images, index, onClose }: { images: string[]; index: number; onClose: () => void }) {
  return (
    <AnimatePresence>
      <Lightbox images={images} index={index} onClose={onClose} />
    </AnimatePresence>
  );
}
