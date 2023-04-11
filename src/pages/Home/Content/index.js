import classNames from 'classnames/bind';
import styles from './Content.module.scss';
import { Container } from 'react-bootstrap';
import axios from '../../../utils/axios.config';
import { useEffect, useState } from 'react';
import { getInRedis } from '../../../utils/service';
import { useLocation } from 'react-router-dom';
import ProductCard from '../../../components/Products/ProductCard'

const cx = classNames.bind(styles);
const Content = () => {
    
    const [token,setToken]=useState("default")
    const [listProducts,setListProducts]=useState([])
    const [page,setPage]=useState(1)
    const [activePage,setActivePage]=useState(1)
    const [changePath,setChangePath]=useState(false)

    const location=useLocation()
    const searchParams = new URLSearchParams(location.search);
    
    getInRedis((token)=>{
        setToken(token)
    })

    const changePage=(index)=>{
        setActivePage(index+1)
        window.scrollTo(0,0)
    }
    const clickWard=(type)=>{
        if(type==='prev' && activePage>1){
            setActivePage(activePage-1)
        }
        else if(activePage<page) {
            setActivePage(activePage+1)
        }
    }
    useEffect(()=>{
        if(window.location.pathname==='/'){
            token&&axios.get(`${process.env.REACT_APP_SERVER_API_URI}/product/get-all/page/${activePage}`, {
                headers: {
                    token: `Bearer ${token}`,
                }
                })
                .then((response) => {
                    setListProducts(response.data.list)
                    setPage(response.data.page)
                    setChangePath(!changePath)
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else {
            const key=searchParams.get('key')
            console.log("bb")
            axios.get(`${process.env.REACT_APP_SERVER_API_URI}/product/product-search/${key}`)
            .then(response=>{
                setListProducts(response.data.list)
                setChangePath(!changePath)
                
            })
            .catch(error=>{
                console.loge(error)
            })
        }

    },[token,activePage,window.location.pathname])

    
    return (
        <div className={cx('Content','mt-5')}>
            <div className={cx('content-menu','mt-5')}>
                <Container className={cx('menu')}>
                        {
                        listProducts?.map((element)=>{
                            return <ProductCard key={element._id.toString()} product={element}/>
                        })}
                </Container>
            </div>


            <div className={cx('pagination','mt-5')}>
                
                <div className={cx('ward')}
                    onClick={()=>{
                        clickWard('prev')
                    }}
                >
                    <i className="fas fa-backward"></i>
                </div>
                {[...Array(page)]?.map((_,index)=>{
                    return (
                        <div key={index} className={cx('pagination-item' ,activePage===index+1&&"active")}
                        onClick={()=>changePage(index)}
                        >{index+1}</div>
                        )
                    })}
                <div  className={cx('ward')}
                    onClick={()=>{
                        clickWard('next')
                    }}
                >
                    <i className='fas fa-forward'></i>
                </div>
            </div> 
        </div>
    );
};

export default Content;
