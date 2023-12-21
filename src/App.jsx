import { RouterProvider } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ContextCart, ContextCartProvider } from "./components/web/context/Cart.jsx";
import { UserContext } from "./components/web/context/User.jsx";
import { router } from "./layouts/Routes.jsx";
import 'antd/dist/antd.js'

export default function App() {
  let { setUserToken,userToken } = useContext(UserContext);
  let { setCount, getCartContext } = useContext(ContextCart);
  
  useEffect(() => {
    if (localStorage.getItem('userToken') != null) {
      setUserToken(localStorage.getItem('userToken'));
    }
    setCount(getCartContext().count);
  }, [userToken]);


  return (
    <RouterProvider router={router} />
  )
}