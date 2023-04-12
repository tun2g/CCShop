import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";
import TodoList from "./TodoList";
import SalesAnalysis from "./SalesAnalysis";

const Report = () => {
  return (
    <>
      <MDBContainer fluid className="mt-5">
        <MDBCard>
          <MDBCardBody style={{ minHeight: "1000px" }}>
            <MDBCol>

              <MDBRow>
                <TodoList/>
              </MDBRow>

              <MDBRow>
                <SalesAnalysis/>              
              </MDBRow>

            </MDBCol>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  );
};

export default Report;
