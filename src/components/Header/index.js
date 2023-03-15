import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link, NavLink, useLocation} from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { RiLoginCircleLine } from 'react-icons/ri';
import { BiStore } from 'react-icons/bi';
import { logOut } from '../../utils/service';

const cx = classNames.bind(styles);

function Header() {
    const optionList = [
        {
            name: 'Home',
            path: '/',
        },
        {
            name: 'History',
            path: '/sales',
        },
        {
            name: 'Login',
            path: '/sign',
        },
        {
            name: 'Log out',
            path: '/sign',
        }
        
    ];

    const location=useLocation()

    return (
        <div className={cx('header')}>
            <div className={cx('header-option')}>
                {
                    optionList.map((item) => (
                        item.name!=='Log out' 
                        ?
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
                        :
                        <NavLink
                            key={item.name}
                            onClick={(e)=>logOut(e)}
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
