import React from "react";
import { RegisterOptionType, Select } from "../Select/Select";
import { SelectTrigger } from "../Select/SelectTrigger";
import { SelectMenu } from "../Select/SelectMenu";
import { FilterOption } from "./FilterOption";
import { ButtonIconOnly } from "../Button/ButtonIconOnly";
import { FilterIcon } from "../Icons/FilterIcon";
import { color } from "../../styles/theme/theme";

interface FilterProps {
  options: RegisterOptionType[];
  onSelectionChange?: (values: any[]) => void;
}

export const Filter: React.FC<FilterProps> = ({
  options,
  onSelectionChange,
}) => {
  return (
    <Select selectionMode="multiple" onSelectionChange={onSelectionChange}>
      <SelectTrigger as={ButtonIconOnly}>
        <FilterIcon width={10} height={10} color={color.primaryHover} />
      </SelectTrigger>
      <SelectMenu>
        {options.map((option) => (
          <FilterOption key={option.value} option={option} />
        ))}
      </SelectMenu>
    </Select>
  );
};
