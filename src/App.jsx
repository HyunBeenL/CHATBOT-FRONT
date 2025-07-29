import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React, { useEffect, useState } from 'react';
import Chat from './pages/chat.jsx';
import axios from './api/axiosInstance.js';
import ImageUpload from "./pages/ImageUpload.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
      <div>
          <ImageUpload />
      </div>
  )
}

export default App
