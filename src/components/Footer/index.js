import React from 'react';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import {Helmet} from 'react-helmet'

const cx = classNames.bind(styles);

const Footer = () => {
    return (
        <div>

        <Helmet>
            <title>CCShop</title>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css"/>
        </Helmet>
        <div className={cx('footer')}>
            <div className={cx('footer-content')}>
                <div class="container">
                    <div class="row" style={{paddingTop:"20px"}}>
                    <div class="col-md-4">
                        <h3>CCShop</h3>
                        <p>Địa chỉ: 123 Đường ABC, Quận XYZ, Thành phố HCM</p>
                        <p>Điện thoại: 0123 456 789</p>
                        <p>Email: info@ccshop.com</p>
                        <p>
                            Website này được xây dựng với mục đích học tập, CCShop mô phỏng đơn giản một sàn thương mại 
                            điện tử cho phép người dùng có thể mua bán sản phẩm, thực hiện được một số chức năng cơ bản khác. 
                        </p>
                    </div>
                    <div class="col-md-4">
                        <h3>Theo dõi chúng tôi</h3>
                        <ul class="social">
                        <li><a href="https://www.facebook.com/rusmonalina" target={'_blank'}><i class="fab fa-facebook-f"></i> Nguyen ThanhTung </a></li>
                        <li><a href="https://www.instagram.com/tun2g" target={'_blank'}><i class="fab fa-instagram"></i> tun2g</a></li>
                        <li><a href="https://github.com/tun2g" target={'_blank'}><i class="fab fa-github"></i> tun2g</a></li>
                        <li><a href="https://reactjs.org/"><i class="fab fa-react"></i></a></li>
                        </ul>
                    </div>
                    <div class="col-md-4">
                        <h3>Chính sách & điều khoản</h3>
                        <ul class="policy">
                        <li><a href="#">Chính sách bảo mật</a></li>
                        <li><a href="#">Chính sách đổi trả</a></li>
                        <li><a href="#">Điều khoản sử dụng</a></li>
                        </ul>
                    </div>
                    </div>
                </div>
            </div>
        </div>
            
        </div>



    );
};

export default Footer;
