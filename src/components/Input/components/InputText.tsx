import React from "react";
import styled from "styled-components";
import { color, height, padding, transition } from "../../../styles/theme";
import { Input } from "./Input";

interface InputTextProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value"> {
  placeholder?: string;
  value: string;
  onValueChange?: (value: string) => void;
}

export const InputText: React.FC<InputTextProps> = (props) => {
  return <Input as={StyledInput} {...props} />;
};

const StyledInput = styled.input`
  padding: 0 ${padding.paddingLg};
  border: 1px solid ${color.border};
  border-radius: 4px;
  width: 100%;
  height: ${height.heightSm};
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
