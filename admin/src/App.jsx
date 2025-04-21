import { Routes,Route } from "react-router-dom"
import Navbar from "./Components/Navbar/Navbar"
import Sidebar from "./Components/SideBar/Sidebar"
import Add from "./pages/Add/Add.jsx"
import List from "./pages/list/List"
import Order from "./pages/orders/Order"
import ListCare from "./pages/listcare/ListCare"
import { ToastContainer } from 'react-toastify';
import AddCare from "./pages/AddCare/AddCare.jsx"
import Listmed from "./pages/ListMed/Listmed"
import Addmed from "./pages/Addmed/Addmed.jsx"
import AdminUsers from "./Components/adminuser/Adminuser.jsx"
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const url= "http://localhost:4000"
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path ="/add" element ={<Add/>} url ={url} />
          <Route path ="/list" element ={<List/>} url ={url}/>
          <Route path ="/orders" element ={<Order/>} url ={url}/>
          <Route path ="/add-care" element ={<AddCare/>} url ={url}/>
          <Route path ="/list-care" element ={<ListCare/>} url ={url}/>
          <Route path ="/list-med" element ={<Listmed/>} url ={url}/>
          <Route path ="/add-med" element ={<Addmed/>} url ={url}/>
          <Route path="/admin-user" element={<AdminUsers />} url = {url}/>
        </Routes>
      </div>
      
      </div>
  )
}

export default App
