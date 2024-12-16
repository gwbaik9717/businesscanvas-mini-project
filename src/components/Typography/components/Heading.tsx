import styled from "styled-components";
import {
  fontSize,
  fontWeight as themeFontWeight,
  lineHeight as themeLineHeight,
} from "../../../styles/theme";
import React from "react";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface HeadingProps<T extends React.ElementType> {
  as?: T;
  fontWeight?: keyof typeof themeFontWeight;
  lineHeight?: keyof typeof themeLineHeight;
}

export const Heading = <T extends HeadingLevel = "h1">({
  as,
  fontWeight,
  lineHeight: lineHeightProp,
  ...props
}: HeadingProps<T> & React.ComponentPropsWithoutRef<T>) => {
  const Element = as || "h1";

  return (
    <StyledHeading
      as={Element}
      fontWeight={fontWeight}
      lineHeight={lineHeightProp}
      {...props}
    />
  );
};

const StyledHeading = styled.h1<HeadingProps<HeadingLevel>>`
  margin: 0;
  font-size: ${({ as }) => {
    switch (as) {
      case "h1":
        return fontSize.fontSizeXl;
      case "h2":
        return fontSize.fontSizeLg;
      case "h3":
        return fontSize.fontSizeMd;
      case "h4":
        return fontSize.fontSizeSm;
      default:
        return fontSize.fontSizeMd;
    }
  }};
  font-weight: ${({ fontWeight }) => fontWeight && themeFontWeight[fontWeight]};
  line-height: ${({ lineHeight }) => lineHeight && themeLineHeight[lineHeight]};
`;
