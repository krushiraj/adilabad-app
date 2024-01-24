import React, { useEffect, useState } from "react";
import ReferencePicker from "./ReferencePicker";
import { apiCallAddresses } from "../../utils/api";

const AdvertisementForm = ({
  onSubmit,
  advertisementId,
  mode, // "create" or "edit" or "delete"
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [content, setContent] = useState("");
  const [alt, setAlt] = useState("");

  useEffect(() => {
    if (advertisementId) {
      const url = apiCallAddresses.categories.read`${advertisementId}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setName(data.name);
          setDescription(data.description);
          setType(data.type);
          setContent(data.content);
          setAlt(data.alt);
        })
        .catch(console.error);
    }
  }, [advertisementId]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleAltChange = (e) => {
    setAlt(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, description, content, type, alt });
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
        <label htmlFor="type" className="block mb-2 font-medium">
          Ad Type
        </label>
        <select
          id="type"
          value={type}
          onChange={handleTypeChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
          disabled={mode === "delete"}
        >
          <option value="">Select Type</option>
          <option value="image">Image - shown in carousel</option>
          <option value="text">Text - shown in top banner</option>
        </select>
      </div>
      {type && (
        <div className="mb-4">
          <label htmlFor="image" className="block mb-2 font-medium">
            {type === "image" ? "Image" : "Text"}
          </label>
          <input
            id="image"
            value={content}
            onChange={handleContentChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
            disabled={mode === "delete"}
          />
        </div>
      )}
      {type === "image" && (
        <div className="mb-4">
          <label htmlFor="parent" className="block mb-2 font-medium">
            Alt Text
          </label>
          <input
            id="alt"
            value={alt}
            onChange={handleAltChange}
            className="w-full p-2 border border-gray-300 rounded"
            disabled={mode === "delete"}
          />
        </div>
      )}
      <button
        type="submit"
        className={`w-full py-2 px-4 ${
          mode !== "delete"
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-red-600 hover:bg-red-700"
        } rounded-md text-white font-medium`}
      >
        {action} Advertisement
      </button>
    </form>
  );
};

export default AdvertisementForm;
