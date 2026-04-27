import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'


export default function Dashboard() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const totalProducts = products.length

  //計算所有商品的平均價格
  const avgPrice = (products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2)

  //計算所有商品的平均評分
  const avgRating = (products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1)

  //將每個商品進行分類
  const groupedByCategory = products.reduce((acc, product) => {
    const category = product.category
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(product)
    return acc
  }, {})

  //計算各分類平均
  const chartData = Object.keys(groupedByCategory).map(category => ({
    category,
    avgRating: (groupedByCategory[category].reduce((sum, p) => sum + p.rating, 0) / groupedByCategory[category].length).toFixed(1)
  }))

  //用DummyJSON API拿商品資料
  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(r => r.json())
      .then(data => {
        setProducts(data.products)
        setLoading(false)
      })
      .catch(error => console.error('API 失敗：', error))
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
      <div className="table-section desktop-only">
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
    {/*巢狀map*/}
    <div className="mobile-only">
        {
        //拿到所有分類名稱，["beauty","laptops","smartphones",...]，並對每個分類跑.map()
        }
        {Object.keys(groupedByCategory).map(category => (
          //每個分類一個白色框框//
          <div key={category} className="category-group">
            <h3>{category}</h3>
            {
            //對每個分類裡的商品跑.map()//
            }
            {groupedByCategory[category].map(product => (
              <div key={product.id} className="category-item">
                <p>{product.title}</p>
                <p>${product.price}</p>
                <p>⭐ {product.rating}</p>
              </div>
            ))}
          </div>
        ))}
    </div>
    <div className="chart-section">
      <h2>各分類平均評分</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
        <Line dataKey="avgRating" stroke="#d97557" />
      </LineChart>
    </ResponsiveContainer>
      </div>
  </div>
  )
  }
