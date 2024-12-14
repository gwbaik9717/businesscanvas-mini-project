import { useTableContext } from "./Table";

export const TableHeader = <T,>() => {
  const { columns, setFilter } = useTableContext<T>();

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            key={column.label}
            style={{
              textAlign: "left",
              padding: "8px",
              borderBottom: "1px solid #ccc",
            }}
          >
            {column.label}
            {column.filterable && (
              <input
                type="text"
                placeholder={`Filter ${column.label}`}
                onChange={(e) => setFilter(column.accessor, e.target.value)}
                style={{
                  marginTop: "4px",
                  padding: "4px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  width: "100%",
                }}
              />
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};
