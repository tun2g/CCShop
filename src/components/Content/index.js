import classNames from 'classnames/bind';
import styles from './Content.module.scss';
import { Container, Row } from 'react-bootstrap';
import axios from '../../utils/axios.config';
// import axios from 'axios';
import { useEffect,memo, useState } from 'react';
import { getInRedis } from '../../utils/service';
import ProductCard from '../ProductCard';

const cx = classNames.bind(styles);
const Content = () => {
    
    const [token,setToken]=useState("default")
    const[listProducts,setListProducts]=useState([])
    
    getInRedis((token)=>{
        setToken(token)
    })

    
    useEffect(()=>{
        console.log(listProducts)
        token&&axios.get(`${process.env.REACT_APP_SERVER_API_URI}/post/all`, {
            headers: {
                token: `Bearer ${token}`,
            }
            })
            .then((response) => {
                setListProducts(response.data)
            })
            .catch((error) => {
                //console.log(error);
            });
    },[token])

    
    return (
        <div className={cx('Content')}>
            <div className={cx('content-menu')}>
                <Container className={cx('menu')}>
                    <Row>
                        {
                        listProducts.map((element)=>{
                            return <ProductCard key={element.product}/>
                        })}
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default memo(Content);
