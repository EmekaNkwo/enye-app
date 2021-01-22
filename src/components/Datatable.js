import React from "react";
import "./tableStyle.css";

export default function Datatable({ data, loading }) {
  if (loading) {
    return <h2 className="loading_text">Loading....</h2>;
  }

  const columns = data[0] && Object.keys(data[0]);

  //The Table Map
  return (
    <div className="">
      <table
        cellPadding={2}
        className="table table-striped table-bordered table-sm mytable"
      >
        <thead>
          <tr>{data[0] && columns.map((heading) => <th>{heading}</th>)}</tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr>
              {columns.map((column) => (
                <td key={data.id}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
