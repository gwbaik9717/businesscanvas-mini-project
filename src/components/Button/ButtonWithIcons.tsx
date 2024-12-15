import React from "react";
import { Button } from "./Button";
import styled from "styled-components";
import {
  color,
  fontSize,
  fontWeight,
  padding,
  radius,
  height,
} from "../../styles/theme/theme";

interface ButtonWithIconsProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  onClick?: () => void;
}

export const ButtonWithIcons: React.FC<ButtonWithIconsProps> = (props) => {
  return (
    <StyledButton {...props}>
      {props.startContent}
      {props.children}
      {props.endContent}
    </StyledButton>
  );
};

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${padding.paddingSm};
  padding: 0 ${padding.paddingLg};
  font-weight: ${fontWeight.fontWeightBold};
  font-size: ${fontSize.fontSizeSm};
  border-radius: ${radius.borderRadiusSm};
  background-color: ${color.primary};
  color: ${color.bgContainer};
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  height: ${height.heightSm};

  &:hover {
    background-color: ${color.primaryHover};
  }

  &:active {
    background-color: ${color.primaryActive};
  }

  &:disabled {
    background-color: ${color.bgContainerDisabled};
    color: ${color.border};
    cursor: not-allowed;
  }
`;
