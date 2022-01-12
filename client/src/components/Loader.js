import React, { useState } from "react";
import HashLoader from "react-spinners/HashLoader";

function Loader() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#000");
  // Can be a string as well. Need to ensure each key-value pair ends with ;
  /*const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  */
  return (
    <div>
      <div className="sweet-loading">
        <HashLoader color={color} loading={loading} css='' size={50} />
      </div>
    </div>
  );
}

export default Loader;
