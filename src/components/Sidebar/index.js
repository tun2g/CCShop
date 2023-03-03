import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';


const cx = classNames.bind(styles);

function Sidebar() {
    const optionList = [
        {
            id: 1,
            name: 'Thực đơn',
            path: '/',
            admin: false,
        },
        {
            id: 2,
            name: 'Thống kê',
            path: '/statistical',
            admin: true,
        },
        {
            id: 3,
            name: 'Báo cáo',
            path: '/report',
            admin: true,
        },
        {
            id: 4,
            name: 'Kho',
            path: '/storage',
            admin: true,
        },
        {
            id: 5,
            name: 'Nhân viên',
            path: '/employee',
            admin: true,
        },
    ];
    const location = useLocation();


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
