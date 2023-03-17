import styles from './SignIn.module.scss';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import { useEffect,useState } from 'react';
import axios from 'axios'

import { setInRedis } from '../../../../utils/service';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);
function SignIn(props) {

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm();

    const onSubmit = (user) => {
        axios.post(`${process.env.REACT_APP_SERVER_AUTH_URI}/user/login`, user,{
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            timeout: 5000
        })
        .then(response => {
            console.log(response.data)
            if(response.data.status===401 || response.data.status===500){
                props.handleChangeEmail(user.email)
                setError("password", {
                type: "errorPassword",
                message: "Sai mật khẩu hoặc tài khoản",
                });
            }
            
            response.data.token&&setInRedis({value:response.data.token})  
        })
        .catch(error => {
            console.error(error);
        });
    };

    return (
        <div className={cx('login')}>
            <div className={cx('wrapper')}>
                <div className={cx('title')}>
                    <h2>ĐĂNG NHẬP</h2>
                </div>
                <div className={cx('content')}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* <label>Tài khoản</label> */}
                        <div className={cx('input-error')}>
                            <input placeholder="Email" {...register('email', { required: true, minLength: 6 })} />
                            <p>
                                {errors.email?.type === 'required'
                                    ? 'Không được bỏ trống'
                                    : errors.email?.type === 'minLength'
                                    ? 'Email phải có từ 6 kí tự'
                                    : ''}
                            </p>
                        </div>
                        {/* <label>Mật khẩu</label> */}
                        <div className={cx('input-error')}>
                            <input
                                type="password"
                                placeholder="Mật khẩu"
                                {...register('password', { required: true, minLength: 6 })}
                            />
                            <p>
                                {errors.password?.type === 'required'
                                    ? 'Không được bỏ trống'
                                    : errors.password?.type === 'minLength'
                                    ? 'Mật khẩu phải có từ 6 kí tự'
                                    :errors.password?.type==='errorPassword'
                                    ? "Sai tài khoản hoặc mật khẩu"
                                    : ''}
                            </p>
                        </div>
                        <button className={cx('submit')} type="submit">
                            ĐĂNG NHẬP
                        </button>
                        <div className={cx('change-signup')} onClick={()=>{
                            props.handleChangeSign(2)
                        }}>bạn chưa có tài khoản?</div>
                        <div className={cx('change-signup')} onClick={()=>{
                            props.handleChangeSign(3)
                        }}>Quên mật khẩu</div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
