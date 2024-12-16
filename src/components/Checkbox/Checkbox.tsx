import React from "react";
import styled from "styled-components";
import { CheckIcon } from "../Icons/components/CheckIcon";
import { transition, color, radius } from "../../styles/theme";

interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "checked"> {
  checked?: boolean;
  onValueChange?: (value: boolean) => void;
  readonly?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onValueChange,
  width = 20,
  height = 20,
  style,
  readonly = false,
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
    <StyledCheckboxContainer
      width={width}
      height={height}
      style={style}
      readonly={readonly}
    >
      <StyledHiddenCheckbox
        checked={checked}
        onChange={handleChange}
        {...props}
      />
      <StyledCheckbox checked={checked}>
        <CheckIcon
          width={12}
          height={12}
          color={color.bgContainer}
          visibility={checked ? "visible" : "hidden"}
        />
      </StyledCheckbox>
    </StyledCheckboxContainer>
  );
};

const StyledCheckboxContainer = styled.label<{
  width?: number | string;
  height?: number | string;
  readonly?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  cursor: ${({ readonly }) => (readonly ? "auto" : "pointer")};
  width: ${({ width }) => (typeof width === "number" ? `${width}px` : width)};
  height: ${({ height }) =>
    typeof height === "number" ? `${height}px` : height};
`;

const StyledHiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;
`;

const StyledCheckbox = styled.div<{
  checked?: boolean;
}>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => (props.checked ? color.primary : color.border)};
  border-radius: ${radius.borderRadiusXs};
  background-color: ${(props) =>
    props.checked ? color.primary : color.transparent};
  transition: ${transition.transition};
  width: 100%;
  height: 100%;
`;
