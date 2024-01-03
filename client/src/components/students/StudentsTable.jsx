/* eslint-disable no-unused-vars */
import {useReactTable ,getCoreRowModel , flexRender , getPaginationRowModel} from '@tanstack/react-table'
import mdata from '../../util/mockdata.js'
import React, { useMemo } from 'react';

function StudentsTable(props) {

    /* 
     {
    id: 1,
    first_name: "Ame",
    last_name: "Houseman",
    contact_person: "Dedra",
    contact_no: "584-620-5129",
    email: "dhouseman0@google.es",
    date_of_brith: "7/16/2023",
    age: 6,
    classroom: "Goldenrod",
  },*/
    const data = useMemo(() => mdata , []);

    const columns = [
        {
            header: 'ID',
            accessorKey : 'id'
        },
        {
            header: 'First Name',
            accessorKey : 'first_name'
        },
        {
            header: 'Last Name',
            accessorKey : 'last_name'
        },
        {
            header: 'Contact Person',
            accessorKey : 'contact_person'
        },
        {
            header: 'Contact Number',
            accessorKey : 'contact_no'
        },
        {
            header: 'Email',
            accessorKey : 'email'
        },
        {
            header: 'DOB',
            accessorKey : 'date_of_brith'
        },
        {
            header: 'Age',
            accessorKey : 'age'
        },
        {
            header: 'classroom',
            accessorKey : 'classroom'
        },
    ]

    const table = useReactTable({data , columns ,getCoreRowModel : getCoreRowModel() , getPaginationRowModel:getPaginationRowModel()} );
    return (
        <div>
            <table>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}> 
                            {headerGroup.headers.map(header => <th key={header.id}>{flexRender(header.column.columnDef.header , header.getContext())}</th>)}
                        <th>Edit</th>
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>{row.getVisibleCells().map(cell => (
                            <td key={cell.id} > {flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                        <td> haha</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => table.setPageIndex(0) }>First Page</button>
            <button disabled={!table.getCanPreviousPage} onClick={() => table.previousPage()}>Prev Page</button>
            <button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>Next Page</button>
            <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>Last Page</button>
        </div>
    );
}
0
export default StudentsTable;