import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useState } from 'react';
import { Cursor } from '@/components/Cursor';
import { QuickViewModal } from '@/components/QuickViewModal';
import { CartDrawer } from '@/components/CartDrawer';
import { Navigation } from '@/layouts/Navigation';
import { Footer } from '@/layouts/Footer';
import { Loader } from '@/layouts/Loader';
import { Hero } from '@/sections/Hero';
import { Watch3DSection } from '@/sections/Watch3DSection';
import { FeaturedCollection } from '@/sections/FeaturedCollection';
import { LuxuryCategories } from '@/sections/LuxuryCategories';
import { ProductSlider } from '@/sections/ProductSlider';
import { EditorsPicks } from '@/sections/EditorsPicks';
import { StorySection } from '@/sections/StorySection';
import { WhyChooseUs } from '@/sections/WhyChooseUs';
import { Specifications } from '@/sections/Specifications';
import { CustomerReviews } from '@/sections/CustomerReviews';
import { InstagramGallery } from '@/sections/InstagramGallery';
import { Newsletter } from '@/sections/Newsletter';
import { CheckoutPage } from '@/pages/CheckoutPage';
import { CheckoutConfirmation } from '@/pages/CheckoutConfirmation';
import { ProductDetails } from '@/pages/ProductDetails';
import { ShopPage } from '@/pages/ShopPage';
import { CategoriesPage } from '@/pages/CategoriesPage';
import { CollectionsPage } from '@/pages/CollectionsPage';
import { ListingPage } from '@/pages/ListingPage';
import { AboutPage } from '@/pages/AboutPage';
import { StoryPage } from '@/pages/StoryPage';
import { ContactPage } from '@/pages/ContactPage';
import { WishlistPage } from '@/pages/WishlistPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { FaqPage } from '@/pages/FaqPage';
import { PrivacyPage } from '@/pages/PrivacyPage';
import { TermsPage } from '@/pages/TermsPage';
import { CartProvider } from '@/hooks/useCart';
import { WishlistProvider } from '@/hooks/useWishlist';
import { OrdersProvider } from '@/hooks/useOrders';
import { ProfileProvider } from '@/hooks/useProfile';
import { useLenis } from '@/hooks/useLenis';
import { useRoute } from '@/hooks/useRoute';
import type { Watch } from '@/data/watches';

function HomePage({
  onQuickView,
}: {
  onQuickView: (watch: Watch) => void;
}) {
  return (
    <main>
      <Hero />
      <Watch3DSection />
      <FeaturedCollection onQuickView={onQuickView} />
      <LuxuryCategories />
      <ProductSlider variant="new" onQuickView={onQuickView} />
      <ProductSlider variant="bestseller" onQuickView={onQuickView} />
      <EditorsPicks onQuickView={onQuickView} />
      <StorySection />
      <WhyChooseUs />
      <Specifications />
      <CustomerReviews />
      <InstagramGallery />
      <Newsletter />
    </main>
  );
}

function AppContent() {
  const [loading, setLoading] = useState(true);
  const [quickView, setQuickView] = useState<Watch | null>(null);
  const [route, navigate] = useRoute();

  useLenis();

  const handleQuickView = useCallback((watch: Watch) => setQuickView(watch), []);
  const handleCloseQuickView = useCallback(() => setQuickView(null), []);

  const showFooter = route.name !== 'checkout' && route.name !== 'confirmation';

  function renderRoute() {
    switch (route.name) {
      case 'home':
        return <HomePage onQuickView={handleQuickView} />;
      case 'shop':
        return <ShopPage onQuickView={handleQuickView} />;
      case 'product':
        return <ProductDetails productId={route.param ?? ''} onQuickView={handleQuickView} />;
      case 'categories':
        return <CategoriesPage />;
      case 'collections':
        return <CollectionsPage />;
      case 'new-arrivals':
        return <ListingPage variant="new" onQuickView={handleQuickView} />;
      case 'best-sellers':
        return <ListingPage variant="bestseller" onQuickView={handleQuickView} />;
      case 'about':
        return <AboutPage />;
      case 'story':
        return <StoryPage />;
      case 'contact':
        return <ContactPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'profile':
        return <ProfilePage />;
      case 'orders':
        return <ProfilePage />;
      case 'faq':
        return <FaqPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'terms':
        return <TermsPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'confirmation':
        return <CheckoutConfirmation />;
      default:
        return <HomePage onQuickView={handleQuickView} />;
    }
  }

  return (
    <>
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <Cursor />
      <Navigation />

      <AnimatePresence mode="wait">
        <motion.div
          key={route.name + (route.param ?? '')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderRoute()}
        </motion.div>
      </AnimatePresence>

      {showFooter && <Footer />}

      <CartDrawer />
      <QuickViewModal watch={quickView} onClose={handleCloseQuickView} />
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <OrdersProvider>
          <ProfileProvider>
            <AppContent />
          </ProfileProvider>
        </OrdersProvider>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
