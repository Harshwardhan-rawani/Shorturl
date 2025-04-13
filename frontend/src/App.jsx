import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Routes, Route } from 'react-router-dom';
import Landingpage from './component/Landingpage';
import Card from './component/Card';
import Analytics from './component/Analytics';
import Navbar from './component/Navbar';
import PrivateRoute from './component/PrivateRoute';
import Login from './component/Login';
import Signup from './component/Signup';
import RedirectPage from './component/RedirectPage';
import './App.css';
import Expirepage from './component/Expirepage';
import Page404 from './component/Page404';
import Errorpage from './component/Errorpage';

function App() {
  const location = useLocation();
  
  
  const isRedirectPath = location.pathname.startsWith('/redirect');

  return (
    <>
      {!isRedirectPath && <Navbar />}
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landingpage />} />
          <Route path="/card" element={<PrivateRoute element={<Card />} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/expired" element={<Expirepage/>} />
          <Route path="/404" element={<Page404 />} />
          <Route path="/error" element={<Errorpage/>} />
          <Route path="/redirect/:shortId" element={<RedirectPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/analytics" element={<PrivateRoute element={<Analytics />} />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
