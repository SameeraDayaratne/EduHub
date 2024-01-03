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
        <div className='mt-5 lg:block'>
            <table className='w-full'>
                <thead className='bg-activeNavLink hidden lg:table-header-group'>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}> 
                            {headerGroup.headers.map(header => <th className='p-1 py-2  tracking-wide text-left' key={header.id}>{flexRender(header.column.columnDef.header , header.getContext())}</th>)}
                        <th>Edit</th>
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {/* {table.getRowModel().rows.map(row => (row.getVisibleCells().map(cell =>(console.log('c' ,cell)))) ) } */}
                    {table.getRowModel().rows.map(row => (
                        <tr className='odd:bg-activeNavLinkHover even:bg-activeNavLink ' key={row.id}>{row.getVisibleCells().map(cell => (
                            <td data-cell={`${cell.column.columnDef.header} : `} className='p-1 py-2 tracking-wide text-left block lg:table-cell before:content-[attr(data-cell)] before:font-semibold lg:before:content-[""]' key={cell.id} > {flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                        <td className='p-1 py-2 tracking-wide text-left block lg:table-cell'> haha</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='flex justify-center'>
            <button onClick={() => table.setPageIndex(0) }>First Page</button>
            <button disabled={!table.getCanPreviousPage} onClick={() => table.previousPage()}>Prev Page</button>
            <button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>Next Page</button>
            <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>Last Page</button>
            </div>
            
        </div>
    );
}
0
export default StudentsTable;