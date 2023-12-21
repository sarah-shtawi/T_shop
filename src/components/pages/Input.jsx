import React from 'react'
import './input.css'
export default function Input({ id, title, name, type = 'text', ChangeData, value, errors,onBlur,touched,placeHolder }) {
  return (
    <>
      <div className=''>
        <label htmlFor={id} className='m-2 text-black fw-bold ' >{title}</label>
        <input type={type} className={`form-control m-2 w-75 input`} id={id} placeholder={placeHolder} name={name} value={value} onChange={ChangeData} onBlur={onBlur} />
      </div>
      { touched [name] && errors[name] && <p className='text text-danger'>{errors[name]} </p>}
    </>
  )
}
