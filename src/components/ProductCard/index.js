import classNames from 'classnames/bind';
import styles from './ProductCard.module.scss';
import { useMemo,memo } from 'react';
const cx = classNames.bind(styles);
const ProductCard = (props) => {
    
    return (
        <div className={cx('ProductCard')}>
            <div className="card">
            <img src="path/to/image.jpg" alt="Product Image"/>
            <h2>Product Name</h2>
            <p className="price">$19.99</p>
            <p>Description of the product goes here.</p>
            <button>Add to Cart</button>
            </div>
        </div>
    );
};

export default memo(ProductCard);
