import Cart from "../components/web/cart/Cart";
import Categories from "../components/web/categories/Categories";
import CategoriesDetails from "../components/web/categories/CategoriesDetails";
import Home from "../components/web/home/Home";
import Login from "../components/web/auth/login/Login.jsx";
import Product from "../components/web/products/Product";
import ProtectedRoutes from "../components/web/protectedRoutes/ProtectedRoutes";
import Register from "../components/web/auth/register/Register";
import DashboardLayout from "./DashboardLayout.jsx";
import HomeDashboard from '../components/dashboard/home/Home.jsx';
import CategoriesDashboard from '../components/dashboard/categories/Categories.jsx'
import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout.jsx";
import Profile from "../components/web/profile/Profile.jsx";
import SendCode from "../components/web/auth/sendCode/SendCode.jsx";
import ForgetPassword from "../components/web/auth/forgetPassword/ForgetPassword.jsx";
import UserInfo from "../components/web/profile/UserInfo.jsx";
import UserContact from "../components/web/profile/UserContact.jsx";
import UserOrder from "../components/web/profile/UserOrder.jsx";
import Order from "../components/web/order/Order.jsx";
import AllProducts from "../components/web/products/AllProducts.jsx";
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
     
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/home',
        element: <Home />
      },
      {
        path: 'categories',
        element: <Categories />
      },
      {
        path: '/products/category/:categoryId',
        element: <CategoriesDetails />
      },
      {
        path: `/product/:productId`,
        element: <Product />
      },
      {
        path: `products`,
        element:<AllProducts /> , 
      },
      {
        path: 'profile',
        element: <ProtectedRoutes>
                    <Profile />
               </ProtectedRoutes>,
       children :[
        {
          index:true,
          element: <UserInfo/>
        },
        {
          path: 'contact',
          element: <UserContact/>
        },
        {
          path: 'UserOrder',
          element: <UserOrder/>
        }
       ]        
      },

      {
        path: 'register',
        element: <Register />
      },
      {
        path: '/login',
        element: <Login />
      },

      {
        path: 'sendCode',
        element: <SendCode />
      },
      {
        path: 'forgetPassword',
        element: <ForgetPassword />
      },
      {
        path: 'cart/order',
        element: <Order />
      },
      {
        path: 'cart',
        element: <ProtectedRoutes>
          <Cart />
        </ProtectedRoutes>
      },
      {
        path: '*',
        element: <h2>page not found --- web</h2>
      }
    ]
  },

  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [{
      path: 'home',
      element: <HomeDashboard />
    }
      , {
      path: 'categories',
      element: <CategoriesDashboard />
    },
    {
      path: '*',
      element: <h2>page not found --- dashboard</h2>
    }
    ]
  }
]);