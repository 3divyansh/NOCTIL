import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { SectionHeading } from '@/components/SectionHeading';
import { testimonials } from '@/data/testimonials';

import 'swiper/css';
import 'swiper/css/pagination';

export function CustomerReviews() {
  return (
    <section id="reviews" className="relative overflow-hidden py-32">
      {/* Ambient glow */}
      <div className="absolute left-1/2 top-1/2 h-[50vh] w-[50vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(176,141,79,0.08),transparent_70%)] blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="The Collector's Voice"
          title={
            <>
              Trusted by those
              <br />
              <span className="italic text-gradient-gold">who know.</span>
            </>
          }
          description="From Geneva to Tokyo, the collectors who wear NOCTIL share a single standard."
        />
      </div>

      <div className="mt-16 w-full pl-6 lg:pl-10">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={32}
          slidesPerView={1.1}
          grabCursor
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3 },
          }}
          className="!pb-16"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <article className="flex h-full flex-col gap-6 rounded-2xl glass p-8">
                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <span key={i} className="text-gold">★</span>
                  ))}
                </div>

                {/* Quote */}
                <p className="flex-1 text-sm leading-relaxed text-ink-soft">
                  "{t.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 border-t border-ink/8 pt-5">
                  <div className="h-12 w-12 overflow-hidden rounded-full">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-ink">
                      {t.name}
                    </span>
                    <span className="text-[10px] tracking-luxe-sm uppercase text-ink-muted">
                      {t.title} · {t.location}
                    </span>
                  </div>
                </div>

                {/* Watch */}
                <div className="flex items-center justify-between">
                  <span className="text-[9px] tracking-luxe-sm uppercase text-ink-muted">
                    Wears
                  </span>
                  <span className="text-xs text-gold">{t.watch}</span>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
