import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Orders from './pages/Orders'
import Products from './pages/Products'
import Sidebar from './components/Sidebar'
import './App.css'
import ProductDetail from './pages/ProductDetail'


export default function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </main>
    </div>
  )
}


