import { useDispatch } from 'react-redux'
import './App.scss'
import { addingData } from './features/products'
import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CreateProductPage from './pages/CreateProductPage'

function App() {

  const dispatch = useDispatch()

  function getData() {
    fetch('https://emojihub.yurace.pro/api/all/group/animal-bird')
      .then(res => res.json())
      .then(data => {
        const emojisWithId = data.map((elem: any, index: number) => {
          return {
            id: index + 1, // Генерируем уникальный ID (начиная с 1)
            favorite: false,
            createdByUser: false,
            name: elem.name,
            category: elem.category,
            emoji: elem.htmlCode[0]
          };
        });
        dispatch(addingData(emojisWithId))
      })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/products" />} />
          <Route path="/products" element={<HomePage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/create-product" element={<CreateProductPage />} />
          <Route path="*" element={<Navigate to="/products" />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
