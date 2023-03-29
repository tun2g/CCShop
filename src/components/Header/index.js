import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { NavLink, useLocation} from 'react-router-dom';
import { logOut } from '../../utils/service';
import { useSelector } from 'react-redux';
import { selectId } from '../../ReduxService/UserSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setId,setEmail } from '../../ReduxService/UserSlice';
const cx = classNames.bind(styles);

function Header() {
    const dispatch=useDispatch()
    const id=useSelector(selectId)
    const [optionrightList,setList]=useState([
        {
            name: 'Kênh người bán',
            path: '/shop'
        },
        {
            name: 'Đăng Nhập',
            path: '/sign',
        },
    ])
    const [optionList,setOptionList] = useState([
        {
            name: 'Trang chủ',
            path: '/',
        },
        {
            name: 'Giỏ hàng',
            path: '/cart',
        },
        
    ]);
    
    useEffect(()=>{

        id==='false' ? 
        setList([
        {
            name: 'Kênh người bán',
            path: '/shop'
        },
        {
            name: 'Đăng Nhập',
            path: '/sign',
        },
        ])
        :
        setList([
            {
                name: 'Kênh người bán',
                path: '/shop'
            },
            {
                name: 'Tài khoản',
                path: '/profile',
            }]
        )

        id==='false' ? 
        setOptionList([
            {
                name: 'Trang chủ',
                path: '/',
            },
            {
                name: 'Giỏ hàng',
                path: '/cart',
            },
        ])
        :
        setOptionList([
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
        ])

    },[])
        
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
                            onClick={()=>{
                                logOut()
                                dispatch(setEmail(false))
                                dispatch(setId(false))
                            }}
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
