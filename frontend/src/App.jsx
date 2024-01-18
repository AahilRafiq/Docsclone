import { Routes , Route , Link} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import DocPage from "./pages/DocPage";

export default function App() {
  return (
    <>
    <Navbar />
    <Routes>
        <Route path="/" element={<Home/> }/>
        <Route path="/dashboard" element={<Dashboard/> }/>
        <Route path="/docs/:docId" element={<DocPage/> }/>
    </Routes>
    </>

  )
}