import React, { useState } from "react";

export default function Table({ columns = [], values = [] }) {

    const [search, setSearch] = useState('')

    function renderItem(item) {
        return item.map((i, index) => <td key={index}>{i}</td>)
    }

    function filterValues(values) {
        return values.filter(item => item.some(x => x.toString().toLowerCase().includes(search.toLowerCase())))
    }
    return (
        <>
            <div className="row">
                <div className="col-12 mb-3 p-4">
                    
                    <label className="fw-bold text-start fs-5 w-100">Search</label>
                    <input
                        type="text"
                        className="form-control "
                        placeholder="Search..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <div className="col-12">
                    <table className="table table-bordered">
                        <thead className="fs-6">
                            <tr>
                                {columns.map((c, index) => <th key={index}>{c}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {filterValues(values).map((v, index) => <tr key={index}>{renderItem(v)}</tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}