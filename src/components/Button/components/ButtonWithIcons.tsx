import React from "react";
import { Button } from "./Button";
import styled, { css } from "styled-components";
import {
  color,
  fontSize,
  fontWeight,
  padding,
  radius,
  height,
} from "../../../styles/theme";

interface ButtonWithIconsProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  variant?: "primary" | "secondary";
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

const variantStyles = {
  primary: css`
    background-color: ${color.primary};
    color: ${color.bgContainer};
    border: none;

    &:hover {
      background-color: ${color.primaryHover};
    }

    &:active {
      background-color: ${color.primaryActive};
    }
  `,
  secondary: css`
    background-color: ${color.bgContainer};
    color: ${color.text};
    border: 1px solid ${color.border};

    &:hover {
      background-color: ${color.bgContainerHover};
    }

    &:active {
      background-color: ${color.bgContainerDisabled};
    }
  `,
};

const StyledButton = styled(Button)<ButtonWithIconsProps>`
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

  ${({ variant = "primary" }) => variantStyles[variant]}

  &:disabled {
    background-color: ${color.bgContainerDisabled};
    border: 1px solid ${color.border};
    color: ${color.border};
    cursor: not-allowed;
  }
`;
