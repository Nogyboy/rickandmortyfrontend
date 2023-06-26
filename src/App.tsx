import { useState } from 'react' 
import { BrowserRouter, Routes, Route } from "react-router-dom"

import { Provider } from 'react-redux'
import { store } from './actions/store'

import Home from './pages/Home'
import Detail from './pages/Detail'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Provider store={store}>
     <BrowserRouter>
      <Routes>
        <Route path="/rickandmortyfrontend/" element={<Home />} /> 
        <Route path="/rickandmortyfrontend/detail" element={<Detail />} />
      </Routes>
    </BrowserRouter>
    </Provider>
  )
}

export default App
