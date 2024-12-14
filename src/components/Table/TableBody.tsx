import React from "react";

export const TableBody: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <tbody>{children}</tbody>;
};
