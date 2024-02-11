import React from "react";

const ButtonPlay = ({ children, handleClick }) => {
  return (
    <>
      {handleClick ? (
        <button onClick={() => handleClick()}>{children}</button>
      ) : (
        <button>{children}</button>
      )}
    </>
  );
};

export default ButtonPlay;
