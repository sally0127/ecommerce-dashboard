import {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'

export default function ProductDetail() {
const {id} = useParams()
const [product, setProduct] = useState(null)
const [loading, setLoading] = useState(true)

useEffect(() => {
  fetch(`https://dummyjson.com/products/${id}`)
    .then(r => r.json())
    .then(data => {
      setProduct(data)
      setLoading(false)
    })
}, [id])

  if (loading) return <div>載入中...</div>

  return (
    <div className="product-detail">
      <img src={product.thumbnail} alt={product.title} />
      <div className="product-detail-info">
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <div className="product-detail-bottom">
          <p className="product-detail-price">${product.price}</p>
          <p className="product-detail-rating">⭐ {product.rating}</p>
        </div>
      </div>
    </div>
  )
}