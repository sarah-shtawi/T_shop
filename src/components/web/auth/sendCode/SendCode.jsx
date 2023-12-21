import React, { useState } from 'react'
import Input from '../../../pages/Input.jsx'
import { useFormik } from 'formik'
import {  SendCodeSchema } from '../../validation/validate.js'
import axios from 'axios'
import { toast } from 'react-toastify'
import {  useNavigate } from 'react-router-dom'
import Loader from '../../../loading/Loader.jsx'

export default function Login() {
    const navigate = useNavigate();
    const [loading ,setLoading] = useState(false);
    const initialValues = {
        email: '',
    };
    const onSubmit = async users => {
        setLoading(true);
        const { data } = await axios.patch(`https://ecommerce-node4.vercel.app/auth/sendcode`, users);
        if (data.message == 'success') {
            toast.success('code sent ', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            navigate('/forgetPassword')
            setLoading(false);

        }
    }
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: SendCodeSchema,
    });
    const inputs = [
        {
            id: 'user email',
            type: 'email',
            title: 'email',
            name: 'email',
            value: formik.values.email,
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
    if(loading){
        return (
            <Loader/>
        )
    }
    return (
        <>
            <div className='container '>
                <h2 className='text-center mt-5 mb-0'>Send Code</h2>
                <form className='p-4 w-50 m-auto mt-4' onSubmit={formik.handleSubmit} >
                    {renderInput}
                    <div className='d-flex justify-content-between'>
                        <button type='submit' disabled={!formik.isValid} className="mt-3 p-2 w-25 text-black fw-bold send-data" >Send Code</button>
                    </div>
                </form>
            </div>
        </>
    )
}

  // return (
  //   <>
  //     <h1 className='text-center border-0 mt-5'>Return the account</h1>
  //     <form className='p-5 w-25 m-auto mt-5' onSubmit={()=>SendCode(e,email.value)}>
  //       <label className='me-2 d-block fw-bold mb-2 '>email</label>
  //       <input type='email' name='email' id='userEmail' className='form-control' value={formik.values.email} />
  //       <button type='submit' className='mt-4  w-50 text-black fw-bold send-code'>SendCode</button>
  //     </form>
  //   </>
  // )
//}
