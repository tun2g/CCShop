import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import {useLocation} from 'react-router-dom';
import { useEffect} from 'react';
import NavLink from '../CustomNavLink';
import { useSelector } from 'react-redux';
import { selectId } from '../../../ReduxService/UserSlice';

const cx = classNames.bind(styles);

function Sidebar() {

    const id= useSelector(selectId)

    const optionList = [
        {
            id: 1,
            name: 'Đăng bán sản phẩm',
            path: '/shop',
        },
        {
            id: 2,
            name: 'Xem danh sách',
            path: `/shop/list-product?key=${id}`,
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
                                cx('sidebar-option-item')
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
