import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { NavLink, useLocation} from 'react-router-dom';
import { logOut } from '../../../utils/service';
import { useSelector } from 'react-redux';
import { selectId } from '../../../ReduxService/UserSlice';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useContext } from 'react';
import axios from 'axios';
import { SocketContext } from '../../../SocketService';
import { useNavigate } from 'react-router-dom';
import { setId,setEmail } from '../../../ReduxService/UserSlice';
const cx = classNames.bind(styles);


function Header() {
    const dispatch=useDispatch()
    const id=useSelector(selectId)
    const socket = useContext(SocketContext);


    //click outside
    const ref=useRef()

    //click notify icon (click outside)
    const notifyRef=useRef()

    // hiển thị bảng thông báo
    const [notify,setNotify]=useState(false)
    
    // hiển thị danh sách thông báo
    const [listNotifications,setListNoti]=useState([])
    
    // các option trên header
    const [optionrightList,setList]=useState(rListDefault)
    const [optionList,setOptionList] = useState(lListDefault);
  
    // hiển thị số thông báo mới
    const [numberNotis,setNumberNotis]=useState(0)
    const navigate=useNavigate()

    useEffect(()=>{
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)){
                if(notifyRef.current.contains(event.target)){
                }  
                else
                 setNotify(false)
              }
        }
          
        //handle event click out-side
        document.addEventListener("mousedown", handleClickOutside);
        
        //set Header
        id==='false' ?setList(rListDefault):setList(rListLogin)

        id==='false'?setOptionList(lListDefault):setOptionList(lListLogin)


        //set number of notifications
        axios.post(`${process.env.REACT_APP_SERVER_AUTH_URI}/redis/redis-get`,
                {key:`numberNotify${id}`}
        )
        .then(data=>{
            const arr= JSON.parse(data.data.value)
            setNumberNotis(arr?.length)
        })
        .catch(err=>{
            console.log(err)
        })

        //set notifications
        axios.post(`${process.env.REACT_APP_SERVER_AUTH_URI}/redis/redis-get`,{key:id})
        .then(data=>{
            setListNoti(JSON.parse(data.data.value))
        })
        .catch(err=>{
        console.log(err)
        })


        socket.emit("joinRoom", id);

        socket.on("notifyMessage",(data)=>{
            setListNoti(data.listNotifications)
            console.log("num",numberNotis)
            setNumberNotis(parseInt(numberNotis)+1)
        })
        return ()=>{
            socket.off("notifyMessage");
            socket.emit("leaveRoom", id);
              document.removeEventListener("mousedown", handleClickOutside);
        }
    },[socket,ref,notifyRef])

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
                    optionrightList.map((item,index) => (
                        item.name==="Thông báo"?
                        <div key={index} className={cx('header-option-item')} >
                            <span ref={notifyRef} onClick={()=>{
                                setNotify(!notify)
                                setNumberNotis(false)
                                axios.post(`${process.env.REACT_APP_SERVER_AUTH_URI}/redis/redis-del`,
                                        {key:`numberNotify${id}`}
                                )
                                }}>{item.name}</span>
                            {numberNotis&&numberNotis!==0&& 
                                <div className={cx('noti-wrap')}>
                                <div className={cx('number-of-notifications')}>
                                    {numberNotis}
                                </div>
                                </div>
                            }
                            {notify&&<div className={cx('noti-wrap')} ref={ref}>
                                <div className={cx('notification')} style={{padding:"5px"}}>
                                    <h5 style={{marginBottom:"10px",color:"black"}}>Thông báo</h5>
                                    {listNotifications?.map((noti,index)=>{
                                        return (
                                        <div className={cx('wrap-item')} onClick={()=>{
                                            if(noti.type==="message") {
                                                navigate(`/profile-other?key=${noti.sender}`)
                                            }
                                            else {
                                                navigate(`/product?key=${noti.product}`)
                                            }
                                            window.scrollTo(0,0)
                                            setNotify(false)
                                        }}>
                                            <div>
                                                <img src={noti.avatar} width="30px" style={{borderRadius:"50%"}}/>
                                            </div>
                                            <div key={index} className={cx('noti-item')}>
                                            {noti.name}  {noti.type}
                                            </div>
                                        
                                        </div>
                                        )
                                    })}
                                </div>
                            </div>}
                        </div>
                        :
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

const rListDefault=[
    {
        name: 'Kênh người bán',
        path: '/shop'
    },
    {
        name: 'Đăng Nhập',
        path: '/sign',
    },
]
const lListDefault=[
    {
        name: 'Trang chủ',
        path: '/',
    },
    {
        name: 'Giỏ hàng',
        path: '/cart',
    },
    
]

const rListLogin=[
    {
        name: 'Kênh người bán',
        path: '/shop'
    },
    {
        name:"Thông báo"
    },
    {
        name: 'Tài khoản',
        path: '/profile',
    },
]

const lListLogin=[
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
]