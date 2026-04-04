import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useEffect } from 'react';
import { WishlistProvider } from './context/WishlistContext';
import { CompareProvider, useCompare } from './context/CompareContext';
import { RecentlyViewedProvider } from './context/RecentlyViewedContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import AgentsPage from './pages/AgentsPage';
import WishlistPage from './pages/WishlistPage';
import ComparePage from './pages/ComparePage';

// يعيد التمرير للأعلى عند كل تغيير في المسار
function RouteScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function CompareToast() {
  const { toast } = useCompare();
  return toast ? (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-slate-800 border border-white/15 text-white text-sm px-5 py-3 rounded-full shadow-xl">
      You can only compare 2 properties at a time.
    </div>
  ) : null;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/"              element={<HomePage />} />
      <Route path="/property/:id" element={<PropertyDetailPage />} />
      <Route path="/agents"       element={<AgentsPage />} />
      <Route path="/wishlist"     element={<WishlistPage />} />
      <Route path="/compare"      element={<ComparePage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <WishlistProvider>
        <CompareProvider>
          <RecentlyViewedProvider>
            <BrowserRouter>
              <RouteScrollReset />
              <Navbar />
              <AppRoutes />
              <Footer />
              <ScrollToTop />
              <CompareToast />
            </BrowserRouter>
          </RecentlyViewedProvider>
        </CompareProvider>
      </WishlistProvider>
    </HelmetProvider>
  );
}
