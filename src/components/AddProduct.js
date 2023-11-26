import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { saveProducts } from '../features/productSlice'
import { useNavigate } from 'react-router-dom'


const AddProduct = () => {
    
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const createProduct = async (e) => {
        e.preventDefault()
        await dispatch(saveProducts({title, price}))
        navigate('/')
    }

    

  return (
    <div>
        <div className='box mt-4'>
        <form onSubmit={createProduct} action="box-table" className='box mt-5'>
            <div className='field'>
                <label className='label'>Title</label>
                <div className='control'>
                    <input type="text" className='input'
                     placeholder='Title'
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                     />
                </div>
            </div>
            <div className='field'>
                <label className='label'>Price</label>
                <div className='control'>
                    <input type="text" className='input' 
                    placeholder='Price' 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
            </div>
            <div className='field'>
                <button className='button is-success is-normal is-responsive'>Add</button>
            </div>
        </form>
    </div>
    </div>
  )
}

export default AddProduct