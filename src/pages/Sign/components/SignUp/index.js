import styles from './SignUp.module.scss';
import classNames from 'classnames/bind';
import { useRef } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

import { toast } from 'react-toastify';

const cx = classNames.bind(styles);
function SignUp({ handleChangeSign }) {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const password = useRef({});
    password.current = watch('password', '');

    const onSubmit = (user) => {
        console.log(user)
        axios.post(`${process.env.REACT_APP_SERVER_AUTH_URI}/user/register`, user,{
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
            <div className={cx('wrapper')}>

                
                <div className={cx('title')}>
                    <h2>ĐĂNG KÝ</h2>
                </div>
                <div className={cx('content')}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* <label>Họ tên</label> */}
                        <div className={cx('input-error')}>
                            <input placeholder="Họ và tên" {...register('username', { required: true,minLength:6 })} />
                            <p>{errors?.username?.type 
                                === 'required' 
                                ? 'Không được bỏ trống' 
                                : errors.username?.type === 'minLength'
                                ? 'Tên phải có từ 6 kí tự'
                                : ''}</p>
                        </div>

                        {/* <label>Email</label> */}
                        <div className={cx('input-error')}>
                            <input
                                placeholder="Nhập email"
                                {...register('email', {
                                    required: true,
                                    minLength: 6,
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: 'invalid email address',
                                    },
                                })}
                            />
                            <p>
                                {errors?.email?.type === 'required'
                                    ? 'Không được bỏ trống'
                                    : errors?.email?.type === 'minLength'
                                    ? 'Email phải có từ 6 kí tự'
                                    : errors?.email?.type === 'pattern'
                                    ? 'Nhập sai định dạng email!'
                                    : ''}
                            </p>
                        </div>
                        {/* <label>Mật khẩu</label> */}
                        <div className={cx('input-error')}>
                            <input
                                type="password"
                                placeholder="Nhập mật khẩu"
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
                            ĐĂNG KÝ
                        </button>
                        
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
