import React from "react";

export default function Table({ columns = [], values = [] }) {

    function renderItem(item) {
        return item.map((i, index) => <td key={index}>{i}</td>)
    }
    return (
        <>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        {columns.map((c, index) => <th key={index}>{c}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {values.map((v, index) => <tr>{renderItem(v)}</tr>)}
                </tbody>
            </table>
        </>
    )
}