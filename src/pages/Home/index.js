import React from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Content from '../../components/Content';
const cx = classNames.bind(styles);

const Home = () => {

    return (
        <div className={cx('wrap')}>
            <div className={cx('Home')}>
                <Content/>
            </div>    
        </div>
    );
};

export default Home;
