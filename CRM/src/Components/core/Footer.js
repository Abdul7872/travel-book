import React from "react";

const Footer = () => {
  return (
    <div className="box-footer">
      <div className="row">
        <div className="description-block border-right">
          <h5 className="description-header">
            &copy; {new Date().getFullYear()} Book-your-journey
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Footer;
