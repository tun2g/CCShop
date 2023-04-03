import { MDBCard,
    MDBCardImage,
    MDBCol,
    MDBRow,
    MDBCardText,
    MDBContainer,
    MDBTypography,
    MDBCardBody,
    MDBIcon,
} from "mdb-react-ui-kit"
import axios from "axios"
import { useEffect, useState } from "react"
import { privateEmail } from "../../utils/function"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import Chat from "../Chat"
const ProfileOther=()=>{
    const [user,setUser]=useState()
    const [list,setList]=useState([])
    const [chat,setChat]=useState(false)
    const [loadProduct,setLoadProduct]=useState(false)
    const navigate = useNavigate()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("key");

    const hiddenEmail=privateEmail(user?user.email:"user@gmail.com")
    const changeChat=(a)=>{
      setChat(a)
    }

    useEffect(()=>{ 
      console.log('profile render')

      loadProduct&&getProductList()

      axios.get(`${process.env.REACT_APP_SERVER_AUTH_URI}/user/auth/${id}`)
      .then(res=>{
          setUser(res.data)
          setLoadProduct(true)
      })
      .catch(err=>{
          console.log(err)
      })
      
    },[loadProduct])

    const getProductList=()=>{
      user?.isShop&&axios.get(`${process.env.REACT_APP_SERVER_API_URI}/product/get-all/${user._id}`)
      .then(res=>{
          setList(res.data)
          setLoadProduct(false)
      })
      .then(err=>{
          console.log(err)
      })
    }

    return (
        <div className="gradient-custom-2" style={{ backgroundColor: '#f6f6f8' ,width:"100%",height:"100%"}}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                  <MDBCardImage src={user?.avatar}
                    alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" 
                    fluid style={{ borderRadius:'50%', width: '150px', zIndex: '1'}}
                    />
                </div>

                <div className="ms-3" style={{ marginTop: '130px' }}>
                  <MDBTypography tag="h5">{user?.username}</MDBTypography>
                  <MDBCardText>{hiddenEmail}</MDBCardText>
                </div>
              </div>
              <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                
                <div className="d-flex justify-content-end text-center py-1">
                  <div onClick={()=>setChat(true)} style={{cursor:"pointer"}}>
                    <MDBIcon far icon="comment" size="2x"/>
                    <MDBCardText className="small text-muted mb-0">Liên hệ</MDBCardText>
                  </div>
                </div>
              </div>
              <MDBCardBody className="text-black p-4">
                <div className="mb-5">
                <p className="lead fw-normal mb-1">Giới thiệu bản thân</p>
                  <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                    
                    <MDBRow>
                      <MDBRow>
                        <MDBCardText className="font-italic ">{user?.introduction}</MDBCardText>
                      </MDBRow>
                    </MDBRow>
                  </div>

                  <p className="lead fw-normal mt-2">Địa chỉ</p>
                  <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                    
                    <MDBRow>
                      <MDBRow>
                        <MDBCardText className="font-italic mb-1 ">{user?.address}</MDBCardText>
                      </MDBRow>
                    </MDBRow>
                  </div>
                {user?.isShop&& list?.map((pro,index)=>{
                    if(index %2===0)
                    return(
                      <MDBRow key={index}>
                      <MDBCol className="mb-2">
                        <MDBCardImage src={pro.imageurl} style={{cursor:"pointer"}} onClick={()=>{
                            navigate(`/product?key=${pro._id}`)
                            window.scrollTo(0,0)
                        }}
                          alt="image 1" className="w-100 rounded-3" />
                      </MDBCol>
                      {list[index+1]&&<MDBCol className="mb-2">
                        <MDBCardImage src={list[index+1].imageurl} style={{cursor:"pointer"}}  onClick={()=>{
                            navigate(`/product?key=${list[index+1]._id}`)
                            window.scrollTo(0,0)
                        }}
                          alt="image 1" className="w-100 rounded-3" />
                      </MDBCol>}
                    </MDBRow> 
                    )
                    else return <div key={index}></div>
                })
                }
                </div>

              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
        {chat&&<Chat changeChat={changeChat} user={user}/>}
    </div>
    )
}

export default ProfileOther