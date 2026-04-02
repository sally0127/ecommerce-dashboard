import { useState, useEffect } from 'react'

export default function Dashboard() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const totalProducts = products.length

  //計算所有商品的平均價格
  const avgPrice = (products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2)

  //計算所有商品的平均評分
  const avgRating = (products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1)

  //用DummyJSON API拿商品資料
  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(r => r.json())
      .then(data => {
        setProducts(data.products)
        setLoading(false)
      })
    },[])
  if (loading) return <div>載入中...</div>
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="kpi-grid">
        <div className="kpi-card">
          <span>📊</span>
          <p>商品總數</p>
          <p>{totalProducts}</p>
        </div>
        <div className="kpi-card">
          <span>💰</span>
          <p>平均價格</p>
          <p>${avgPrice}</p>
        </div>
        <div className="kpi-card">
          <span>⭐</span>
          <p>平均評分</p>
          <p>{avgRating}/5</p>
        </div>
      </div>
      <div className="table-section">
        <h2>熱銷商品</h2>
        <table>
          <thead>
            <tr>
              <th>商品名稱</th>
              <th>價格</th>
              <th>類別</th>
              <th>評分</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )
  }
