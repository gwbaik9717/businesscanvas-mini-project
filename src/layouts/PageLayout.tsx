import React from "react";
import styled from "styled-components";

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return <StyledPageLayout>{children}</StyledPageLayout>;
};

const StyledPageLayout = styled.div`
  width: 100%;
  box-sizing: border-box;
`;
