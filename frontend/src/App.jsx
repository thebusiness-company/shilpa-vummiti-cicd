import React,{useState,useEffect} from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import HomePage from './components/home/HomePage';
import CategoryFullPage from './components/product/CategoryFullPage';
import ProductDetail from './components/product/ProductDetail';
import CartPage from './components/cart/CartPage';
import Wishlist from './components/cart/Wishlist';
import PageSection from './pages/PageSection';
import Login from './pages/Login';
import SignupSection from './pages/Signup';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ui/ProtectedRoute';
import API from './api';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import PersonalizationSection from './pages/PersonalizationSection';
import ShippingPolicySection from './pages/ShippingPolicySection';
import Authenticity from './pages/Authenticity';
import ProductCare from './pages/ProductCare';
import NotFound from './pages/NotFound';
import OrderConfirmation from './components/cart/OrderComfirm';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgetPassword';
import OrderDetails from './components/order/OrderDetails';
import ReturnandExchangePolicy from './pages/ReturnandExchangePolicy';
const App = () => {
  const[numCartItems, setNumCartItems] = useState(0);
  const cart_code = localStorage.getItem('cart_code');

  useEffect(() => {
    if (cart_code) {
      API.get(`get_cart_status?cart_code=${cart_code}`)
        .then((response) => {
          console.log(response.data.data.num_of_items,'num_cart_items');
          setNumCartItems(response.data.data.num_of_items);
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }, [cart_code]);
  return (
    <>
      <Router>
        <Routes>
          
          <Route path='/'  element={<MainLayout NumCartItems={numCartItems}/>}>
          
            <Route index element={<HomePage/>} />
            <Route path="/category/:id" element={<CategoryFullPage />} />
            <Route path="/productDetail/:slug" element={<ProductDetail setNumCartItems={setNumCartItems}/>} />
            <Route path="/cart" element={<CartPage setNumCartItems={setNumCartItems}/>}/>
            <Route path="/wishlist" element={<Wishlist/>}/>
            <Route path="/about" element={<PageSection/>}/>
            <Route path='/privacy' element={<PrivacyPolicy/>}/>
            <Route path='/terms' element={<TermsAndConditions/>}/>
            <Route path='/personalization' element={<PersonalizationSection/>}/>
            <Route path='/shipping-policy' element={<ShippingPolicySection/>}/>
            <Route path='/care' element={<ProductCare/>}/>
            <Route path='/authenticity' element={<Authenticity/>}/>
            <Route path="*" element={<NotFound/>}/>
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
            <Route path='/my-orders' element={<OrderDetails/>} />
            <Route path='/returns-exchange' element={<ReturnandExchangePolicy/>} />


          </Route>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignupSection/>}/>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />
          <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
          
        </Routes>
      </Router>
    </>
  )
}

export default App
