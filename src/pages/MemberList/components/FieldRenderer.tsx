import React from "react";
import { Field, SelectField } from "../../../types/Field";
import { InputText, InputTextArea } from "../../../components/Input";
import { Checkbox } from "../../../components/Checkbox/Checkbox";
import { DatePicker } from "../../../components/DatePicker/DatePicker";
import { DefaultSelect } from "../../../components/DefaultSelect/DefaultSelect";

interface FieldRendererProps {
  field: Field;
  value?: any;
  onChange?: (value: any) => void;
}

export const FieldRenderer: React.FC<FieldRendererProps> = ({
  field,
  value,
  onChange,
}) => {
  const handleChange = (newValue: any) => {
    if (onChange) {
      onChange(newValue);
    }
  };

  if (field.type === "text") {
    return (
      <InputText
        value={value || ""}
        onValueChange={(newValue) => handleChange(newValue)}
      />
    );
  }

  if (field.type === "textarea") {
    return (
      <InputTextArea
        value={value || ""}
        onChange={(e) => handleChange(e.target.value)}
      />
    );
  }

  if (field.type === "checkbox") {
    return (
      <Checkbox
        checked={!!value}
        onValueChange={(checked) => handleChange(checked)}
        width={16}
        height={16}
      />
    );
  }

  if (field.type === "select") {
    return (
      <DefaultSelect
        placeholder="Select job"
        value={value}
        options={(field as SelectField).options}
        onChange={(selectedValue) => handleChange(selectedValue)}
      />
    );
  }

  if (field.type === "date") {
    return (
      <DatePicker
        value={value}
        onChange={(selectedDate) => handleChange(selectedDate)}
      />
    );
  }

  return null;
};
