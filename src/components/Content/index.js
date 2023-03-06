import classNames from 'classnames/bind';
import styles from './Content.module.scss';
import { Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { useEffect,memo, useState } from 'react';
import { getCookie, getInRedis } from '../../utils';

const cx = classNames.bind(styles);
const Content = () => {
    //Use Cookie
    const email=getCookie('email')
    // const token=getCookie('token')

    const [token,setToken]=useState(null)
    getInRedis({key:email},(token)=>{
        setToken(token)
    })
    
    useEffect(()=>{

        console.log(token)
        axios.get(`${process.env.REACT_APP_SERVER_API_URI}/post/all`, {
            headers: {
                token: `Bearer ${token}`,
            },
            })
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error);
            });
    },[token])

    
    return (
        <div className={cx('Content')}>
            <div className={cx('content-menu')}>
                <Container className={cx('menu')}>
                    <Row>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default memo(Content);
