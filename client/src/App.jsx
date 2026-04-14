import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cart from './components/Cart';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import OurStoryPage from './pages/OurStoryPage';
import MenuPage from './pages/MenuPage';
import ContactPage from './pages/ContactPage';
import AdminLogin from './admin/AdminLogin.jsx';
import AdminDashboard from './admin/AdminDashboard.jsx';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Admin routes - no navbar/footer */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={<AdminDashboard />} />

        {/* Public routes */}
        <Route path="*" element={
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/our-story" element={<OurStoryPage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
            <Footer />
            <Cart />
          </>
        } />
      </Routes>
    </>
  );
}
