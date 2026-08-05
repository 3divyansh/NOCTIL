import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { INSTAGRAM_IMAGES } from '@/constants';

export function InstagramGallery() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[10px] tracking-luxe uppercase text-gold"
          >
            @noctil.watches
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl font-light text-ink md:text-6xl"
          >
            Worn around the world
          </motion.h2>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {INSTAGRAM_IMAGES.map((img, i) => (
            <motion.a
              key={i}
              href="#"
              data-cursor="open"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative aspect-square overflow-hidden rounded-xl"
            >
              <img
                src={img}
                alt={`Instagram post ${i + 1}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-ivory/0 backdrop-blur-0 transition-all duration-500 group-hover:bg-ivory/40 group-hover:backdrop-blur-sm">
                <Camera className="h-6 w-6 text-ink opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
