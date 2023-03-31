import { useSelector } from "react-redux"
import { MDBCard,
    MDBCardImage,
    MDBCol,
    MDBRow,
    MDBCardText,
    MDBContainer,
    MDBTypography,
    MDBCardBody,
    MDBInput,
} from "mdb-react-ui-kit"
import { selectId } from "../../ReduxService/UserSlice"
import axios from "axios"
import { useEffect, useState } from "react"
import ModalAvatar from "../ModalAvatar"
import { privateEmail } from "../../utils/function"
import Province from "../Province"

const Profile=()=>{
    const id=useSelector(selectId)
    const [user,setUser]=useState(false)
    const [hover,setHover]=useState('none')
    const [introInput,setIntroInput]=useState('')
    const [addressInput,setAddressInput]=useState('')
    const [list,setList]=useState([])

    // Address Input form
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
    /**/
    
    const [loadProduct,setLoadProduct]=useState(false)

    //set re-render address
    const [newAddress,setNewAddress]=useState(false)

    //set re-render intro
    const [newIntro,setNewIntro]=useState(false)

    //image file input 
    const [imageInput,setImageInput]=useState()

    // image path in clouddiary
    const [imagePath,setImagePath]=useState()
    
    // set close ModalAvatar
    const [show,setShow] = useState(false)
    
    // click Oke in Modal Avatar
    const [change,setChange]= useState(false)
    
    // reload new avatar
    const [reload,setReload]=useState(false)
     

    const hiddenEmail=privateEmail(user?user.email:"user@gmail.com")

    const handleChange=(a)=>{
      setChange(a)
    }
    const getProductList=()=>{
      user?.isShop&& axios.get(`${process.env.REACT_APP_SERVER_API_URI}/product/get-all/${user._id}`)
      .then(res=>{
          setList(res.data)
          setLoadProduct(false)
      })
      .then(err=>{
          console.log(err)
      })
    }

    useEffect(()=>{ 
      console.log('profile render')
      loadProduct&&getProductList()

      // tải ảnh đại diện
      reload&&updateUser({value:imagePath,field:"avatar"})

      // tải file lên Cloudiary
      change&&uploadFile()
      
      axios.get(`${process.env.REACT_APP_SERVER_AUTH_URI}/user/auth/${id}`)
      .then(res=>{
          setUser(res.data)
          setLoadProduct(true)
      })
      .catch(err=>{
          console.log(err)
      })
      
      
    },[imageInput,change,reload,newIntro,newAddress,loadProduct])
    
  
    
    
    const updateAvata=(e)=>{
      setImageInput(e.target.files[0])
      setShow(true)
    }
    const uploadFile=()=>{
      
      const uploadData = new FormData();
      uploadData.append("file",imageInput, "file");
      axios.post(`${process.env.REACT_APP_SERVER_API_URI}/file/upload`, uploadData,{
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      })
      .then(res => {
          setImagePath(res.data.file)
          setReload(true)
          setChange(false)
      })
      .catch(err => console.log(err))
    }
      
      const updateUser=({value,field})=>{
        axios.post(`${process.env.REACT_APP_SERVER_AUTH_URI}/user/update-one`,{value,_id:user._id,field},{
          headers:{
            "Content-Type":"application/json"
          }
        })
        .then(res=>{
        // ngăn tải ảnh khi re-render
          if (field==="avatar") {
            setReload(false)
          }
          else if(field==="introduction"){
            setNewIntro(!newIntro)
          }
          else if(field==="address"){
            setNewAddress(!newAddress)
          }
          
        })
        .catch(err=>{
          console.log(err)
        })       
      }

      const updateIntro=()=>{
          updateUser({value:introInput,field:"introduction"})
          setIntroInput('')
      }
      const updateAddress=()=>{
          const value=`${addressInput}, ${selectedWard.value}, ${selectedDistrict.value}, ${selectedProvince.value}.`
          updateUser({value,field:"address"})
          setAddressInput('')
      }
    return (
        <div className="gradient-custom-2" style={{ backgroundColor: '#f6f6f8' }}>
          <ModalAvatar
                    change={change}
                    handleChange={handleChange}
                    show={show}
                    image={imageInput}
                    setShow={setShow}
                    title={'Cập nhật ảnh đại diện'}
                    // body={'Bạn chưa đăng nhập, nhấn OK để đăng nhập!'}
                    textPrimary={'Đăng nhập'}
                    btn1={"Oke"}
                    btn2={'Hủy'}
          />
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                <label htmlFor="fileInput" className="ms-4 text-black btn bodrer" 
                    style={{width:'152px',
                            height:"152px",
                            borderRadius:'50%',
                            backgroundColor:"#f6f6f9",
                            position:'absolute', 
                            display: hover,
                            justifyContent:'center',
                            alignItems:'center',
                            top:70,left:0,zIndex:11}}
                    onMouseOut={()=>setHover('none')}
                    >
                        Cập nhật
                    </label>
                    <input id="fileInput" type="file" style={{display:'none'}} onChange={(e)=>updateAvata(e)}/>
                    
                  <MDBCardImage src={user?.avatar}
                    alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" 
                    fluid style={{ borderRadius:'50%', width: '150px', zIndex: '1'}}
                    onMouseOver={()=>setHover('flex')}
                    />
                </div>

                <div className="ms-3" style={{ marginTop: '130px' }}>
                  <MDBTypography tag="h5">{user?.username}</MDBTypography>
                  <MDBCardText>{hiddenEmail}</MDBCardText>
                </div>
              </div>
              <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <MDBCardText className="mb-1 h5">253</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Photos</MDBCardText>
                  </div>
                  <div className="px-3">
                    <MDBCardText className="mb-1 h5">1026</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
                  </div>
                  <div>
                    <MDBCardText className="mb-1 h5">478</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Following</MDBCardText>
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
                      <MDBCol>
                        <MDBInput className="col-6" value={introInput} onChange={(e)=>{setIntroInput(e.target.value)}}></MDBInput>
                      </MDBCol>
                      <MDBCol>
                        <button  className="col-4 mt-1 btn btn-primary" size="2x"
                          onClick={updateIntro}
                        >Chỉnh sửa</button>
                      </MDBCol>
                    </MDBRow>
                  </div>

                  <p className="lead fw-normal mt-2">Địa chỉ nhận hàng</p>
                  <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                    
                    <MDBRow>
                      <MDBRow>
                        <MDBCardText className="font-italic mb-1 ">{user?.address}</MDBCardText>
                      </MDBRow>
                      <MDBCol>
                        <Province 
                          selectedProvince={selectedProvince}
                          selectedDistrict={selectedDistrict}
                          selectedWard={selectedWard}
                          changeDistrict={changeDistrict}
                          changeProvince={changeProvince}
                          changeWard={changeWard}
                        />
                        <MDBInput className="col-6" value={addressInput} placeholder="Số đường,số nhà..." onChange={(e)=>{setAddressInput(e.target.value)}}></MDBInput>
                      </MDBCol>
                      <MDBCol>
                        <button  className="col-4 mt-1 btn btn-primary" size="2x"
                          onClick={updateAddress}
                        >Chỉnh sửa</button>
                      </MDBCol>
                    </MDBRow>
                  </div>

                {user?.isShop&& list?.map((pro,index)=>{
                    if(index %2===0)
                    return(
                      <MDBRow>
                      <MDBCol className="mb-2">
                        <MDBCardImage src={pro.imageurl}
                          alt="image 1" className="w-100 rounded-3" />
                      </MDBCol>
                      {list[index+1]&&<MDBCol className="mb-2">
                        <MDBCardImage src={list[index+1].imageurl}
                          alt="image 1" className="w-100 rounded-3" />
                      </MDBCol>}
                    </MDBRow> 
                    )

                })
                }
                </div>

              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
    )
}

export default Profile