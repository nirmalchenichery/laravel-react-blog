
import { debounce } from "lodash"
import React, { useEffect, useRef, useState } from "react"
import { Head, usePage, Link } from '@inertiajs/inertia-react';
import Paginator from "./Paginator"
import { Inertia } from "@inertiajs/inertia";

const DataTable = ({fetchUrl,columns,displayColumns,redirectedTo }) =>{

    const [data, setData] = useState([])
    const [perPage, setPerPage] = useState(10)
    const [sortColumn, setSortColumn] = useState(columns[0])
    const [sortOrder, setSortOrder] = useState("asc")
    const [search, setSearch] = useState("")
    const [pagination, setPagination] = useState({})
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)

    const loaderStyle = { width: "4rem", height: "4rem" }

    const SORT_ASC = "asc"
    const SORT_DESC = "desc"
    
    const handleSort = (column) => {
        if (column === sortColumn) {
            sortOrder === SORT_ASC ? setSortOrder(SORT_DESC) : setSortOrder(SORT_ASC)
        } else {
            setSortColumn(column)
            setSortOrder(SORT_ASC)
        }
    }

    function destroy(e) {
        if (confirm("Are you sure you want to delete this user?")) {
            Inertia.delete(route(redirectedTo +'.destroy', e.currentTarget.id));
        }
    }

    const handleSearch = useRef(
        debounce((query) => {
            setSearch(query)
            setCurrentPage(1)
            setSortOrder(SORT_ASC)
            setSortColumn(columns[0])
        }, 500)
    ).current

    const handlePerPage = (perPage) => {
        setCurrentPage(1)
        setPerPage(perPage)
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const params = {
                search,
                sort_field: sortColumn,
                sort_order: sortOrder,
                per_page: perPage,
                page: currentPage,
            }
            const { data } = await axios(fetchUrl, { params })
            setData(data.data)
            setPagination(data.meta)
            setTimeout(() => {
                setLoading(false)
            }, 300)
        }

        fetchData()
    }, [perPage, sortColumn, sortOrder, search, currentPage])

    
    return (
                <div>
                    {/* Search per page starts */}
                    <div className="row mb-3">
                        <div className="col-md-3">
                            <div className="input-group">
                                <input
                                    className="form-control"
                                    placeholder="Search..."
                                    type="search"
                                    onChange={(e) => handleSearch(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="input-group">
                                <label className="mt-2 me-2">Per page</label>
                                <select className="form-select" value={perPage} onChange={(e) => handlePerPage(e.target.value)}>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {/* Search per page ends  */}
                    <div className="tableFixHead">
                        <table className="table table-hover">
                            <thead className="table-light">
                                <tr>
                                    {displayColumns.map((column) => {
                                        return (
                                            <th key={column} onClick={(e) => handleSort(column)}>
                                                {column.replace("_", " ")}
                                                {column === sortColumn ? (
                                                    <span>
                                                        {sortOrder === SORT_ASC ? (
                                                            <i className="ms-1 fa fa-arrow-up text-cyan-500" aria-hidden="true"></i>
                                                        ) : (
                                                            <i className="ms-1 fa fa-arrow-down" aria-hidden="true"></i>
                                                        )}
                                                    </span>
                                                ) : null}

                                            </th>
                                            
                                        )
                                    })}
                                </tr>
                               
                            </thead>
                            <tbody>
                                {data.length === 0 ? (
                                                        <tr>
                                                            <td colSpan={columns.length + 1}>No items found</td>
                                                        </tr>
                                                    ) : ( "")
                                }

                                {!loading ? (
                                    data.map((row, index) => {
                                        return (
                                            <tr key={index}>
                                                {columns.map((column) => {
                                                    return <td key={column}>{row[column]}</td>
                                                })}
                                                <td>
                                                    <Link
                                                        tabIndex="1"
                                                        className="mx-1 px-4 py-2 text-sm text-white bg-blue-500 rounded"
                                                        style={{textDecoration: 'none'}}
                                                        href={route(redirectedTo +'.show', row.id)}
                                                    >
                                                        Show
                                                    </Link>
                                                    <Link
                                                        tabIndex="1"
                                                        className="mx-1 px-4 py-2 text-sm text-white bg-green-500 rounded"
                                                        style={{textDecoration: 'none'}}
                                                        href={route(redirectedTo +'.edit', row.id)}
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={destroy}
                                                        id={row.id}
                                                        tabIndex="-1"
                                                        type="button"
                                                        className="mx-1 px-4 py-2 text-sm text-white bg-red-500 rounded"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                                
                                            </tr>
                                        )
                                    })
                                ) : ( ""
                                    // <tr>
                                    //     <td colSpan={columns.length + 1}>
                                    //         <div className="d-flex justify-content-center">
                                    //             <div className="spinner-border" style={loaderStyle} role="status">
                                    //                 <span className="sr-only">Loading...</span>
                                    //             </div>
                                    //         </div>
                                    //     </td>
                                    // </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {data.length > 0 && !loading ? (
                        <div className="mt-2">
                            <Paginator
                                pagination={pagination}
                                pageChanged={(page) => setCurrentPage(page)}
                                totalItems={data.length}
                            />
                        </div>
                    ) : null}
                </div>
            )





};
export default DataTable;




// import Paginator from "./Paginator"

// const SORT_ASC = "asc"
// const SORT_DESC = "desc"

// const DataTable = ({ columns, fetchUrl }) => {
//     const [data, setData] = useState([])
//     const [perPage, setPerPage] = useState(10)
//     const [sortColumn, setSortColumn] = useState(columns[0])
//     const [sortOrder, setSortOrder] = useState("asc")
//     const [search, setSearch] = useState("")
//     const [pagination, setPagination] = useState({})
//     const [currentPage, setCurrentPage] = useState(1)

//     const [loading, setLoading] = useState(true)

//     const handleSort = (column) => {
//         if (column === sortColumn) {
//             sortOrder === SORT_ASC ? setSortOrder(SORT_DESC) : setSortOrder(SORT_ASC)
//         } else {
//             setSortColumn(column)
//             setSortOrder(SORT_ASC)
//         }
//     }

//     const handleSearch = useRef(
//         debounce((query) => {
//             setSearch(query)
//             setCurrentPage(1)
//             setSortOrder(SORT_ASC)
//             setSortColumn(columns[0])
//         }, 500)
//     ).current

//     const handlePerPage = (perPage) => {
//         setCurrentPage(1)
//         setPerPage(perPage)
//     }

//     const loaderStyle = { width: "4rem", height: "4rem" }

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true)
//             const params = {
//                 search,
//                 sort_field: sortColumn,
//                 sort_order: sortOrder,
//                 per_page: perPage,
//                 page: currentPage,
//             }
//             const { data } = await axios(fetchUrl, { params })
//             setData(data.data)
//             setPagination(data.meta)
//             setTimeout(() => {
//                 setLoading(false)
//             }, 300)
//         }

