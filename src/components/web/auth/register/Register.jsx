import React, { useState } from 'react'
import Input from '../../../pages/Input.jsx'
import './register.css'
import { useFormik } from 'formik'
import { registerSchema } from '../../validation/validate.js'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loader from '../../../loading/Loader.jsx'
export default function Register() {
    const [loading ,setLoading] = useState(false);

    const initialValues = {
        userName: '',
        email: '',
        password: '',
        image: '',
    };
    const handelFileChange = (event)=>{
        formik.setFieldValue('image',event.target.files[0]);
    }
    const onSubmit = async users => {
        setLoading(true);
        const formData = new FormData();
        formData.append('userName', users.userName);
        formData.append('email', users.email);
        formData.append('password', users.password);
        formData.append('image', users.image);
        const {data} = await axios.post(`https://ecommerce-node4.vercel.app/auth/signup`,formData);
        if(data.message == 'success'){
            formik.resetForm();
            toast.success('account created succesfully , please verify your email to login', {
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
    }


    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: registerSchema,
    });
    const inputs = [
        {
            id: "userName",
            type: 'text',
            title: 'userName',
            name: 'userName',
            value: formik.values.userName,
        },
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
            id: 'user image',
            type: 'file',
            title: 'user image',
            name: 'image',
            onChange:handelFileChange,
        },
    ]

    const renderInput = inputs.map((input, index) =>
        <Input type={input.type}
            id={input.id}
            title={input.title}
            name={input.name}
            value={input.value}
            ChangeData={ input.onChange || formik.handleChange}
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
                <h2 className='text-center mt-5 mb-0'>Create Account</h2>
                <form className='p-4 w-50 m-auto mt-4 form ' onSubmit={formik.handleSubmit} encType='multipart/form-data'>
                    {renderInput}
                    <button type='submit' disabled={!formik.isValid} className="mt-3 p-2 w-25 text-white fw-medium  send-data" >Register</button>
                </form>
            </div>
        </>
    )
}
