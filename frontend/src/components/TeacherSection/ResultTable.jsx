import React from 'react';
import { useTable } from 'react-table';

const ResultTable = ({ resultData }) => {
    const data = React.useMemo(() => resultData.studentResultInfo, [resultData]);

    const columns = React.useMemo(
        () => [
            { Header: 'Name', accessor: 'name' },
            { Header: 'Roll No', accessor: 'rollNo' },
            { Header: 'University ID', accessor: 'universityId' },
            { Header: 'Score', accessor: 'score' },
            { Header: 'Test Cases Passed', accessor: 'testPassed' },
            { Header: 'Total Test Cases', accessor: 'totalTest' },
            { Header: 'Partial Output', accessor: () => 'Partial Output' },
            { Header: 'Student Code', accessor: () => 'Student Code' },
        ],
        []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

    return (
        <div className="w-full overflow-x-auto overflow-y-auto p-4">
            <table {...getTableProps()} className="w-full border-collapse border border-black">
                <thead className="bg-[#333571] text-white">
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()} className="p-2 border border-black">{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} className={row.original.present ? 'bg-[#272a2e]' : 'bg-[#272a2e]'}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()} className={`p-2 border border-black text-center ${row.original.present? "text-white": "text-[#F43F5E]"}`}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ResultTable;
