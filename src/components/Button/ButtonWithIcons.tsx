import React from "react";
import { Button } from "./Button";

interface ButtonWithIconsProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  onClick?: () => void;
}

export const ButtonWithIcons: React.FC<ButtonWithIconsProps> = (props) => {
  return (
    <Button as="button" {...props}>
      {props.startContent}
      {props.children}
      {props.endContent}
    </Button>
  );
};
