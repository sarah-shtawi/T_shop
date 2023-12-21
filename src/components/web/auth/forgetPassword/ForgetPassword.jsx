import React, { useState } from 'react'
import Input from '../../../pages/Input.jsx'
import { useFormik } from 'formik'
import { ForgetPasswordSchema } from '../../validation/validate.js'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Loader from '../../../loading/Loader.jsx'
export default function Register() {
    const navigate = useNavigate();
    const [loading ,setLoading] = useState(false);
    const initialValues = {
        email: '',
        password: '',
        code: '',
    };

    const onSubmit = async users => {
        setLoading(true);
        const { data } = await axios.patch(`https://ecommerce-node4.vercel.app/auth/forgotPassword`, users);
        if (data.message == 'success') {
            toast.success('password updated', {
                position: "bottom-center",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            navigate('/login')
            setLoading(false);
        }
    }
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema:ForgetPasswordSchema,
    });
    const inputs = [
        {
            id: 'user email',
            type: 'email',
            title: 'email',
            name: 'email',
            value: formik.values.email,
        },
        {
            id: 'user password',
            type: 'password',
            title: 'user password',
            name: 'password',
            value: formik.values.password,
        },
        {
            id: 'code',
            type: 'text',
            title: 'Code',
            name: 'code',
            value: formik.values.code,
        },
    ]

    const renderInput = inputs.map((input, index) =>
        <Input type={input.type}
            id={input.id}
            title={input.title}
            name={input.name}
            value={input.value}
            ChangeData={input.onChange || formik.handleChange}
            errors={formik.errors}
            onBlur={formik.handleBlur}
            touched={formik.touched}
            key={index} />
    );
    if(loading){
        return (
            <Loader/>
        )
    }

    return (
        <>
            <div className='container '>
                <h2 className='text-center mt-5 mb-0'>Account recovery</h2>
                <form className='p-4 w-50 m-auto mt-4 .form' onSubmit={formik.handleSubmit} encType='multipart/form-data'>
                    {renderInput}
                    <button type='submit' disabled={!formik.isValid} className="mt-3 p-2 w-25 text-black fw-bold send-data" >recovery</button>
                </form>
            </div>
        </>
    )
}

