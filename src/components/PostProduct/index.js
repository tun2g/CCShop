import styles from './PostProduct.module.scss';
import classNames from 'classnames/bind';
import {useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { selectId } from '../../ReduxService/UserSlice';
import { useNavigate } from 'react-router-dom';


const cx = classNames.bind(styles);
function PostProduct() {
    const {
        register,
        handleSubmit,
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
        console.log(description)
        product.file=imagePath
        product.description=description
        product.shopid=shopid
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
    };

    return (
            <div className={cx('wrapper')}>
                
                <div className={cx('title')}>
                    <h2>ĐĂNG BÁN SẢN PHẨM</h2>
                </div>

                
                <div className={cx('content')}>

                    <input placeholder='Hình ảnh' type='file' onChange={(e) => handleFileUpload(e)}/>

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
                                ĐĂNG SẢN PHẨM
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