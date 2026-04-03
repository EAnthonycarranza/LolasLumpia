import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cart from './components/Cart';
import HomePage from './pages/HomePage';
import OurStoryPage from './pages/OurStoryPage';
import MenuPage from './pages/MenuPage';
import OrderPage from './pages/OrderPage';
import ContactPage from './pages/ContactPage';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';

export default function App() {
  return (
    <>
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
              <Route path="/order" element={<OrderPage />} />
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
