import React from "react";
import { Button } from "./Button";

interface ButtonIconOnlyProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
}

export const ButtonIconOnly: React.FC<ButtonIconOnlyProps> = (props) => {
  return (
    <Button as="button" {...props}>
      {props.children}
    </Button>
  );
};
