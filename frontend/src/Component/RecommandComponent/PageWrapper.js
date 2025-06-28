import React from "react";

const PageWrapper = ({ children }) => {
  return (
    <div className="page" style={{}}>
      {children}
    </div>
  );
};

export default PageWrapper;
