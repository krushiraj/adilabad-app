import React from "react";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";

const ArrayField = ({ childComponent: ChildComponent, values, setValues }) => {
  const handleAddValue = (e) => {
    e.preventDefault();
    setValues([...values, ""]);
  };

  const handleDeleteValue = (index) => {
    const newValues = [...values];
    newValues.splice(index, 1);
    setValues(newValues);
  };

  const handleChangeValue = (index, value) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
  };

  console.log("values", values);

  return (
    <div>
      {values.map((value, index) => (
        <div key={index} className="flex flex-row justify-between my-2">
          <ChildComponent
            value={value}
            onChange={(newValue) => handleChangeValue(index, newValue)}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              if (values.length > 1) handleDeleteValue(index);
            }}
          >
            <FiMinusCircle className="mx-4 text-red-500" />
          </button>
        </div>
      ))}
      <button
        onClick={handleAddValue}
        className="flex flex-row underline text-blue-500 hover:text-blue-600"
      >
        <FiPlusCircle className="my-4 mx-2" />{" "}
        <span className="m-auto">Add more</span>
      </button>
    </div>
  );
};

export default ArrayField;
