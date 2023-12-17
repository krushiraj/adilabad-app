import React, { useEffect, useState } from "react";
import ReferencePicker from "./ReferencePicker";
import { apiCallAddresses } from "../../utils/api";

const CategoryForm = ({
  onSubmit,
  categoryId,
  mode, // "create" or "edit" or "delete"
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [parentCategory, setParentCategory] = useState(null);

  useEffect(() => {
    if (categoryId) {
      const url = apiCallAddresses.categories.read`${categoryId}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setName(data.name);
          setDescription(data.description);
          setImage(data.image);
          setParentCategory(data.parentCategory);
        })
        .catch(console.error);
    }
  }, [categoryId]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  const handleParentCategoryChange = (val) => {
    setParentCategory(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, description, image, parentCategory });
  };

  const handleQuery = async (searchTerm) => {
    const response = await fetch(
      apiCallAddresses.categories.listAllWithoutParent`${searchTerm}`
    );
    const results = await response.json();
    return results;
  };

  const action =
    mode === "create" ? "Create" : mode === "edit" ? "Edit" : "Delete";

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full p-6 text-left bg-white rounded shadow"
    >
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2 font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
          disabled={mode === "delete"}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block mb-2 font-medium">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
          disabled={mode === "delete"}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block mb-2 font-medium">
          Image
        </label>
        <input
          id="image"
          value={image}
          onChange={handleImageChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
          disabled={mode === "delete"}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="parent" className="block mb-2 font-medium">
          Parent Category
        </label>
        <ReferencePicker
          onChange={handleParentCategoryChange}
          propertyName="name"
          queryFunction={handleQuery}
          mode={mode}
          value={parentCategory}
        />
      </div>
      <button
        type="submit"
        className={`w-full py-2 px-4 ${
          mode !== "delete"
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-red-600 hover:bg-red-700"
        } rounded-md text-white font-medium`}
      >
        {action} Category
      </button>
    </form>
  );
};

export default CategoryForm;
