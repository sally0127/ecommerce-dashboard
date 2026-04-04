
import { FiSearch } from 'react-icons/fi'
import { useState, useEffect } from 'react'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [search,setSearch] =useState('')
  const filterOrders = orders.filter(order =>
    String(order.id).includes(search) 
  )
  const[sortOrder,setSortOrder]=useState("asc")
  const sortedOrders = filterOrders.sort((a, b) => {
    if (sortOrder === "asc") return a.total - b.total
    if (sortOrder === "desc") return b.total - a.total
  })
  
  const[loading,setLoading]=useState(true)

  // 用餘數運算子讓每筆訂單有固定狀態，避免每次重新整理都變動
  const statuses = ["待付款", "已出貨", "已完成", "未出貨"]
  const statusColor={
    "待付款":"red",
    "已完成":"green",
    "未出貨":"orange",
    "已出貨":"blue",
  }

  const [total, setTotal] = useState('')
  const [userId, setUserId] = useState('')
  const [status, setStatus] = useState('待付款')
  const handleAddOrder = () =>{
    //新增一筆訂單到orders陣列
    const newOrder = {
      id: orders.length + 1,
      total: Number(total),
      userId: Number(userId),
    }
    setOrders([...orders, newOrder])
    //清空輸入框
    setTotal('')
    setUserId('')
    setStatus('待付款')
  }
  
  useEffect(()=>{
    fetch("https://dummyjson.com/carts")
      .then(response => response.json())
      .then(data => {
        setOrders(data.carts);
        setLoading(false);
      })
      .catch (error => console.error('API 失敗：', error))
    },[]);

  if (loading) return <div>載入中...</div>;

  return (
    <div>
    <div className="search-box">
      <input type="text" placeholder="搜尋訂單編號" value={search} onChange={e=>setSearch(e.target.value)} />
    <span><FiSearch /></span>
    </div>
      <div className="add-order-form">
        <h2>新增訂單</h2>
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="待付款">待付款</option>
          <option value="已出貨">已出貨</option>
          <option value="已完成">已完成</option>
          <option value="未出貨">未出貨</option>
        </select>
        <input type="text" placeholder="總金額" value={total} onChange={e => setTotal(e.target.value)} />
        <input type="text" placeholder="用戶編號" value={userId} onChange={e => setUserId(e.target.value)} />
        <button onClick={handleAddOrder}>新增訂單</button>
      </div>
      <div className="sort-buttons">
        <button onClick={() => setSortOrder("asc")}>總金額由低到高</button>
        <button onClick={() => setSortOrder("desc")}>總金額由高到低</button>
      </div>
      <div className="table-section">
      <h1>訂單頁面</h1>
      <table>
        <thead>
          <tr>
            <th>訂單編號</th>
            <th>總金額</th>
            <th>用戶編號</th>
            <th>狀態</th>
          </tr>
        </thead>
        <tbody>
          {sortedOrders.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.total}</td>
              <td>{product.userId}</td>
              <td style={{ color: statusColor[statuses[product.id % statuses.length]] }}>
              {/* 用餘數運算子讓每筆訂單有固定狀態，避免每次重新整理都變動 */}
              {statuses[product.id % statuses.length]}</td> 
              <td>{product.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}
