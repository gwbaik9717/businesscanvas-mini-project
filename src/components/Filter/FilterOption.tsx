import React from "react";
import { RegisterOptionType } from "../Select/Select";
import { SelectMenuItem } from "../Select/SelectMenuItem";
import { Checkbox } from "../Checkbox/Checkbox";
import { useSelectContext } from "../Select/Select";

interface FilterOptionProps {
  option: RegisterOptionType;
}

export const FilterOption: React.FC<FilterOptionProps> = ({ option }) => {
  const { selectedValues, selectMenuItem } = useSelectContext();

  const isChecked =
    Array.isArray(selectedValues) && selectedValues.includes(option.value);

  return (
    <SelectMenuItem value={option.value}>
      <Checkbox
        checked={isChecked}
        onChange={() => selectMenuItem(option.value)}
        width={16}
        height={16}
      />
      {option.label}
    </SelectMenuItem>
  );
};
