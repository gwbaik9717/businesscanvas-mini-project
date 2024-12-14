import React, { KeyboardEvent } from "react";
import { useSelectContext } from "./Select";
import { ButtonWithIcons } from "../Button/ButtonWithIcons";

interface SelectTriggerProps {
  as?: React.ElementType;
  placeholder?: string;
}

export const SelectTrigger: React.FC<SelectTriggerProps> = ({
  as: Component = ButtonWithIcons,
  placeholder,
}) => {
  const { toggle, selectedKeys, options } = useSelectContext();

  const selectedLabel = React.useMemo(() => {
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
    <Component onClick={toggle} onKeyDown={handleKeyDown}>
      {selectedLabel}
      <span style={{ marginLeft: 8 }}>▼</span>
    </Component>
  );
};
