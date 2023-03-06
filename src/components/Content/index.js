import classNames from 'classnames/bind';
import styles from './Content.module.scss';
import { Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { useEffect } from 'react';
import { getCookie } from '../../utils';

const cx = classNames.bind(styles);
const Content = () => {
    const token=getCookie('token')
    console.log(token)
    useEffect(()=>{ 
        axios.get(`${process.env.REACT_APP_SERVER_API_URI}post/all`, {
            headers: {
                token: `Bearer ${token}`,
            },
            })
            .then((response) => {
                console.log(response.data);
                console.log(response)
            })
            .catch((error) => {
                console.error(error);
            });
    },[])

    
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

export default Content;
