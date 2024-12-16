import React from "react";
import styled from "styled-components";

interface IconWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  padding?: number;
  children: React.ReactNode;
}

export const IconWrapper: React.FC<IconWrapperProps> = ({
  size = 24,
  padding = 4,
  children,
  ...props
}) => {
  return (
    <StyledIconWrapper size={size} padding={padding} {...props}>
      {children}
    </StyledIconWrapper>
  );
};

const StyledIconWrapper = styled.div<{ size: number; padding: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  padding: ${({ padding }) => `${padding}px`};
`;
