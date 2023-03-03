import React from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
const cx = classNames.bind(styles);

const Home = () => {

    return (
        <div className={cx('wrap')}>
            <div className={cx('Home')}>
                Home
            </div>    
        </div>
    );
};

export default Home;
