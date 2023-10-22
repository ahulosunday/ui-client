import React, { useContext, useEffect, useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  alignItems: "center", 
  borderColor: "green",
};
function Loadings (props){
 const [color, setColor] = useState("#ffffff");
    return(
         <ClipLoader
        color={color}
        loading={props.loading}
       cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    )
}
export default Loadings;