import React, { useState, useEffect } from "react";

const ReferencePicker = ({
  queryFunction,
  propertyName,
  onChange,
  mode,
  value,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);

  useEffect(() => {
    setSelectedResult(value);
  }, [value]);

  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm === "") {
        setResults([]);
        return;
      }

      const response = await queryFunction(searchTerm);
      setResults(response);
    };

    fetchData();
  }, [queryFunction, searchTerm]);

  useEffect(() => {
    if (selectedResult) {
      setResults([]);
    }
  }, [selectedResult]);

  const handleInputChange = (event) => {
    if (selectedResult) {
      setSelectedResult(null);
      onChange(null);
    }
    setSearchTerm(event.target.value);
  };

  const handleResultSelect = (result) => {
    setSearchTerm("");
    setResults([]);
    setSelectedResult(result);
    onChange(result);
  };

  return (
    <div>
      <input
        type="text"
        value={selectedResult?.[propertyName] || searchTerm}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded"
        disabled={mode === "delete"}
      />
      <ul className="shadow-md mt-2">
        {!selectedResult &&
          results.map((result) => (
            <li
              key={result.id}
              onClick={() => handleResultSelect(result)}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {result[propertyName]}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ReferencePicker;
