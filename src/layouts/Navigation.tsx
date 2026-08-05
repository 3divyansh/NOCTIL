import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, ShoppingBag, User, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { BRAND, NAV_LINKS, SHOP_LINKS, MAISON_LINKS } from '@/constants';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { useRoute, type RouteName } from '@/hooks/useRoute';
import { cn } from '@/utils/cn';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [maisonOpen, setMaisonOpen] = useState(false);
  const progress = useScrollProgress();
  const { count, openCart } = useCart();
  const { count: wishlistCount } = useWishlist();
  const [, navigate] = useRoute();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function go(route: RouteName) {
    navigate(route);
    setMenuOpen(false);
    setShopOpen(false);
    setMaisonOpen(false);
  }

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed left-0 top-0 z-[150] h-px w-full bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-gold-dark via-gold to-gold-light transition-[width] duration-100"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed left-0 right-0 top-0 z-[140] transition-all duration-500',
          scrolled ? 'glass py-3' : 'bg-transparent py-6'
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
          {/* Logo */}
          <button onClick={() => go('home')} className="flex flex-col leading-none">
            <span className="font-display text-2xl font-medium tracking-luxe text-ink">
              {BRAND.name}
            </span>
            <span className="mt-0.5 text-[7px] tracking-luxe uppercase text-gold">
              {BRAND.tagline}
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 lg:flex">
            {/* Shop dropdown */}
            <div
              onMouseEnter={() => setShopOpen(true)}
              onMouseLeave={() => setShopOpen(false)}
              className="relative"
            >
              <button className="flex items-center gap-1 text-[11px] tracking-luxe-sm uppercase text-ink-soft transition-colors hover:text-ink">
                Shop <ChevronDown className="h-3 w-3" />
              </button>
              <AnimatePresence>
                {shopOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-full pt-3"
                  >
                    <div className="flex w-48 flex-col gap-1 rounded-2xl glass p-3 luxury-shadow">
                      {SHOP_LINKS.map((link) => (
                        <button
                          key={link.label}
                          onClick={() => go(link.route as RouteName)}
                          className="rounded-lg px-3 py-2 text-left text-[11px] tracking-luxe-sm uppercase text-ink-soft transition-colors hover:bg-gold/10 hover:text-gold"
                        >
                          {link.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Maison dropdown */}
            <div
              onMouseEnter={() => setMaisonOpen(true)}
              onMouseLeave={() => setMaisonOpen(false)}
              className="relative"
            >
              <button className="flex items-center gap-1 text-[11px] tracking-luxe-sm uppercase text-ink-soft transition-colors hover:text-ink">
                Maison <ChevronDown className="h-3 w-3" />
              </button>
              <AnimatePresence>
                {maisonOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-full pt-3"
                  >
                    <div className="flex w-48 flex-col gap-1 rounded-2xl glass p-3 luxury-shadow">
                      {MAISON_LINKS.map((link) => (
                        <button
                          key={link.label}
                          onClick={() => go(link.route as RouteName)}
                          className="rounded-lg px-3 py-2 text-left text-[11px] tracking-luxe-sm uppercase text-ink-soft transition-colors hover:bg-gold/10 hover:text-gold"
                        >
                          {link.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {NAV_LINKS.filter((l) => !['Collections', 'Categories', 'Maison', 'Contact'].includes(l.label)).map((link) => (
              <button
                key={link.label}
                onClick={() => go(link.route as RouteName)}
                className="text-[11px] tracking-luxe-sm uppercase text-ink-soft transition-colors hover:text-ink"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              aria-label="Search"
              className="hidden h-10 w-10 place-items-center rounded-full text-ink-soft transition-colors hover:text-gold lg:grid"
            >
              <Search className="h-4 w-4" />
            </button>

            <button
              aria-label="Wishlist"
              onClick={() => go('wishlist')}
              className="relative hidden h-10 w-10 place-items-center rounded-full text-ink-soft transition-colors hover:text-gold sm:grid"
            >
              {/* heart icon */}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-gold text-[8px] font-bold text-ivory">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              aria-label="Cart"
              data-cursor="cart"
              onClick={openCart}
              className="relative grid h-10 w-10 place-items-center rounded-full text-ink-soft transition-colors hover:text-gold"
            >
              <ShoppingBag className="h-4 w-4" />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-gold text-[8px] font-bold text-ivory">
                  {count}
                </span>
              )}
            </button>

            <button
              aria-label="Profile"
              onClick={() => go('profile')}
              className="hidden h-10 w-10 place-items-center rounded-full text-ink-soft transition-colors hover:text-gold lg:grid"
            >
              <User className="h-4 w-4" />
            </button>

            <button
              aria-label="Menu"
              onClick={() => setMenuOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-full text-ink lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[160] flex flex-col bg-pearl/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-6">
              <button onClick={() => go('home')} className="font-display text-2xl tracking-luxe text-ink">
                {BRAND.name}
              </button>
              <button onClick={() => setMenuOpen(false)} className="grid h-10 w-10 place-items-center text-ink">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 pb-10">
              {/* Shop section */}
              <span className="mt-4 block text-[10px] tracking-luxe-sm uppercase text-gold">Shop</span>
              {SHOP_LINKS.map((link, i) => (
                <motion.button
                  key={link.label}
                  onClick={() => go(link.route as RouteName)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                  className="block border-b border-ink/8 py-4 text-left font-display text-2xl font-light text-ink"
                >
                  {link.label}
                </motion.button>
              ))}

              <span className="mt-6 block text-[10px] tracking-luxe-sm uppercase text-gold">Maison</span>
              {MAISON_LINKS.map((link, i) => (
                <motion.button
                  key={link.label}
                  onClick={() => go(link.route as RouteName)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.05 }}
                  className="block border-b border-ink/8 py-4 text-left font-display text-2xl font-light text-ink"
                >
                  {link.label}
                </motion.button>
              ))}

              <span className="mt-6 block text-[10px] tracking-luxe-sm uppercase text-gold">Account</span>
              {[
                { label: 'My Profile', route: 'profile' as RouteName },
                { label: 'My Orders', route: 'orders' as RouteName },
                { label: 'Wishlist', route: 'wishlist' as RouteName },
              ].map((link, i) => (
                <motion.button
                  key={link.label}
                  onClick={() => go(link.route)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className="block border-b border-ink/8 py-4 text-left font-display text-2xl font-light text-ink"
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