//         fetchData()
//     }, [perPage, sortColumn, sortOrder, search, currentPage])

//     return (
//         <div>
//             {/* Search per page starts */}
//             <div className="row mb-3">
//                 <div className="col-md-3">
//                     <div className="input-group">
//                         <input
//                             className="form-control"
//                             placeholder="Search..."
//                             type="search"
//                             onChange={(e) => handleSearch(e.target.value)}
//                         />
//                     </div>
//                 </div>
//                 <div className="col-md-2">
//                     <div className="input-group">
//                         <label className="mt-2 me-2">Per page</label>
//                         <select className="form-select" value={perPage} onChange={(e) => handlePerPage(e.target.value)}>
//                             <option value="5">5</option>
//                             <option value="10">10</option>
//                             <option value="20">20</option>
//                             <option value="50">50</option>
//                         </select>
//                     </div>
//                 </div>
//             </div>
//             {/* Search per page ends  */}
//             <div className="tableFixHead">
//                 <table className="table table-hover">
//                     <thead className="table-dark">
//                         <tr>
//                             {columns.map((column) => {
//                                 return (
//                                     <th key={column} onClick={(e) => handleSort(column)}>
//                                         {column.toUpperCase().replace("_", " ")}
//                                         {column === sortColumn ? (
//                                             <span>
//                                                 {sortOrder === SORT_ASC ? (
//                                                     <i className="ms-1 fa fa-arrow-up" aria-hidden="true"></i>
//                                                 ) : (
//                                                     <i className="ms-1 fa fa-arrow-down" aria-hidden="true"></i>
//                                                 )}
//                                             </span>
//                                         ) : null}
//                                     </th>
//                                 )
//                             })}
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {data.length === 0 ? (
//                             <tr>
//                                 <td colSpan={columns.length}>No items found</td>
//                             </tr>
//                         ) : (
//                             ""
//                         )}

//                         {!loading ? (
//                             data.map((d, index) => {
//                                 return (
//                                     <tr key={index}>
//                                         {columns.map((column) => {
//                                             return <td key={column}>{d[column]}</td>
//                                         })}
//                                     </tr>
//                                 )
//                             })
//                         ) : (
//                             <tr>
//                                 <td colSpan={columns.length + 1}>
//                                     <div className="d-flex justify-content-center">
//                                         <div className="spinner-border" style={loaderStyle} role="status">
//                                             <span className="sr-only">Loading...</span>
//                                         </div>
//                                     </div>
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//             {data.length > 0 && !loading ? (
//                 <div className="mt-2">
//                     <Paginator
//                         pagination={pagination}
//                         pageChanged={(page) => setCurrentPage(page)}
//                         totalItems={data.length}
//                     />
//                 </div>
//             ) : null}
//         </div>
//     )
// }

// export default DataTable