import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, productSelectors, updateProducts } from '../features/productSlice'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'


const EditProduct = () => {
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams()

    const product = useSelector((state) => productSelectors.selectById(state, id))

    useEffect(() => {
      dispatch(getProducts())
    }, [dispatch])

    useEffect(() => {
      if(product){
        setTitle(product.title)
        setPrice(product.price)
      }
    }, [product])
    
    
    const handlerUpdate = async(e) => {
        e.preventDefault()
        await dispatch(updateProducts({id ,title, price}))
        navigate('/')
    }

    console.log({ title, price, product })

  return (
    <div>
        <div className='box mt-4'>
        <form onSubmit={handlerUpdate} action="box-table" className='box mt-5'>
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
                <button className='button is-success is-normal is-responsive'>Update</button>
            </div>
        </form>
    </div>
    </div>
  )
}

export default EditProduct