import React from "react";
import { RegisterOptionType } from "../Select/Select";
import { SelectMenuItem } from "../Select/SelectMenuItem";
import { Checkbox } from "../Checkbox/Checkbox";
import { useSelectContext } from "../Select/Select";
import { Text } from "../Typography/Text";

interface FilterMenuItemProps {
  option: RegisterOptionType;
  selected?: boolean;
}

export const FilterMenuItem: React.FC<FilterMenuItemProps> = ({ option }) => {
  const { selectedValues, selectMenuItem } = useSelectContext();

  const isChecked =
    Array.isArray(selectedValues) && selectedValues.includes(option.value);

  const isSelected =
    Array.isArray(selectedValues) && selectedValues.includes(option.value);

  return (
    <SelectMenuItem value={option.value} selected={isSelected}>
      <Checkbox
        checked={isChecked}
        onChange={() => selectMenuItem(option.value)}
        width={16}
        height={16}
        style={{ marginRight: "8px" }}
      />

      <Text fontSize="fontSizeLg">{option.label}</Text>
    </SelectMenuItem>
  );
};
