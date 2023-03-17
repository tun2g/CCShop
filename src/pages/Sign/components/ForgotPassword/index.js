import styles from './ForgotPassword.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useRef,useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { createRef } from 'react';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);
function ForgotPassword(props) {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [isVerified,setVefiry]=useState(false)

    const password = useRef({});
    password.current = watch('password', '');
    
    const inputRefs = useRef([]);
    const inputCount = 4;
    const [inputValues,setValue]= useState([])
    const [otp,setOTP]=useState()

    inputRefs.current = Array(inputCount)
        .fill()
        .map((_, i) => inputRefs.current[i] ?? createRef());
    
    
    // handle change OTP input fields
    const handleInput = (e, index) => {
        const value = e.target.value;
        inputValues[index]=e.target.value
        setValue(inputValues)

        if (value.length >= 1 && index < inputCount - 1) {
          inputRefs.current[index + 1].current.focus();
        }
        if(value.length===0 && index>0){
            inputRefs.current[index-1].current.focus();
        }
    };

    //set private email
    const email = props.email;
    let [username, domain] = email.split("@"); // tách thành username và domain
    let hidden = '*'.repeat(username.length-4) 
    let newUsername = username.slice(0, 2) + hidden + username.slice(-2); // thay đổi username
    let hiddenEmail = newUsername + "@" + domain;

    // Submit OTP code
    const handleOnClickSubmit=()=>{
        const otpInput= inputValues.reduce((s,element)=>{
            return s+element
        },'')
        if(parseInt(otpInput)===otp){
            console.log("oke")
            setVefiry(true)
        }
    }

    // send otp code to user email
    const handleOnClick=()=>{
        axios.post(`${process.env.REACT_APP_SERVER_AUTH_URI}/verify/send-otp`,{email:props.email},
        {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res=>{
            console.log(res.data)
            setOTP(res.data.otp)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    
    
    // Confirm password change
    const onSubmit = (user) => {
        console.log(user)
        axios.post(`${process.env.REACT_APP_SERVER_AUTH_URI}/user/reset-password`, {
            email:props.email,
            password:user.password
        },
        {
            headers: {
            'Content-Type': 'application/json'
            },
            timeout: 5000
        })
        .then(response => {
            console.log("res",response.data.element)
        })
        .catch(error => {
            console.error(error);
        });
    };
    
    return ( 
         
        <div className={cx('login')}>
            {
            !isVerified
            ?<div className={cx('forgot-password')}>
                <button className={cx('submit') } onClick={handleOnClick} >Gửi xác nhận đến Email</button>
                <div className="card p-2 text-center">
                <div> <span>A code has been sent to</span> <small>{hiddenEmail}</small> </div>
                
                <div id="otp" className="inputs d-flex flex-row justify-content-center mt-2"> 
                {[...Array(inputCount)].map((_, i) => (
                <input
                    className="m-2 text-center form-control rounded" 
                    type="text"
                    key={i}
                    ref={inputRefs.current[i]}
                    onChange={(e) => handleInput(e, i)}
                    maxLength="1"
                />
                ))}
                </div>
                <div className="mt-4"> <button className="btn btn-danger px-4 validate" onClick={handleOnClickSubmit}>Xác Nhận</button> </div>
                </div>

            </div>
            :
            <div className={cx('wrapper')}>
                <div className={cx('title')}>
                    <h2>QUÊN MẬT KHẨU</h2>
                </div>
                <div className={cx('content')}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                       
                        {/* <label>Mật khẩu</label> */}
                        <div className={cx('input-error')}>
                            <input
                                type="password"
                                placeholder="Nhập mật khẩu mới"
                                {...register('password', { required: true, minLength: 6 })}
                                />
                            <p>
                                {errors.password?.type === 'required'
                                    ? 'Không được bỏ trống'
                                    : errors.password?.type === 'minLength'
                                    ? 'Mật khẩu phải có từ 6 kí tự'
                                    : ''}
                            </p>
                        </div>
                        {/* <label>Nhập lại mật khẩu</label> */}
                        <div className={cx('input-error')}>
                            <input
                                type="password"
                                placeholder="Nhập lại mật khẩu"
                                {...register('passwordRe', {
                                    validate: (value) => value === password.current,
                                })}
                                />
                            <p>{errors.passwordRe?.type === 'validate' ? 'Mật khẩu không khớp' : ''}</p>
                        </div>
                        <button className={cx('submit')} type="submit">
                            XÁC NHẬN
                        </button>
                        
                    </form>
                </div>
            </div>
            }
        </div>
    );
}

export default ForgotPassword;
