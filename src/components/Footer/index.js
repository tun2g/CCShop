import React from 'react';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
const cx = classNames.bind(styles);

const Footer = () => {
    return (
        <div className={cx('footer')}>
            <div className={cx('footer-content')}>
                <span>copyright © Nguyen Thanh Tung</span>
            </div>
        </div>
    );
};

export default Footer;
