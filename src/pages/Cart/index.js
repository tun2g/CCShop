import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { selectId } from "../../ReduxService/UserSlice"
import { useDispatch } from "react-redux"
import classNames from "classnames"
import styles from './Cart.module.scss'
import { Container } from "react-bootstrap"
import { updateTotalQuantity } from "../../ReduxService/CartSlice"
import ProductCardInCart from "../../components/Products/ProductCardInCart"

const cx=classNames.bind(styles)
const Cart=()=>{
    const id=useSelector(selectId)
    const dispatch=useDispatch()
    const [listProducts,setList]=useState()
    
    //handle delete cart in component ProductCardInCart
    const [isDeleted,setDelete]=useState()

    const changeDelete=(a)=>{
        setDelete(a)
        dispatch(updateTotalQuantity(-1))
    }

    useEffect(()=>{
        console.log("cart render")
        id&&id!='false'&&axios.get(`${process.env.REACT_APP_SERVER_API_URI}/cart/get-cart-by-user/${id}`,{
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(res=>{
            setList(res.data.list)
        })
        .catch(err=>{
            console.log(err)
        })
    },[isDeleted])

    return (
        <div>
            {
                <Container className={cx('menu')}>
                {
                listProducts&&listProducts?.map((element)=>{
                    return ( 
                    <ProductCardInCart 
                        key={element._id} 
                        product={element.productid} 
                        cart={element}
                        isDeleted={isDeleted}
                        changeDelete={changeDelete}
                        />
                    )
                })}
                </Container>
            }
        </div>
    )
}

export default Cart

