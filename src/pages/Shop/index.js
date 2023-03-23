import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import styles from './Shop.module.scss';
import RegisterShop from '../../components/RegisterShop';
import { selectEmail } from '../../ReduxService/UserSlice';
import axios from 'axios';
import PostProduct from '../../components/PostProduct';
import { useLocation } from 'react-router-dom';
const cx = classNames.bind(styles);

const Shop = () => {
    const email = useSelector(selectEmail)
    const [isShop,setIsShop]=useState(false)

    useEffect(()=>{
        email&&axios.post(`${process.env.REACT_APP_SERVER_AUTH_URI}/user/is-shop`,{email},{
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response=>{
                setIsShop(response.data.isShop)
        })
        .catch(err=>{
            console.log(err)
        })        
    },[])
    return (
        <div className={cx('wrap')}>
            <div className={cx('Shop')}>
                {!isShop?
                <RegisterShop/>
                :
                <PostProduct/>
                }
            </div>    
        </div>
    );
};

export default Shop;
