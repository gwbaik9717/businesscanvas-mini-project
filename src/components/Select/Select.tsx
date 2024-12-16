import React, {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from "react";

export interface RegisterOptionType {
  value: any;
  label: string | ReactNode;
}

export interface SelectContextType<T extends SelectionModeType> {
  isOpen: boolean;
  selectedValues?: SelectedValuesType<T>;
  toggle: () => void;
  close: () => void;
  selectMenuItem: (value: any) => void;
  options: RegisterOptionType[];
  registerOption: (option: RegisterOptionType) => void;
}

export const SelectContext =
  createContext<SelectContextType<SelectionModeType> | null>(null);

export const useSelectContext = () => {
  const ctx = React.useContext(SelectContext);
  if (!ctx) {
    throw new Error("Select compound components must be used inside <Select>");
  }
  return ctx;
};

type SelectionModeType = "single" | "multiple";

type SelectedValuesType<T extends SelectionModeType> = T extends "single"
  ? any
  : Array<any>;

interface SelectProps<T extends SelectionModeType> {
  selectionMode: T;
  onSelectionChange?: (values: SelectedValuesType<T>) => void;
  children: ReactNode;
}

export const Select = <T extends SelectionModeType = "single">({
  selectionMode,
  onSelectionChange,
  children,
}: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<RegisterOptionType[]>([]);
  const selectRef = useRef<HTMLDivElement>(null);
  const [selectedValues, setSelectedValues] = useState<SelectedValuesType<T>>();

  const registerOption = useCallback((option: RegisterOptionType) => {
    setOptions((prev) => {
      if (prev.find((o) => o.value === option.value)) return prev;
      return [...prev, option];
    });
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const selectMenuItem = useCallback(
    (value: any) => {
      setSelectedValues((prev) => {
        const isSingleMode = selectionMode === "single";

        // Handle single selection mode
        if (isSingleMode) {
          const newValue = value as SelectedValuesType<T>;
          onSelectionChange?.(newValue);
          close();
          return newValue;
        }

        // Handle multi-selection mode
        const prevValues = (prev ?? []) as any[];
        const isAlreadySelected = prevValues.includes(value);

        const newValues = isAlreadySelected
          ? prevValues.filter((selectedValue) => selectedValue !== value)
          : [...prevValues, value];

        onSelectionChange?.(newValues);
        return newValues as SelectedValuesType<T>;
      });
    },
    [selectionMode, onSelectionChange, close]
  );

  const contextValue: SelectContextType<T> = {
    isOpen,
    selectedValues,
    toggle,
    close,
    selectMenuItem,
    options,
    registerOption,
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, close]);

  return (
    <SelectContext.Provider value={contextValue}>
      <div
        ref={selectRef}
        style={{
          position: "relative",
          display: "inline-block",
        }}
      >
        {children}
      </div>
    </SelectContext.Provider>
  );
};
