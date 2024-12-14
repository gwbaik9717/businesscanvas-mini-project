import React from "react";
import { RegisterOptionType, Select } from "../Select/Select";
import { SelectTrigger } from "../Select/SelectTrigger";
import { SelectMenuItem } from "../Select/SelectMenuItem";
import { Checkbox } from "../Checkbox/Checkbox";
import { SelectMenu } from "../Select/SelectMenu";

interface FilterProps {
  options: RegisterOptionType[];
  selectedKeys: React.Key[];
  onSelectionChange: (keys: React.Key[]) => void;
}

export const Filter: React.FC<FilterProps> = ({
  options,
  selectedKeys,
  onSelectionChange,
}) => {
  return (
    <Select
      selectionMode="multiple"
      selectedKeys={selectedKeys}
      onSelectionChange={onSelectionChange}
    >
      <SelectTrigger placeholder="Filter options" />

      <SelectMenu>
        {options.map((option) => (
          <SelectMenuItem key={option.key} value={option.key}>
            <Checkbox checked={selectedKeys.includes(option.key)} />
            {option.label}
          </SelectMenuItem>
        ))}
      </SelectMenu>
    </Select>
  );
};
