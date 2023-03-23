import styles from './RegisterShop.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useRef ,useState} from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectEmail,selectId } from '../../ReduxService/UserSlice';
import Province from '../Province'
const cx = classNames.bind(styles);
function RegisterShop() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedWard, setSelectedWard] = useState(null);
    

    const changeProvince=(a)=>{
        setSelectedProvince(a)
    }
    const changeDistrict=(a)=>{
        setSelectedDistrict(a)
    }
    const changeWard=(a)=>{
        setSelectedWard(a)
    }
    const email = useSelector(selectEmail)

    const onSubmit = (shop) => {
        console.log(selectedDistrict.value)
        shop.address=`${shop.address}, ${selectedWard.value}, ${selectedDistrict.value}, ${selectedProvince.value}`
        axios.post(`${process.env.REACT_APP_SERVER_AUTH_URI}/shop/register-shop`, shop,{
            headers: {
            'Content-Type': 'application/json'
            },
        })
        .then(response => {
            console.log("res",response.data)
        })
        .catch(error => {
            console.error(error);
        });
    };

    return (
        <div className={cx('login')}>
            <div className={cx('wrapper')}>

                
                <div className={cx('title')}>
                    <h2>ĐĂNG KÝ BÁN HÀNG</h2>
                </div>
                <div className={cx('content')}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Email */}
                        <div className={cx('input-error')}>
                            <input value={email} placeholder="Email" {...register('email', { required: true,minLength:6 })}       
                            />
                            <p>
                                {errors?.email?.type === 'minLength'
                                    ? 'Hãy đăng nhập lại'
                                    : ''}
                            </p>
                        </div>
                        {/* <label>Họ tên</label> */}
                        <div className={cx('input-error')}>
                            <input placeholder="Tên Shop" {...register('shopname', { required: true,minLength:6 })} />
                            <p>{errors?.shopname?.type 
                                === 'required' 
                                ? 'Không được bỏ trống' 
                                : errors.shopname?.type === 'minLength'
                                ? 'Tên phải có từ 6 kí tự'
                                : ''}</p>
                        </div>

                        {/* <label>Phone Number</label> */}
                        <div className={cx('input-error')}>
                            <input
                                placeholder="Nhập Số Điện Thoại"
                                {...register('phonenumber', {
                                    required: true,
                                    minLength: 8,
                                    pattern: {
                                        value: /^(\d{9}|\d{10})$/,
                                        message: 'Số điện thoại không hợp lệ',
                                    },
                                })}
                            />
                            <p>
                                {errors?.email?.type === 'required'
                                    ? 'Không được bỏ trống'
                                    : errors?.email?.type === 'pattern'
                                    ? 'Số điện thoại không hợp lệ'
                                    : ''}
                            </p>
                        </div>

                        {/* <label>Address</label> */}
                        <div className={cx('input-error')}>
                            <Province 
                                selectedProvince={selectedProvince}
                                selectedDistrict={selectedDistrict}
                                selectedWard={selectedWard}
                                changeDistrict={changeDistrict}
                                changeProvince={changeProvince}
                                changeWard={changeWard}
                            />
                            <input
                                placeholder="Nhập số nhà, đường...."
                                {...register('address', { required: true, minLength: 5 })}
                            />
                            <p>
                                {errors.password?.type === 'required'
                                    ? 'Không được bỏ trống'
                                    : errors.password?.type === 'minLength'
                                    ? 'Địa chỉ không hợp lệ'
                                    : ''}
                            </p>
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

export default RegisterShop;
