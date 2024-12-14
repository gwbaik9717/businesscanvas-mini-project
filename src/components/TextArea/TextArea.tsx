import React from "react";
import { Input } from "../Input/Input";

interface TextAreaProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    "onChange" | "value"
  > {
  placeholder?: string;
  value: string;
  onValueChange?: (value: string) => void;
}

export const TextArea: React.FC<TextAreaProps> = (props) => {
  return <Input as="textarea" {...props} />;
};
