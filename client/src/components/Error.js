import React from "react";

function Error(props) {
  return (
    <div>
      <div class="alert alert-danger" role="alert">
      {props.message}
      </div>
    </div>
  );
}

export default Error;
