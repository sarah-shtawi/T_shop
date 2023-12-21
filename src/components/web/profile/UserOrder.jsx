import React, { useContext, useState } from 'react'
import { UserContext } from '../context/User';
import { useQuery } from 'react-query';
import style from './Profile.module.css'
import Loader from '../../loading/Loader';
export default function UserOrder() {
  const { getUserOrder } = useContext(UserContext);
  const [loading ,setLoading] = useState(false);

  const getOrder = async () => {
    setLoading(true);
    const res = await getUserOrder();
    setLoading(false);
    return res;
  }
  const { data } = useQuery('UserOrders', getOrder);

  if (loading)
    return (
  <Loader/>
    )
  return (
    <>
      <h1 className=''>Your Orders</h1>
      {data?.orders ? data?.orders.map((order, index) =>
        <div key={index}>
          <h2 >Order:{index + 1} </h2>
          <table className={`table table-hover table-bordered   w-50 ${style.table1}`}  >
            <thead>
              <tr>
                <th>address</th>
                <th>conpun Name</th>
                <th>created At</th>
                <th>Final price</th>
                <th>Payment Pay</th>
                <th>Phone Number</th>
                <th>status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='fw-bolder'>{order.address}</td>
                <td className='fw-bolder'>{order.couponName}</td>
                <td className='fw-bolder'>{order.createdAt}</td>
                <td className='fw-bolder'>{order.finalPrice}</td>
                <td className='fw-bolder'>{order.paymentType}</td>
                <td className='fw-bolder'>{order.phoneNumber}</td>
                <td className='fw-bolder'>{order.status}</td>
              </tr>
            </tbody>
          </table>

        </div>
      ) : <p>No orders</p>

      }
    </>
  )
}
