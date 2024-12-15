import React from "react";
import { Input } from "./Input";
import styled from "styled-components";
import { color, padding, transition } from "../../styles/theme/theme";

interface InputTextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "value"> {
  placeholder?: string;
  value: string;
  onValueChange?: (value: string) => void;
}

export const InputTextArea: React.FC<InputTextAreaProps> = (props) => {
  return <Input as={StyledInputTextArea} {...props} />;
};

const StyledInputTextArea = styled.textarea`
  padding: 5px ${padding.paddingLg};
  border: 1px solid ${color.border};
  border-radius: 4px;
  width: 100%;
  min-height: 54px;
  color: ${color.text};
  font-size: 16px;
  transition: ${transition.transition};

  /* Placeholder Text */
  &::placeholder {
    color: ${color.placeholder};
  }

  /* Hover State */
  &:hover {
    border-color: ${color.primary};
  }

  /* Focus State */
  &:focus {
    border-color: ${color.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
    outline: none;
  }

  /* Disabled State */
  &:disabled {
    background-color: #f5f5f5;
    color: #999;
    cursor: not-allowed;
  }
`;
