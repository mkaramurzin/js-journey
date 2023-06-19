import React, { ReactNode } from "react";

interface Props {
  children: string;
  color?: "primary" | "secondary" | "info" | "success" | "danger";
  onButtonClick: () => void;
}

const Button = ({ children, color = "primary", onButtonClick }: Props) => {
  return (
    <button
      type="button"
      className={"btn btn-" + color}
      onClick={onButtonClick}
    >
      {children}
    </button>
  );
};

export default Button;
