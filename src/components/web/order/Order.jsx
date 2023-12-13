import React, { useContext, useState } from 'react'
import { ContextCart } from '../context/Cart'
import { useQuery } from 'react-query';
import { useFormik } from 'formik'
import Input from '../../pages/Input';
import { OrderSchema } from '../validation/validate';
import { toast } from 'react-toastify';
import axios from 'axios';
export default function Order() {
    let [total, setTotal] = useState(0);
    const initialValues = {
        address: '',
        phoneNumber: '',
        couponName: '',
    };
    const { getCartContext } = useContext(ContextCart);
    const getCart = async () => {
        const CartData = await getCartContext();
        return CartData.products;
    }
    const onSubmit = async (users) => {
        const token = localStorage.getItem('userToken');
        const { data } = await axios.post(`https://ecommerce-node4.vercel.app/order`, users,
            { headers: { Authorization: `Tariq__${token}` } });
        console.log(data);
        if (data.message == 'success') {
            toast.success('Order created succesfully', {
                position: "bottom-center",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }

    }
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: OrderSchema,
    });
    const inputs = [
        {
            id: 'address',
            type: 'text',
            title: 'address',
            name: 'address',
            value: formik.values.address,
        },
        {
            id: 'phoneNumber',
            type: 'text',
            title: 'user phone',
            name: 'phoneNumber',
            value: formik.values.phoneNumber,
        },
        {
            id: 'couponName',
            type: 'text',
            title: 'user couponName',
            name: 'couponName',
            value: formik.values.couponName,
        },
    ]

    const renderInput = inputs.map((input, index) =>
        <Input type={input.type}
            id={input.id}
            title={input.title}
            name={input.name}
            value={input.value}
            ChangeData={formik.handleChange}
            errors={formik.errors}
            onBlur={formik.handleBlur}
            touched={formik.touched}
            key={index} />
    );


    const { data, isLoading } = useQuery('DataCart', getCart);
    if (isLoading) {
        return (
            <p>...loading</p>
        )
    }
    return (
        <>
            <div className='container'>
                {data?.length > 0 ? data.map((product, index) =>
                    <div className='d-flex' key={index}>
                        <img src={product.details.mainImage.secure_url} className='w-25 h-25 me-3' />
                        <div>
                            <h2>Name: {product.details.name}</h2>
                            <h2>Quantity: {product.quantity}</h2>
                            <h2>Price: ${product.details.price}</h2>
                            <h2>SubTotal is ${product.quantity * product.details.price}</h2>
                            {total += product.quantity * product.details.price}
                        </div>
                    </div>
                ) : <p>No Orders</p>
                }
                <div className='subTotal d-flex justify-content-center'>
                    <h2 className='fw-bolder fs-1'>Total is ${total}</h2>
                </div>
                <form onSubmit={formik.handleSubmit} className='p-4 w-50 m-auto mt-4' >
                    {renderInput}
                    <div className='d-flex justify-content-between'>
                        <button type='submit' disabled={!formik.isValid} className="mt-3 p-2 w-25 text-black fw-bold send-data" >Creat Order</button>
                    </div>
                </form>
            </div>
        </>
    )
}
