import React from "react";
import styled from "styled-components";
import { CheckIcon } from "../Icons/CheckIcon";

interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "checked"> {
  checked: boolean;
  onValueChange?: (value: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onValueChange,
  ...props
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLInputElement>
  ) => {
    if (onValueChange) {
      onValueChange(e.target.checked);
    }
  };

  return (
    <StyledCheckboxContainer>
      <StyledHiddenCheckbox
        checked={checked}
        onChange={handleChange}
        {...props}
      />
      <StyledCheckbox checked={checked}>
        <CheckIcon
          width={12}
          height={12}
          color="white"
          visibility={checked ? "visible" : "hidden"}
        />
      </StyledCheckbox>
    </StyledCheckboxContainer>
  );
};

const StyledCheckboxContainer = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
`;

const StyledHiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;
`;

const StyledCheckbox = styled.div<{ checked: boolean }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border: 2px solid ${(props) => (props.checked ? "#007bff" : "#ccc")};
  border-radius: 4px;
  background-color: ${(props) => (props.checked ? "#007bff" : "transparent")};
  transition: all 0.2s ease;
`;
