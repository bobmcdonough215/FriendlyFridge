import React from "react";

function Footer ({ children }) {
  return (
    <div
      style={{ height: 300, clear: "both", paddingBottom: 120, textAlign: "center" }}
      className="card-footer text-muted"
    >
      {children}
    </div>
  );
}

export default Footer;