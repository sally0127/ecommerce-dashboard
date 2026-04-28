## Ecommerce Dashborad - Agent Guidelines

## 專案概述
使用React框架開發的電商分析Dashboard，串接DummyJSON API顯示商品資料。

## 使用技術
-React
-Vite
-React Router
-DummyJSON API
-CSS

## 檔案結構
ecommerce-dashboard/

├── public/

├── src/

│   ├── components/

│   │   └── Sidebar.jsx
│   ├── data/

│   │   └── mockData.js
│   ├── pages/

│   │   ├── Dashboard.jsx

│   │   ├── Orders.jsx

│   │   ├── Products.jsx

│   │   └── ProductDetail.jsx
│   ├── App.jsx

│   ├── App.css

│   ├── index.css

│   └── main.jsx
├── .env

├── .gitignore

├── agent.md

├── index.html

├── package.json

└── vite.config.js

## 開發規則
-使用fetch串接API，不使用axios
-使用.then()處理非同步，加上.catch()錯誤處理
-API資料來源:DummyJSON API（https://dummyjson.com）
-元件命名使用PascalCase
-CSS 使用原生 CSS，不使用 CSS framework
-useState統一放在function最上面
-所有頁面元件放在 src/pages/
-共用元件放在 src/components/
-假資料放在 src/data/mockData.js

## 注意事項
-DummyJSON商品資料在data.products裡面
-圖片欄位使用product.thumnail
-評分欄位使用 product.rating（不是 rating.rate）
-訂單資料來自 /carts endpoint