import { useState } from 'react';
import { MDBCard, MDBCol, MDBIcon, MDBRow } from 'mdb-react-ui-kit';


const RatingStar = (props) => {
    const [hover, setHover] = useState(0);
    return (
      <div className="star-rating d-inline-block">
        <MDBRow>

        {[...Array(5)].map((star, index) => {
            index += 1;
            return (
                <MDBCol key={index}>

            <MDBCard
              type="button"
              key={index}
              style={{color:index <= (hover || props.rating) ? "red" : 'black'}}
              onClick={() => props.changeRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(props.rating)}
              className="d-inline-block"
              >
            
             <MDBIcon fas icon="star" />
            </MDBCard>
                  </MDBCol>
          );
        })}
        </MDBRow>
      </div>
    );
  };

  export default RatingStar