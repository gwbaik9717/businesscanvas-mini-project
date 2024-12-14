import React from "react";
import styled from "styled-components";

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
        <svg viewBox="0 0 24 24">
          <path d="M20.7 5.3c-.4-.4-1-.4-1.4 0L9 15.6l-4.3-4.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l5 5c.4.4 1 .4 1.4 0l11-11c.4-.4.4-1 0-1.4z" />
        </svg>
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

  svg {
    visibility: ${(props) => (props.checked ? "visible" : "hidden")};
    fill: white;
    width: 12px;
    height: 12px;
  }
`;
