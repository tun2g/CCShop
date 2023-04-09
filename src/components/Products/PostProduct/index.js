import styles from './PostProduct.module.scss';
import classNames from 'classnames/bind';
import {useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { selectId, setName } from '../../../ReduxService/UserSlice';
import { useNavigate,useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);


function PostProduct() {

    const location=useLocation()
    const searchParams = new URLSearchParams(location.search);
    
    const update=searchParams.get('update')
    const _id=searchParams.get('_id')

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();


    const navigate=useNavigate()

    const shopid = useSelector(selectId)
    const [imagePath,setImagePath]=useState('')
    const  [description,setDescripstion]=useState('')
    const handleChangeDescription=(value)=>{
        setDescripstion(value)
    }


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
        product.description=description
        product.shopid=shopid
        product._id=_id
        if(update!=="true") {
            axios.post(`${process.env.REACT_APP_SERVER_API_URI}/product/upload`, product,{
                headers: {
                'Content-Type': 'application/json',
                },
            })
            .then(response => {
                navigate('/')
                window.scrollTo(0,0)            
            })
            .catch(error => {
                console.error(error);
            });
        }
        else {
            axios.post(`${process.env.REACT_APP_SERVER_API_URI}/product/update`, product,{
                headers: {
                'Content-Type': 'application/json',
                },
            })
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.error(error);
            });
        }
    };

    useEffect(()=>{
        if(update === 'true')
        {
            axios.get(`${process.env.REACT_APP_SERVER_API_URI}/product/get-product/${_id}`)
            .then(response=>{
                setDescripstion(response.data?.description)
                setImagePath(response.data?.imageurl)
                setValue('name',response.data.name)
                setValue('introduction',response.data.introduction)
                setValue('quantity',response.data.quantity)
                setValue('price',response.data.price)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },[])

    return (
            <div className={cx('wrapper')}>
                
                <div className={cx('title')}>
                    <h2>{update==="true"?"CHỈNH SỬA SẢN PHẨM":"ĐĂNG BÁN SẢN PHẨM"}</h2>
                </div>

                
                <div className={cx('content')}>
                    <>
                    * Hình ảnh
                    </>
                    <label htmlFor='file-input' className={cx("file-input")}

                        
                    >
                        {imagePath?
                            <img src={imagePath} width="50px" height="50px"/>
                            :
                            <div>
                                Thêm hình ảnh
                            </div>
                        }
                    </label>
                    <input id='file-input' placeholder='Hình ảnh' type='file'  
                        onChange={(e) => handleFileUpload(e)}
                        style={{display:"none"}}
                    />

                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className={cx('input-error')}>
                            <input placeholder="Tên sản phẩm" {...register('name', { required: true,minLength:6 })} />
                            <p className={cx('err')}>{errors?.name?.type 
                                === 'required' 
                                ? 'Không được bỏ trống' 
                                : errors.shopname?.type === 'minLength'
                                ? 'Tên phải có từ 6 kí tự'
                                : ''}</p>
                        </div>
                        <div className={cx('input-error')}>
                            <input
                                placeholder="Giới thiệu sản phẩm"
                                {...register('introduction', {
                                    required: true,
                                    minLength: 8,
                                    
                                })}
                            />
                            <p className={cx('err')}>
                                {errors?.description?.type === 'required'
                                    ? 'Không được bỏ trống'
                                    : errors.description?.type==='minLenght'
                                    ? 'Ít nhất 8 kí tự'
                                    : ''
                                }
                            </p>
                        </div>
                        <div className={cx('detail','mb-5')}> 
                            <div>
                                <ReactQuill
                                    onChange={handleChangeDescription}
                                    theme='snow'
                                    value={description}
                                    formats={formats} 
                                    placeholder='Mô tả sản phẩm'
                                    />
                            </div>

                        </div>
                        
                        {/* <label>Address</label> */}
                        <div className={cx('input-error')}>
                            <input
                                placeholder="Nhập giá sản phẩm"
                                {...register('price', { required: true, minLength: 1 })}
                            />
                            <p className={cx('err')}>
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
                            <p className={cx('err')}>
                                {errors.quantity?.type === 'required'
                                    ? 'Không được bỏ trống'
                                    : ''}
                            </p>
                        </div>
                        <div>
                            <div className='col-5'>

                            </div>
                            <div className='col-3'>
                            <button  className={cx('submit')} type="submit">
                                {update?"CẬP NHẬT":"ĐĂNG SẢN PHẨM"}
                            </button>

                            </div>
                        </div>
                        
                    </form>
                </div>

                
            </div>
    );
}

export default PostProduct;


const formats = [
  'header',
  'header1',
  'header2',
  'header3',
  'header4',
  'header5',
  'header6',
  'heading',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'color'  // thêm thuộc tính định dạng "color"
];