import { useTableContext } from "./Table";
import styled from "styled-components";
import { Text } from "../Typography/Text";
import { UniqueRecord } from "../../types/Record";

interface TableHeaderProps<T extends UniqueRecord> {
  render?: (props: {
    column: { label: string | null; accessor: keyof T };
    setFilter: (accessor: keyof T, value: string) => void;
  }) => React.ReactNode;
}

export const TableHeader = <T extends UniqueRecord>({
  render,
}: TableHeaderProps<T>) => {
  const { columns, setFilter } = useTableContext<T>();

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <StyledTh key={column.label}>
            {render
              ? render({
                  column,
                  setFilter,
                })
              : column.label && <Text>{column.label}</Text>}
          </StyledTh>
        ))}
      </tr>
    </thead>
  );
};

const StyledTh = styled.th`
  position: relative;
  text-align: left;
  padding: 8px;
  border-bottom: 1px solid #ccc;
`;
