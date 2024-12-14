import React from "react";
import { Input } from "../Input/Input";

interface TextProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
  > {
  placeholder?: string;
  value: string;
  onValueChange?: (value: string) => void;
}

export const Text: React.FC<TextProps> = (props) => {
  return <Input as="input" {...props} />;
};
