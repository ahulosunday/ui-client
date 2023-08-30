import React, { useContext, useEffect, useState } from "react";
const PrintForm = ()=>{
   
        const countries = [{ id: "1", countryName: "AMERICA" },{ id: "2", countryName: "AFRICA" }, { id: "3", countryName: "ENGLAND" }];
        const [checked, setChecked] = useState([]);

        const handleCheckAllChange = (e) => {
          setChecked(
            e.target.checked ? countries.map((c) => c.countryName) : []
          );
        };

        const handleCountryChange = (e, c) => {
          setChecked((prevChecked) =>
            e.target.checked
              ? [...prevChecked, c.countryName]
              : prevChecked.filter((item) => item !== c.countryName)
          );
        };

        return (
          <div className="container">
            <h3>React Js Checkbox Select All | Unselect All </h3>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="selectAll"
                checked={checked.length === countries.length}
                onChange={handleCheckAllChange}
              />
              <label className="form-check-label" htmlFor="selectAll">
                Select all
              </label>
            </div>
            {countries.map((c) => (
              <div className="form-check form-check-inline" key={c.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={c.id}
                  checked={checked.includes(c.countryName)}
                  onChange={(e) => handleCountryChange(e, c)}
                />
                <label className="form-check-label" htmlFor={c.id}>
                  {c.countryName}
                </label>
              </div>
            ))}
            <p>{checked.join(", ")}</p>
          </div>
        );

    }
    export default PrintForm