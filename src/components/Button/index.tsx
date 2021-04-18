import React from "react";
import cn from "classnames";

import b from "./Button.module.scss";

interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  wide?: boolean;
  yellow?: boolean;
  small?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  wide = false,
  yellow = false,
  small = false,
}) => {
  const buttonClasses = cn({
    [b.root]: true,
    [b.yellow]: yellow,
    [b.wide]: wide,
    [b.small]: small,
  });
  return (
    <button onClick={onClick} type="button" className={buttonClasses}>
      {children}
    </button>
  );
};

export default Button;
