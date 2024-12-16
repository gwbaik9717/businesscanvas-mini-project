import { useTableContext } from "./Table";
import styled from "styled-components";
import { Text } from "../../Typography/components/Text";
import { UniqueRecord } from "../../../types/Record";
import { color, padding } from "../../../styles/theme";
import { Divider } from "../../Divider/Divider";

interface TableHeaderProps<T extends UniqueRecord> {
  render?: (props: {
    column: { label: string | null; accessor: keyof T };
    setFilter: (accessor: keyof T, values: any[]) => void;
  }) => React.ReactNode;
}

export const TableHeader = <T extends UniqueRecord>({
  render,
}: TableHeaderProps<T>) => {
  const { columns, setFilter } = useTableContext<T>();

  return (
    <thead>
      <tr>
        {columns.map((column, index) => (
          <StyledTh key={column.label}>
            <div
              style={{
                borderRight:
                  index === columns.length - 1
                    ? "none"
                    : `1px solid ${color.border}`,
                padding: `0 ${padding.paddingMd}`,
              }}
            >
              {render
                ? render({
                    column,
                    setFilter,
                  })
                : column.label && <Text>{column.label}</Text>}
            </div>
          </StyledTh>
        ))}
      </tr>
    </thead>
  );
};

const StyledTh = styled.th`
  position: relative;
  text-align: left;
  padding: ${padding.paddingSm} 0;
  min-width: 48px;
  max-width: 200px;
  background-color: ${color.fillAfter};
  border-bottom: 1px solid ${color.border};
`;
