import styled from "styled-components";
import {
  fontSize as themeFontSize,
  fontWeight as themeFontWeight,
  lineHeight as themeLineHeight,
} from "../../../styles/theme";
import React from "react";

type TextElement = "p" | "span" | "div" | "label" | "strong" | "em";

interface TextProps<T extends React.ElementType> {
  as?: T;
  fontSize?: keyof typeof themeFontSize;
  fontWeight?: keyof typeof themeFontWeight;
  lineHeight?: keyof typeof themeLineHeight;
}

export const Text = <T extends TextElement = "span">({
  as,
  fontSize: fontSizeProp,
  fontWeight,
  lineHeight: lineHeightProp,
  ...props
}: TextProps<T> & React.ComponentPropsWithoutRef<T>) => {
  const Element = as || "span";

  return (
    <StyledText
      as={Element}
      fontSize={fontSizeProp}
      fontWeight={fontWeight}
      lineHeight={lineHeightProp}
      {...props}
    />
  );
};

const StyledText = styled.span<TextProps<TextElement>>`
  margin: 0;
  font-size: ${({ fontSize }) =>
    fontSize ? themeFontSize[fontSize] : themeFontSize.fontSizeMd};
  font-weight: ${({ fontWeight }) =>
    fontWeight
      ? themeFontWeight[fontWeight]
      : themeFontWeight.fontWeightRegular};
  line-height: ${({ lineHeight }) =>
    lineHeight
      ? themeLineHeight[lineHeight]
      : themeLineHeight.lineHeightNormal};
`;
