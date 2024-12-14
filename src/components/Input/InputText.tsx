import React from "react";
import { Input } from "./Input";

interface InputTextProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value"> {
  placeholder?: string;
  value: string;
  onValueChange?: (value: string) => void;
}

export const InputText: React.FC<InputTextProps> = (props) => {
  return <Input as="input" {...props} />;
};
