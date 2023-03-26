import styles from './PostProduct.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectId } from '../../ReduxService/UserSlice';

const cx = classNames.bind(styles);
function PostProduct() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const shopid = useSelector(selectId)
    const [imagePath,setImagePath]=useState()
   

    const handleFileUpload = (e) => {
        const uploadData = new FormData();
        uploadData.append("file", e.target.files[0], "file");
        axios.post(`${process.env.REACT_APP_SERVER_API_URI}/file/upload`, uploadData,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(res => {
                setImagePath(res.data.file)
            })
            .catch(err => console.log(err))
      }
    
    const onSubmit = (product) => {
        product.file=imagePath
        product.shopid=shopid
        axios.post(`${process.env.REACT_APP_SERVER_API_URI}/product/upload`, product,{
            headers: {
            'Content-Type': 'application/json',
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
                    <h2>ĐĂNG BÁN SẢN PHẨM</h2>
                </div>
                <div className={cx('content')}>

                    <input type='file' onChange={(e) => handleFileUpload(e)} />

                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* <label>Họ tên</label> */}
                        <div className={cx('input-error')}>
                            <input placeholder="Tên sản phẩm" {...register('name', { required: true,minLength:6 })} />
                            <p>{errors?.name?.type 
                                === 'required' 
                                ? 'Không được bỏ trống' 
                                : errors.shopname?.type === 'minLength'
                                ? 'Tên phải có từ 6 kí tự'
                                : ''}</p>
                        </div>
                        
                        <div className={cx('input-error')}>
                            <input
                                placeholder="Mô tả sản phẩm"
                                {...register('description', {
                                    required: true,
                                    minLength: 8,
                                    
                                })}
                            />
                            <p>
                                {errors?.description?.type === 'required'
                                    ? 'Không được bỏ trống'
                                    : errors.description?.type==='minLenght'
                                    ? 'Ít nhất 8 kí tự'
                                    : ''
                                }
                            </p>
                        </div>
                        {/* <label>Address</label> */}
                        <div className={cx('input-error')}>
                            <input
                                placeholder="Nhập giá sản phẩm"
                                {...register('price', { required: true, minLength: 1 })}
                            />
                            <p>
                                {errors.price?.type === 'required'
                                    ? 'Không được bỏ trống'
                                    : ''}
                            </p>
                        </div>
                        
                        {/* <label>Address</label> */}
                        <div className={cx('input-error')}>
                            <input
                                placeholder="Nhập số lượng sản phẩm"
                                {...register('quantity', { required: true, minLength: 1 })}
                            />
                            <p>
                                {errors.quantity?.type === 'required'
                                    ? 'Không được bỏ trống'
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

export default PostProduct;
