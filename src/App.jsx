import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "./pages/client/Landing"
import Login from "./pages/admin/Login"
import Sucesso from "./pages/client/Sucesso"
import Dashboard from "./pages/admin/Dashboard"
import Servicos from "./pages/admin/Servicos"
import AdminLayout from "./components/AdminLayout"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sucesso" element={<Sucesso />} />

        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/servicos" element={<Servicos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
