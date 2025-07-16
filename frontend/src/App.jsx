
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
import Profile from './Pages/Setting/Profile';
import About from './Pages/about/About';
import TermsAndConditions from './Pages/ServicesPage/TermsAndConditions';
import PrivacyPolicy from './Pages/ServicesPage/PrivacyPolicy';
import ShippingInformation from './Pages/ServicesPage/ShippingInformation';
import ReturnRefundPolicy from './Pages/ServicesPage/ReturnRefundPolicy';
import FAQ from './Pages/ServicesPage/FAQ';

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
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/privacy" element={<PrivacyPolicy />} /> 
          <Route path="/shipping" element={<ShippingInformation />} />
          <Route path="/returns" element={<ReturnRefundPolicy/>} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;