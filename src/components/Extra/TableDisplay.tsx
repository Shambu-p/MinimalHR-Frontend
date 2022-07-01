import React from "react";

export default function ({rows, columns}:{rows: any[][], columns: any[]}){

    let index = -1;
    let row_object = rows.map(row => {
        index += 1;
        let index2 = -1;
        return (
            <tr key={index}>
                {row.map(entity => {
                    index2 += 1;
                    return (<td key={index2} scope="row">{entity}</td>);
                })}
            </tr>
        );
    });

    index = 0;
    let columns_object = columns.map(column =>{
        index += 1;
        return (<th key={index} scope="col">{column}</th>)
    });

    return (
        <table className="table table-striped">
            <thead>
            <tr>
                {columns_object}
            </tr>
            </thead>
            <tbody>
            {row_object}
            </tbody>
        </table>
    );

}