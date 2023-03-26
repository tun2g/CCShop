import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link, NavLink, useLocation} from 'react-router-dom';
import { logOut } from '../../utils/service';

const cx = classNames.bind(styles);

function Header() {
    const optionList = [
        {
            name: 'Trang chủ',
            path: '/',
        },
        {
            name: 'Giỏ hàng',
            path: '/cart',
        },
        
        {
            name: 'Đăng Xuất',
            path: '/sign',
        },
       
        
    ];
    const optionrightList=[
        {
            name: 'Kênh người bán',
            path: '/shop'
        },
        {
            name: 'Đăng Nhập',
            path: '/sign',
        },
    ]

    const location=useLocation()

    return (
        <div className={cx('header')}>
            <div className={cx('header-option')}>
                {
                    optionList.map((item) => (
                        item.name==='Đăng Xuất'?
                        <NavLink
                            key={item.name}
                            className={ cx('header-option-item')}
                            onClick={logOut}
                            to={item.path}
                        >
                            <span>{item.name}</span>
                        </NavLink>
                        :
                        <NavLink
                            key={item.name}
                            className={ cx('header-option-item')}
                            to={item.path}
                        >
                            <span>{item.name}</span>
                        </NavLink>
                        
                        
                    ))
                }
            </div>
            <div className={cx('header-option')}>
                {
                    optionrightList.map((item) => (
                        
                        <NavLink
                            key={item.name}
                            className={
                                location.pathname === item.path
                                    ? cx('header-option-item', 'active')
                                    : cx('header-option-item')
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

export default Header;
