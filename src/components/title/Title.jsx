import React from "react";

const Title = ({ title, className }) => {
  return <div className={`title ${className}`}>{title}</div>;
};

export default Title;
