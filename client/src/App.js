import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Public
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductPage from './pages/ProductPage';
import SellWithUs from './pages/SellWithUs';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Shipping from './pages/Shipping';
import Payment from './pages/Payment';

// Private - Guest
import RegisterShop from './pages/RegisterShop';
import Profile from './pages/Profile';

// Private - Seller
import AddProduct from './pages/AddProduct';
import SellerHome from './pages/SellerHome';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/modals/AuthModal';
import CartModal from './components/modals/CartModal';

function App() {
  const { user } = useSelector((state) => state.auth);
  const { shop } = useSelector((state) => state.shop);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/shop/:productId' element={<ProductPage />} />
          <Route path='/sell-with-us' element={<SellWithUs />} />
          <Route
            path='/register-shop'
            element={user ? <RegisterShop /> : <NotFound />}
          />
          <Route
            path='/add-product'
            element={user ? <AddProduct /> : <NotFound />}
          />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/shipping' element={<Shipping />} />
          <Route path='/payment' element={<Payment />} />
          <Route
            path='/seller-home/:id'
            element={user && shop ? <SellerHome /> : <NotFound />}
          />
          <Route
            path='/profile/:id'
            element={user ? <Profile /> : <NotFound />}
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
        <AuthModal />
        <CartModal />
      </Router>
    </>
  );
}

export default App;
