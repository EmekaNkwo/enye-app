import React, { useState, useEffect } from "react";

import Datatable from "./components/Datatable";
import Pagination from "./components/Pagination";
// import ReactTable from "react-table";

export default function Apppp() {
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterColumns, setFilterColumns] = useState([]);
  const [setCurrentPage] = useState(1);
  const [profilePerPage] = useState(20);

  useEffect(() => {
    const getDetails = async () => {
      setLoading(true);
      const url = "https://api.enye.tech/v1/challenge/records";
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setProfile(data.records.profiles);
      setLoading(false);
    };

    getDetails();
  }, []);

  function searchBar(rows) {
    const columns = rows[0] && Object.keys(rows[0]);
    return rows.filter((row) =>
      columns.some(
        (column) =>
          row[column].toString().toLowerCase().indexOf(search.toLowerCase()) >
          -1
      )
    );
  }

  const currentProfile = profile.slice(0, 20);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const columns = profile[0] && Object.keys(profile[0]);
  return (
    <div>
      <h1 className="header">Profile Table </h1>
      <div>
        <input
          className="search_button"
          type="text"
          placeholder="Search Here..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="filter">
          <p className="filter-header">Filters</p>
          {columns &&
            columns.map((column) => (
              <label className="label_check">
                <input
                  className="input-chigo"
                  type="checkbox"
                  checked={filterColumns.includes(column)}
                  onChange={(e) => {
                    const checked = filterColumns.includes(column);
                    setFilterColumns((prev) =>
                      checked
                        ? prev.filter((sc) => sc !== column)
                        : [...prev, column]
                    );
                  }}
                />
                {column}
              </label>
            ))}
        </div>
      </div>

      <div>
        <Datatable
          key={profile.id}
          data={searchBar(currentProfile)}
          loading={loading}
        />

        <Pagination
          profilePerPage={profilePerPage}
          totalProfiles={profile.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
}
