import React from "react";

interface InputProps<T extends React.ElementType = "input"> {
  as?: T;
  placeholder?: string;
  value: string;
  onValueChange?: (value: string) => void;
}

export const Input = <T extends React.ElementType = "input">({
  as,
  placeholder = "Input",
  value,
  onValueChange,
  ...props
}: InputProps<T> & React.ComponentPropsWithoutRef<T>) => {
  const Element = as || "input";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (onValueChange) {
      onValueChange(e.target.value);
    }
  };

  return (
    <Element
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      {...props}
    />
  );
};
