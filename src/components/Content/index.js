import classNames from 'classnames/bind';
import styles from './Content.module.scss';
import { Container, Row } from 'react-bootstrap';
import axios from '../../utils/axios.config';
// import axios from 'axios';
import { useEffect,memo, useState } from 'react';
import { getCookie, getInRedis } from '../../utils/service';

const cx = classNames.bind(styles);
const Content = () => {
    
    const [token,setToken]=useState("default")
    getInRedis((token)=>{
        setToken(token)
    })
    
    useEffect(()=>{

        console.log("content-render")
        token&&axios.get(`${process.env.REACT_APP_SERVER_API_URI}/post/all`, {
            headers: {
                token: `Bearer ${token}`,
            }
            })
            .then((response) => {
                console.log(response.data)
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
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default memo(Content);
