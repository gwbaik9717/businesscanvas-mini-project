import React from "react";
import styled from "styled-components";
import { color } from "../../styles/theme/theme";

interface DividerProps {
  padding?: string;
  style?: React.CSSProperties;
}

export const Divider: React.FC<DividerProps> = ({ style, padding }) => {
  return (
    <StyledDivider padding={padding}>
      <div className="divider" style={style} />
    </StyledDivider>
  );
};

const StyledDivider = styled.div<DividerProps>`
  padding: ${(props) => props.padding || "0"};

  .divider {
    width: 100%;
    height: 1px;
    background-color: ${(props) => props.color || color.border};
  }
`;
