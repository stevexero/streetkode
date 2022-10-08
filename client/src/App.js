import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from './pages/Home';
import NotFound from './pages/NotFound';

import Navbar from './components/Navbar';
import AuthModal from './components/modals/AuthModal';
import AddProduct from './pages/AddProduct';

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
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
