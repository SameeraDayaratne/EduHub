/* eslint-disable no-unused-vars */
import {useReactTable ,getCoreRowModel , flexRender , getPaginationRowModel} from '@tanstack/react-table'
import mdata from '../../util/mockdata.js'
import React, { useMemo } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

function StudentsTable({students , handleEdit ,handleDelete}) {

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
    const data = useMemo(() => students , [students]);
    

    const columns = [
       
        {
            header: 'First Name',
            accessorKey : 'FirstName'
        },
        {
            header: 'Last Name',
            accessorKey : 'LastName'
        },
        {
            header: 'Contact Person',
            accessorKey : 'ContactPerson'
        },
        {
            header: 'Contact Number',
            accessorKey : 'ContactNo'
        },
        {
            header: 'Email',
            accessorKey : 'EmailAddress'
        },
        {
            header: 'DOB',
            accessorKey : 'DateOfBirth'
        },
        {
            header: 'Age',
            accessorKey : 'Age'
        },
        {
            header: 'classroom',
            accessorKey : 'ClassName'
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
                        <th>Edit/Delete</th>
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {/* {table.getRowModel().rows.map(row => (row.getVisibleCells().map(cell =>(console.log('c' ,cell)))) ) } */}
                    {table.getRowModel().rows.map(row => (
                        
                        <tr className='odd:bg-activeNavLinkHover even:bg-activeNavLink ' key={row.id}>{row.getVisibleCells().map(cell => (
                            <td data-cell={`${cell.column.columnDef.header} : `} className='p-1 py-2 tracking-wide text-left block lg:table-cell before:content-[attr(data-cell)] before:font-semibold lg:before:content-[""]' key={cell.id} > {flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                        <td className='p-1 py-2 tracking-wide text-left block lg:table-cell'>
                            <div className='flex  gap-3 items-center'>
                            <FaRegEdit onClick={() => handleEdit(row.original)} className='cursor-pointer opacity-50 hover:opacity-100' />
                            <MdOutlineDelete onClick={() => handleDelete(row.original)} className='cursor-pointer opacity-50 hover:opacity-100' size={20} />
                            </div>
                            
                        </td>
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