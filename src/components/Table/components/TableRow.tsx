import styled from "styled-components";
import { UniqueRecord } from "../../../types/Record";
import { Checkbox } from "../../Checkbox/Checkbox";
import { useTableContext } from "./Table";
import { color, padding } from "../../../styles/theme";
import { Text } from "../../Typography/components/Text";

interface TableRowProps<T extends UniqueRecord> {
  row: T;
}

export const TableRow = <T extends UniqueRecord>({ row }: TableRowProps<T>) => {
  const { columns } = useTableContext<T>();

  return (
    <tr>
      {columns.map((column) => (
        <StyledTd key={column.id}>
          {column.render ? (
            column.render(row[column.accessor as keyof T], row)
          ) : column.type ? (
            column.type === "checkbox" ? (
              <Checkbox
                readonly
                width={16}
                height={16}
                checked={row[column.accessor as keyof T] as boolean}
              />
            ) : (
              <Text fontSize="fontSizeLg">
                {row[column.accessor as keyof T]?.toString()}
              </Text>
            )
          ) : null}
        </StyledTd>
      ))}
    </tr>
  );
};

const StyledTd = styled.td`
  padding: 13px ${padding.paddingSm};
  border-bottom: 1px solid ${color.bgContainerHover};
  vertical-align: middle;
`;
