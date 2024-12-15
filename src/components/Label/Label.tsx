import React from "react";
import styled from "styled-components";
import { color, fontSize, fontWeight, padding } from "../../styles/theme/theme";

interface LabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  required?: boolean;
  style?: React.CSSProperties;
}

export const Label: React.FC<LabelProps> = ({
  required = false,
  children,
  ...props
}) => {
  return (
    <StyledLabel {...props}>
      {children}
      {required && <span className="required">*</span>}
    </StyledLabel>
  );
};

const StyledLabel = styled.span`
  display: block;
  margin-bottom: 4px;
  font-size: ${fontSize.fontSizeXl};
  font-weight: ${fontWeight.fontWeightBold};
  color: ${color.icon};
  padding: ${padding.paddingSm} 0;
  width: fit-content;

  .required {
    margin-left: 4px;
    color: ${color.error};
  }
`;
