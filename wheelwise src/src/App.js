import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/AuthProvider';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import Booking from './pages/Booking/Booking';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage';
import ProtectedRoute from './components/ProtectedRoute';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import CarDescriptionPage from './pages/CarDescriptionPage/CarDescriptionPage';
import View from './pages/View/View';
import History from './pages/History/History';
import FeedbackForm from './components/FeedbackForm/FeedbackForm';
import Review from './components/Review/Review';
import AboutUs from './pages/AboutUs/AboutUs';
import Tos from './pages/Tos/Tos';
import Privacy from './pages/Privacy/Privacy';
import Refund from './pages/Refund/Refund';
import Faqq from './pages/Faqq/Faqq';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/home" element={<ProtectedRoute element={<HomePage />} />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/confirmation" element={<Booking />} />
          <Route path="/your-booking" element={<History />} />
          <Route path="/car/:id" element={<CarDescriptionPage />} />
          <Route path="/view/:bookingId" element={<View />} />
          <Route path="/feedback" element={<FeedbackForm />} />
          <Route path="/review" element={<Review />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/tos" element={<Tos />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/refund-poilcy" element={<Refund />} />
          <Route path="/faq" element={<Faqq />} />
        </Routes>
        
        {/* Conditionally render Footer for all routes except /your-booking */}
        <Routes>
          <Route path="/your-booking" element={null} />
          <Route path="*" element={<Footer style={{ marginTop: '60px' }} />} />
        </Routes>

        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AuthProvider>
    </Router>
  );
}

export default App;
