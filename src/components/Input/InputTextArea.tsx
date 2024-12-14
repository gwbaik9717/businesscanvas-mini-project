import React from "react";
import { Input } from "./Input";

interface InputTextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "value"> {
  placeholder?: string;
  value: string;
  onValueChange?: (value: string) => void;
}

export const InputTextArea: React.FC<InputTextAreaProps> = (props) => {
  return <Input as="textarea" {...props} />;
};
