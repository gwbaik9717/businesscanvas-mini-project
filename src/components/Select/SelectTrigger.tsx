import React, { KeyboardEvent } from "react";
import { useSelectContext } from "./Select";

interface SelectTriggerProps<T extends React.ElementType> {
  as?: T;
  placeholder?: string;
}

export const SelectTrigger = <T extends React.ElementType = "button">({
  as,
  placeholder,
  ...props
}: SelectTriggerProps<T> & React.ComponentPropsWithoutRef<T>) => {
  const { toggle, selectedKeys, options } = useSelectContext();

  const Element = as || "button";

  const selectedLabel = React.useMemo(() => {
    console.log(selectedKeys);
    if (!selectedKeys) {
      if (placeholder) {
        return placeholder;
      }

      return "Select...";
    }

    if (Array.isArray(selectedKeys)) {
      return selectedKeys
        .map((key) => options.find((o) => o.key === key)?.label)
        .filter(Boolean)
        .join(", ");
    }
    const selectedOption = options.find((o) => o.key === selectedKeys);
    return selectedOption ? selectedOption.label : "Select...";
  }, [options, selectedKeys]);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (["Enter", " ", "ArrowDown"].includes(e.key)) {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <Element onClick={toggle} onKeyDown={handleKeyDown} {...props}>
      {selectedLabel}
    </Element>
  );
};
