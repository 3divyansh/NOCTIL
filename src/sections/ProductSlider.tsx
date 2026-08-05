import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { ProductCard } from '@/components/ProductCard';
import { SectionHeading } from '@/components/SectionHeading';
import { getNewArrivals, getBestSellers, type Watch } from '@/data/watches';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface ProductSliderProps {
  variant: 'new' | 'bestseller';
  onQuickView: (watch: Watch) => void;
}

export function ProductSlider({
  variant,
  onQuickView,
}: ProductSliderProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const watches = variant === 'new' ? getNewArrivals() : getBestSellers();

  const config = variant === 'new'
    ? {
        eyebrow: 'Just Arrived',
        title: <>New <span className="italic text-gradient-gold">arrivals.</span></>,
      }
    : {
        eyebrow: 'Most Coveted',
        title: <>Best <span className="italic text-gradient-gold">sellers.</span></>,
      };

  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading align="left" eyebrow={config.eyebrow} title={config.title} />
          <div className="flex items-center gap-3">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous"
              className="grid h-12 w-12 place-items-center rounded-full border border-ink/10 text-ink-soft transition-colors hover:border-gold hover:text-gold"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next"
              className="grid h-12 w-12 place-items-center rounded-full border border-ink/10 text-ink-soft transition-colors hover:border-gold hover:text-gold"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-16 w-full pl-6 lg:pl-10">
        <Swiper
          modules={[Pagination, Navigation]}
          onSwiper={(s) => (swiperRef.current = s)}
          spaceBetween={24}
          slidesPerView={1.1}
          grabCursor
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1.5 },
            768: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.2 },
            1280: { slidesPerView: 4 },
          }}
          className="!pb-16"
        >
          {watches.map((watch) => (
            <SwiperSlide key={watch.id} className="!h-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <ProductCard
                  watch={watch}
                  onQuickView={onQuickView}
                />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
