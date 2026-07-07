import { Outlet } from 'react-router-dom'
import { CartProvider } from './context/CartContext'

function App() {
  return (
    <>
      <CartProvider>
        <Outlet />
      </CartProvider>
    </>
  )
}

export default App