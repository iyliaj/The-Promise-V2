import './App.css'
import { Routes, Route} from "react-router"
import { MainPage } from './MainPage'
import { RatingsPage } from './RatingsPage'

function App() {


  return (
    <Routes>
      <Route path="" element ={<MainPage />}/>
      <Route path="/ratings" element ={<RatingsPage />}/>
    </Routes>
  )
}

export default App
