import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "./pages/client/Landing"
import Login from "./pages/admin/Login"
import Sucesso from "./pages/client/Sucesso"
import Dashboard from "./pages/admin/Dashboard"
import Servicos from "./pages/admin/Servicos"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path="/sucesso" element={<Sucesso />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/servicos" element={<Servicos />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
