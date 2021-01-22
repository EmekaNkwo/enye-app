import React from "react";
import "./tableStyle.css";

const Pagination = ({ profilePerPage, totalProfiles, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProfiles / profilePerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className="mynav">
      <ul className="pagination justify-content-center pagination-lg">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item my-paginate">
            <a onClick={() => paginate(number)} href="!#" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
