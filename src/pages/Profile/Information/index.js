import {
  MDBCol,
  MDBRow,
  MDBCardText,
  MDBCardBody,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import { memo, useState } from "react";
import Province from "../../../components/Province";

const Information = (props) => {
  const [introInput, setIntroInput] = useState("");
  const [addressInput, setAddressInput] = useState("");
  console.log("info render")
  // Address Input form
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);

  const [update, setUpdate] = useState(false);
  const [updateAddr, setUpdateAddress] = useState(false);
  const changeProvince = (a) => {
    setSelectedProvince(a);
  };
  const changeDistrict = (a) => {
    setSelectedDistrict(a);
  };
  const changeWard = (a) => {
    setSelectedWard(a);
  };
  /**/

 
  const updateIntro = () => {
    props.updateUser({ value: introInput, field: "introduction" });
    setIntroInput("");
  };
  const updateAddress = () => {
    const value = `${addressInput}, ${selectedWard.value}, ${selectedDistrict.value}, ${selectedProvince.value}.`;
    props.updateUser({ value, field: "address" });
    setAddressInput("");
  };

  return (
    <>
      <MDBCardBody className="text-black p-4">
        <div className="mb-5">
          <p className="lead fw-normal mb-1">Giới thiệu bản thân</p>
          <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
            <MDBRow>
              <MDBRow>
                <MDBCol>
                  <MDBCardText className="font-italic ">
                    {props.user?.introduction}
                  </MDBCardText>
                </MDBCol>
                <MDBCol>
                  <MDBIcon
                    fas
                    icon="edit"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setUpdate(!update);
                    }}
                  ></MDBIcon>
                </MDBCol>
              </MDBRow>

              {update && (
                <>
                  <MDBCol>
                    <MDBInput
                      className="col-6"
                      value={introInput}
                      onChange={(e) => {
                        setIntroInput(e.target.value);
                      }}
                    ></MDBInput>
                  </MDBCol>
                  <MDBCol>
                    <button
                      className="col-4 mt-1 btn btn-primary"
                      size="2x"
                      onClick={() => {
                        updateIntro();
                        setUpdate(false);
                      }}
                    >
                      Cập nhật
                    </button>
                  </MDBCol>
                </>
              )}
            </MDBRow>
          </div>

          <p className="lead fw-normal mt-2">Địa chỉ nhận hàng</p>
          <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
            <MDBRow>
              <MDBRow>
                <MDBCol className="col-11">
                  <MDBCardText className="font-italic mb-1 ">
                    {props.user?.address}
                  </MDBCardText>
                </MDBCol>
                <MDBCol className="col-1">
                  <MDBIcon
                    fas
                    icon="edit"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setUpdateAddress(!updateAddr);
                    }}
                  ></MDBIcon>
                </MDBCol>
              </MDBRow>
              {updateAddr && (
                <>
                  <MDBCol>
                    <Province
                      selectedProvince={selectedProvince}
                      selectedDistrict={selectedDistrict}
                      selectedWard={selectedWard}
                      changeDistrict={changeDistrict}
                      changeProvince={changeProvince}
                      changeWard={changeWard}
                    />
                    <MDBInput
                      className="col-6"
                      value={addressInput}
                      placeholder="Số đường,số nhà..."
                      onChange={(e) => {
                        setAddressInput(e.target.value);
                      }}
                    ></MDBInput>
                  </MDBCol>
                  <MDBCol>
                    <button
                      className="col-4 mt-1 btn btn-primary"
                      size="2x"
                      onClick={() => {
                        updateAddress();
                        setUpdateAddress(false);
                      }}
                    >
                      Cập nhật
                    </button>
                  </MDBCol>
                </>
              )}
            </MDBRow>
          </div>

        </div>
      </MDBCardBody>
    </>
  );
};

export default memo(Information);
