import React from 'react'
import './Loader.css'
export default function Loader() {
    return (
        <>
            <div class="loading bg-white mt-0 vh-100 w-100 position-fixed d-flex justify-content-center align-items-center z-3">
                <span class="loader"></span>
            </div>
        </>
    )
}
