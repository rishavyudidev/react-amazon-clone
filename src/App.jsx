import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/Home';
import { Route, Outlet, createBrowserRouter, createRoutesFromElements, RouterProvider, ScrollRestoration } from 'react-router-dom';
import { productsData } from './api/api';
import Sigin from './pages/Sigin';
import Cart from './pages/Cart';
import Registration from './pages/Registration';

const Layout = () => {
  return (
    <div>
      <Header />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </div>
  )
}


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} loader={productsData}></Route>
          <Route path='/cart' element={<Cart />}></Route>
        </Route>
        <Route path='/sigin' element={<Sigin />}></Route>
        <Route path='/registration' element={<Registration/>}></Route>
      </>
    )
  )
  return (
    <>
      <div className='font-bodyFont bg-gray-100'>
        <RouterProvider router={router}></RouterProvider>
      </div>
    </>
  )
}

export default App
