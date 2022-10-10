import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Public
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductPage from './pages/ProductPage';
import NotFound from './pages/NotFound';

// Private
import AddProduct from './pages/AddProduct';

import Navbar from './components/Navbar';
import AuthModal from './components/modals/AuthModal';

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/shop/:productId' element={<ProductPage />} />
          <Route
            path='/add-product'
            element={user ? <AddProduct /> : <NotFound />}
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
      <AuthModal />
    </>
  );
}

export default App;
