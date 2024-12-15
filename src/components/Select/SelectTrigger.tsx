import React from "react";
import { useSelectContext } from "./Select";

interface SelectTriggerProps<T extends React.ElementType> {
  as?: T;
}

export const SelectTrigger = <T extends React.ElementType = "button">({
  as,
  ...props
}: SelectTriggerProps<T> & React.ComponentPropsWithoutRef<T>) => {
  const { toggle } = useSelectContext();

  const Element = as || "button";

  return <Element onClick={toggle} {...props} />;
};
