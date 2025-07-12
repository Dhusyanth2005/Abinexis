
import Homepage from './Pages/Home/Homepage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Shop from './Pages/Shop/shop';
import Product from './Pages/Product/Product';
import CheckoutPage from './Pages/Checkout/CheckoutPage';
import Cart from './Pages/Cart/Cart';
import Order from './Pages/Order/Order';
import Wishlist from './Pages/wishlist/Wishlist';
import OrderDetail from './Pages/Order/OrderDetail';
import AuthPage from './Pages/AuthPage';
import ProfilePage from './Pages/Setting/ProfilePage';
import SettingsPage from './Pages/Setting/SettingPage';
import About from './Pages/about/About';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/auth' element={<AuthPage />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/shop/:category" element={<Shop />} />
          <Route path="/shop/:category/:productid" element={<Product />} />
          <Route path='/checkout' element={<CheckoutPage/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path="/order" element={<Order />} />
          <Route path="/order/:id" element={<OrderDetail />} />
          <Route path="/wishlist" element={<Wishlist/>} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;