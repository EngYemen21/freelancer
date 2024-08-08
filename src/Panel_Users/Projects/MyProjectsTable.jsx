// MyProjectsTable.js

import React from 'react';
import { useTable } from 'react-table';
import 'tailwindcss/tailwind.css';

const MyProjectsTable = ({ projects }) => {
  const data = React.useMemo(() => projects, [projects]);
  console.log(data)

  const columns = React.useMemo(
    () => [
      {
        Header: 'رقم المشروع',
        accessor: 'id',
      },
      {
        Header: 'عنوان المشروع',
        accessor: 'title',
      },
      {
        Header: 'الوصف',
        accessor: 'description',
      },
      {
        Header: 'الحالة',
        accessor: 'status',
      },
      {
        Header: 'تاريخ الإنشاء',
        accessor: 'created_at',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-md sm:rounded-lg">
            <table
              {...getTableProps()}
              className="min-w-full bg-white divide-y divide-gray-200"
            >
              <thead className="bg-gray-50">
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      <th
                        {...column.getHeaderProps()}
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody
                {...getTableBodyProps()}
                className="bg-white divide-y divide-gray-200"
              >
                {rows.map(row => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map(cell => (
                        <td
                          {...cell.getCellProps()}
                          className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                        >
                          {cell.render('Cell')}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProjectsTable;
