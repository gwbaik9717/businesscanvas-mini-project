import React from "react";

interface ButtonProps<T extends React.ElementType = "button"> {
  as?: T;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = <T extends React.ElementType = "button">({
  as,
  ...props
}: ButtonProps<T> & React.ComponentPropsWithoutRef<T>) => {
  const Element = as || "button";

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClick) {
      props.onClick(e);
    }
  };

  return <Element onClick={handleClick} {...props} />;
};
