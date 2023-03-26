import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect,memo, useState } from 'react';
import styles from './ShopProductList.module.scss';
import { useLocation } from 'react-router-dom';
import ProductByShop from '../Products/ProductByShop';
const cx = classNames.bind(styles);

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
        <div className={cx('ShopProductList')}>
            <div className={cx('content-menu')}>
                {list?.map((element)=>{
                    return <ProductByShop key={element._id.toString()} product={element}/>
                })}
            </div>
        </div>
    );
};

export default memo(ShopProductList);
