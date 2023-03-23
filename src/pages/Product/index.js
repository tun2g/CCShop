import React from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import ProductDetail from '../../components/ProductDetail';
const cx = classNames.bind(styles);

const Product = () => {

    return (
        <div className={cx('wrap')}>
            <div className={cx('Home')}>
                <ProductDetail/>
            </div>    
        </div>
    );
};

export default Product;
