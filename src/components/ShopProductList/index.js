import axios from 'axios';
import { useEffect,memo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductByShop from '../Products/ProductByShop';

const ShopProductList = () => {
    const  location=useLocation()
    const searchParams = new URLSearchParams(location.search);
    const key=searchParams.get('key')
    const [list,setList]=useState([])
    useEffect(()=>{
            axios.get(`${process.env.REACT_APP_SERVER_API_URI}/product/get-all/${key}`)
            .then(res=>{
                setList(res.data)
            })
            .then(err=>{
                console.log(err)
            })
    },[])
    return (
        <div >
            <div>
                {list?.map((element)=>{
                    return <ProductByShop key={element._id.toString()} product={element}/>
                })}
            </div>
        </div>
    );
};

export default memo(ShopProductList);
