import React from "react";

function Success(props) {
  return (
    <div>
      <div class="alert alert-success" role="alert">
        {props.message}
      </div>
    </div>
  );
}

export default Success;
