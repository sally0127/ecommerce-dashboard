import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'

export default function Products() {
  const [products,setProducts] = useState([]);
  const [loading,setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [search, setSearch] = useState("")

  useEffect(() => {
    // Simulate an API call to fetch products
    const fetchProducts = async () => {
      // Replace this with your actual API call
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      setProducts(data.products);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  // 如果選擇全部就顯示所有商品，否則過濾出對應分類
  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter(p => p.category === selectedCategory)


  if (loading) {
    return <div>Loading...</div>;
  }

  

  return (
  <div>
  <div className="search-box">
        <input type="text" placeholder="搜尋商品名稱" value={search} onChange={e=>setSearch(e.target.value)} />
      <span><FiSearch /></span>
      </div>
  <div className="filter-buttons">
    <button onClick={() => setSelectedCategory("all")}>全部</button>
    <button onClick={() => setSelectedCategory("groceries")}>生鮮食品</button>
    <button onClick={() => setSelectedCategory("beauty")}>化妝品</button>
    <button onClick={() => setSelectedCategory("furniture")}>家具</button>
    <button onClick={() => setSelectedCategory("fragrances")}>香水</button>

  </div>
  <div className="product-grid">
      {filteredProducts.map(product => (
        <Link to={`/products/${product.id}`}>
          <div key={product.id} className="product-card">
            <img src={product.thumbnail} alt={product.title} />
            <p className="product-title">{product.title}</p>
            <p className="product-price">${product.price}</p>
            <p className="product-rating">⭐ {product.rating}</p>
          </div>
        </Link>
      ))}
  </div>
  </div>
    )
}


