import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import Sigin from "./pages/Sigin";
import Cart from "./pages/Cart";
import Registration from "./pages/Registration";

const Layout = () => (
  <div>
    <Header />
    <Outlet />
    <Footer />
  </div>
);

function App() {
  return (
    <div className="font-bodyFont bg-gray-100">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="cart" element={<Cart />} />
          </Route>
          <Route path="sigin" element={<Sigin />} />
          <Route path="registration" element={<Registration />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
