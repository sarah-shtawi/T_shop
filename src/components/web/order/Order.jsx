import React, { useContext, useState } from 'react'
import { ContextCart } from '../context/Cart';
import { useQuery } from 'react-query';
import { useFormik } from 'formik';
import { OrderSchema } from '../validation/validate';
import Input from '../../pages/Input';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../../loading/Loader';
export default function Order2() {
    const { getCartContext } = useContext(ContextCart);
    const [loading, setLoading] = useState(false);
    const getCart = async () => {
        setLoading(true);
        const CartData = await getCartContext();
        setLoading(false);
        return CartData.products;
    }
    const initialValues = {
        address: '',
        phone: '',
        couponName: '',
    }
    const onSubmit = async (values) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('userToken');
            const { data } = await axios.post("https://ecommerce-node4.vercel.app/order", values,
                { headers: { Authorization: `Tariq__${token}` } });
            if (data.message == 'success') {
                toast.success('oeder created succesfully', {
                    position: "bottom-center",
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: OrderSchema,

    })

    const inputs = [
        {
            id: 'address',
            type: 'text',
            title: 'address',
            name: "address",
            value: formik.values.address,
        },
        {
            id: 'phone',
            type: 'text',
            title: 'phone',
            name: "phone",
            value: formik.values.phone,
        },
        {
            id: 'couponName',
            type: 'text',
            title: 'couponName',
            name: "couponName",
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
    const { data } = useQuery('DataCart', getCart);
    if (loading) {
        return (
            <Loader/>
        )
    }
    return (
        <>
            <div className='container w-100 h-100 d-flex'>
                {data?.length > 0 ? data.map((product, index) =>
                    <div className='m-auto mt-5' key={index} >
                        <img src={product.details.mainImage.secure_url} className='img-fluid' />
                        <p className='fw-bolder'>SubTotal is ${product.quantity * product.details.price}</p>
                    </div>
                ) : <p>No Orders</p>}
            </div>
            <form className='p-4  m-auto mt-5 form' onSubmit={formik.handleSubmit} encType='multipart/form-data'>
                {renderInput}
                <button type='submit' disabled={!formik.isValid} className="mt-3 p-2 w-25 text-white fw-medium send-data" >Creat Order</button>
            </form>

        </>
    )
}
