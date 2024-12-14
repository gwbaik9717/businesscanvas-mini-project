import React from "react";

interface LabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  required?: boolean;
}

export const Label: React.FC<LabelProps> = ({
  required = false,
  children,
  ...props
}) => {
  return (
    <span {...props}>
      {children}
      {required && <span className="required">*</span>}
    </span>
  );
};
