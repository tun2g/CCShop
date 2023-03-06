import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link, NavLink, useLocation} from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { RiLoginCircleLine } from 'react-icons/ri';
import { BiStore } from 'react-icons/bi';

const cx = classNames.bind(styles);

function Header() {
    const optionList = [
        {
            name: 'Home',
            path: '/',
            icon: FaHome,
        },
        {
            name: 'History',
            path: '/sales',
            icon: BiStore,
        },
        {
            name: 'Login',
            path: '/sign',
            icon: RiLoginCircleLine,
        },
    ];

    const location=useLocation()

    return (
        <div className={cx('header')}>
            <div className={cx('header-option')}>
                {
                    optionList.map((item) => (
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
