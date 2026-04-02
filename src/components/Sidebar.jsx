import { Link } from 'react-router-dom'
import { FiHome, FiShoppingBag, FiPackage } from 'react-icons/fi'

export default function Sidebar() {
  return (
    <div className="sidebar">
      <nav>
        <Link to="/"><FiHome /> 首頁</Link>
        <Link to="/orders"><FiShoppingBag /> 訂單</Link>
        <Link to="/products"><FiPackage /> 商品</Link>
      </nav>
    </div>
  )
}

