import { Outlet } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Header from './components/Header'

function App() {
  return (
    <>
      <CartProvider>
        <Header />
        <Outlet />
      </CartProvider>
    </>
  )
}

export default App