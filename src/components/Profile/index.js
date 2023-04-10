import { useSelector } from "react-redux";
import {
  MDBCard,
  MDBCardImage,
  MDBCol,
  MDBRow,
  MDBCardText,
  MDBContainer,
  MDBTypography,
  MDBCardBody,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import { selectId } from "../../ReduxService/UserSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import ModalAvatar from "../ModalAvatar";
import { privateEmail } from "../../utils/function";
import Province from "../Province";
import Information from "./Information";

const Profile = () => {
  const id = useSelector(selectId);

  const [user, setUser] = useState(false);
  const [hover, setHover] = useState("none");

  /**/
  const [loadProduct, setLoadProduct] = useState(false);

  const changeLoadProduct = (a) => {
    setLoadProduct(a);
  };

  //image file input
  const [imageInput, setImageInput] = useState();

  // image path in clouddiary
  const [imagePath, setImagePath] = useState();

  // set close ModalAvatar
  const [show, setShow] = useState(false);

  // click Oke in Modal Avatar
  const [change, setChange] = useState(false);

  // re-render
  const [reRender, setReRender] = useState(false);

  // reload new avatar
  const [reload, setReload] = useState(false);

  const hiddenEmail = privateEmail(user ? user.email : "user@gmail.com");

  const handleChange = (a) => {
    setChange(a);
  };

  useEffect(() => {
    console.log("profile render");

    // tải ảnh đại diện
    reload && updateUser({ value: imagePath, field: "avatar" });

    // tải file lên Cloudiary
    change && uploadFile();

    axios
      .get(`${process.env.REACT_APP_SERVER_AUTH_URI}/user/auth/${id}`)
      .then((res) => {
        setUser(res.data);
        setLoadProduct(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [imageInput, change, reload, reRender]);

  const updateAvata = (e) => {
    setImageInput(e.target.files[0]);
    setShow(true);
  };
  const uploadFile = () => {
    const uploadData = new FormData();
    uploadData.append("file", imageInput, "file");
    axios
      .post(`${process.env.REACT_APP_SERVER_API_URI}/file/upload`, uploadData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setImagePath(res.data.file);
        setReload(true);
        setChange(false);
      })
      .catch((err) => console.log(err));
  };

  const updateUser = ({ value, field }) => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_AUTH_URI}/user/update-one`,
        { value, _id: user._id, field },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        // ngăn tải ảnh khi re-render
        if (field === "avatar") {
          setReload(false);
        } else {
          setReRender(!reRender);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="gradient-custom-2" style={{ backgroundColor: "#f6f6f8" }}>
      <ModalAvatar
        change={change}
        handleChange={handleChange}
        show={show}
        image={imageInput}
        setShow={setShow}
        title={"Cập nhật ảnh đại diện"}
        // body={'Bạn chưa đăng nhập, nhấn OK để đăng nhập!'}
        textPrimary={"Đăng nhập"}
        btn1={"Oke"}
        btn2={"Hủy"}
      />
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div
                className="rounded-top text-white d-flex flex-row"
                style={{ backgroundColor: "#000", height: "200px" }}
              >
                <div
                  className="ms-4 mt-5 d-flex flex-column"
                  style={{ width: "150px" }}
                >
                  <label
                    htmlFor="fileInput"
                    className="ms-4 text-black btn bodrer"
                    style={{
                      width: "152px",
                      height: "152px",
                      borderRadius: "50%",
                      backgroundColor: "#f6f6f9",
                      position: "absolute",
                      display: hover,
                      justifyContent: "center",
                      alignItems: "center",
                      top: 70,
                      left: 0,
                      zIndex: 11,
                    }}
                    onMouseOut={() => setHover("none")}
                  >
                    Cập nhật
                  </label>
                  <input
                    id="fileInput"
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => updateAvata(e)}
                  />

                  <MDBCardImage
                    src={user?.avatar}
                    alt="Generic placeholder image"
                    className="mt-4 mb-2 img-thumbnail"
                    fluid
                    style={{ borderRadius: "50%", width: "150px", zIndex: "1" }}
                    onMouseOver={() => setHover("flex")}
                  />
                </div>

                <div className="ms-3" style={{ marginTop: "130px" }}>
                  <MDBTypography tag="h5">{user?.username}</MDBTypography>
                  <MDBCardText>{hiddenEmail}</MDBCardText>
                </div>
              </div>
              <div
                className="p-4 text-black"
                style={{ backgroundColor: "#f8f9fa" }}
              >
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <MDBCardText className="mb-1 h5">253</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">
                      Photos
                    </MDBCardText>
                  </div>
                  <div className="px-3">
                    <MDBCardText className="mb-1 h5">1026</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">
                      Followers
                    </MDBCardText>
                  </div>
                  <div>
                    <MDBCardText className="mb-1 h5">478</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">
                      Following
                    </MDBCardText>
                  </div>
                </div>
              </div>
              <Information
                user={user}
                changeLoadProduct={changeLoadProduct}
                loadProduct={loadProduct}
                updateUser={updateUser}
              />
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Profile;
