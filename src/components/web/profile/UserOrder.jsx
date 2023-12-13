import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/User';
import { useQuery } from 'react-query';

export default function UserOrder() {

  const { getUserOrder } = useContext(UserContext);
  const getOrder = async () => {
    const res = await getUserOrder();
    return res;
  }
  const { data, isLoading } = useQuery('UserOrders', getOrder);
  if (isLoading)
    return (
      <h2>..loading</h2>
    )
  return (
    <>
      <h1 className='border-bottom'>Your Order</h1>
      {data?.orders ? data?.orders.map((order, index) =>
        <div key={index}>
          <h2 >Order:{index + 1} </h2>
          <h2>OrderId:{order._id}</h2>
          <h2>finalPrice:{order.finalPrice}</h2>
          <h2>address:{order.address}</h2>
        </div>
      ) : <p>No orders</p>
      }
    </>
  )
}
