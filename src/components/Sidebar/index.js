import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';


import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Sidebar() {
    const optionList = [
        {
            id: 1,
            name: 'Đăng bán sản phẩm',
            path: '/',
        },
        {
            id: 2,
            name: 'Xem danh sách',
            path: '/',
            admin: true,
        },
        {
            id: 3,
            name: 'Xem thống kê',
            path: '/report',
        },
        {
            id: 5,
            name: 'Nhân viên',
            path: '/employee',
        },
    ];


    const location = useLocation();

    useEffect(() => {
        console.log('render sidebar');
    }, []);

    return (
        <div className={cx('sidebar')}>
            <div className={cx('sidebar-option')}>
                {
                    optionList.map((item) => (
                        <NavLink
                            key={item.id}
                            className={
                                location.pathname === item.path
                                    ? cx('sidebar-option-item', 'active')
                                    : cx('sidebar-option-item')
                            }
                            to={item.path}
                        >
                            <span>{item.name}</span>
                        </NavLink>
                    ))

                }
            </div>

        </div>
    );
}

export default Sidebar;
