import React, {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from "react";

export interface RegisterOptionType {
  key: React.Key;
  label: string;
}

export interface SelectContextType<T extends SelectionModeType> {
  isOpen: boolean;
  selectedKeys?: SelectedKeysType<T>;
  toggle: () => void;
  close: () => void;
  selectMenuItem: (key: React.Key) => void;
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

type SelectedKeysType<T extends SelectionModeType> = T extends "single"
  ? React.Key
  : React.Key[];

interface SelectProps<T extends SelectionModeType> {
  selectionMode: T;
  selectedKeys?: SelectedKeysType<T>;
  onSelectionChange?: (keys: SelectedKeysType<T>) => void;
  children: ReactNode;
}

export const Select = <T extends SelectionModeType = "single">({
  selectionMode,
  selectedKeys,
  onSelectionChange,
  children,
}: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<RegisterOptionType[]>([]);
  const selectRef = useRef<HTMLDivElement>(null);

  const registerOption = useCallback((option: RegisterOptionType) => {
    setOptions((prev) => {
      if (prev.find((o) => o.key === option.key)) return prev;
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
    (key: React.Key) => {
      if (selectionMode === "single") {
        if (onSelectionChange) {
          onSelectionChange(key as SelectedKeysType<T>);
        }
        close();

        return;
      }

      if (selectedKeys && Array.isArray(selectedKeys)) {
        const newSelectedKeys = selectedKeys.includes(key)
          ? selectedKeys.filter((k) => k !== key)
          : [...selectedKeys, key];

        if (onSelectionChange) {
          onSelectionChange(newSelectedKeys as SelectedKeysType<T>);
        }
      }
    },
    [selectionMode, selectedKeys, onSelectionChange, close]
  );

  const contextValue: SelectContextType<T> = {
    isOpen,
    selectedKeys,
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
