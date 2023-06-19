import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onDismissClicked: () => void;
  color?: "primary" | "success" | "warning" | "danger";
}

const Alert = ({ children, color = "primary", onDismissClicked }: Props) => {
  return (
    <div
      className={"alert alert-" + color + " alert-dismissible fade show"}
      role="alert"
    >
      {children}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={onDismissClicked}
      ></button>
    </div>
  );
};

export default Alert;
