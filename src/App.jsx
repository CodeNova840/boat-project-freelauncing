import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginScreen from './components/auth/login'
import ProtectedRoute from './routes/protected-route'
import Home from './pages/home'
import DealersHome from './pages/dealer-home'
import { Bounce, ToastContainer } from 'react-toastify'
import Checkout from './pages/checkout'
import { InventoryProvider } from './context/inventory-context';
function App() {

  return (
    <InventoryProvider>
      <Routes>
        <Route path='/' element={<LoginScreen />} />
        <Route path="/home" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route
          path="/dealer"
          element={
            <ProtectedRoute>
              <DealersHome />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </InventoryProvider>
  )
}

export default App
