import React, { useEffect, useState } from "react";
import ReferencePicker from "./ReferencePicker";
import { apiCallAddresses } from "../../utils/api";
import ArrayField from "./ArrayField";

const PhoneNumberInput = ({ value, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      className="p-2 border border-gray-300 rounded w-full"
    />
  );
};

const MediaInput = ({ value, onChange }) => {
  console.log("value in child", value);

  const [type, setType] = useState(value.type || "");
  const [url, setUrl] = useState(value.url || "");

  const handleTypeChange = (e) => {
    setType(e.target.value);
    onChange({ type: e.target.value, url });
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    onChange({ type, url: e.target.value });
  };

  return (
    <div className="flex flex-row w-full">
      <select
        value={type}
        onChange={handleTypeChange}
        className="mr-2 border border-gray-300 rounded p-2"
      >
        <option value="">Select Type</option>
        <option value="image">Image</option>
        <option value="video">Video</option>
      </select>
      <input
        type="text"
        value={url}
        onChange={handleUrlChange}
        placeholder="Enter URL"
        className="p-2 border border-gray-300 rounded w-full"
      />
    </div>
  );
};

const ListingForm = ({
  onSubmit,
  listingId,
  mode, // "create" or "edit" or "delete"
}) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(null);
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [phoneNumbers, setPhoneNumbers] = useState([""]);
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");
  const [address, setAddress] = useState("");
  const [media, setMedia] = useState([{ type: "image", url: "" }]);

  useEffect(() => {
    if (listingId) {
      const url = apiCallAddresses.listings.read`${listingId}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setName(data.name);
          setCategory(data.category);
          setDescription(data.description);
          setCoverImage(data.coverImage);
          setPhoneNumbers(data.phoneNumbers);
          setEmail(data.links.email);
          setWebsite(data.links.website);
          setWhatsapp(data.links.whatsapp);
          setFacebook(data.links.facebook);
          setTwitter(data.links.twitter);
          setInstagram(data.links.instagram);
          setYoutube(data.links.youtube);
          setAddress(data.address);
          setMedia(data.media);
        })
        .catch(console.error);
    }
  }, [listingId]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCoverImageChange = (e) => {
    setCoverImage(e.target.value);
  };

  const handleCategoryChange = (val) => {
    setCategory(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name,
      description,
      coverImage,
      category,
      phoneNumbers,
      links: {
        email,
        website,
        whatsapp,
        facebook,
        twitter,
        instagram,
        youtube,
      },
      address,
      media,
    });
  };

  const handleQuery = async (searchTerm) => {
    const response = await fetch(
      apiCallAddresses.categories.listByNameWithoutParent`${searchTerm}`
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
        <label htmlFor="address" className="block mb-2 font-medium">
          Address
        </label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
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
        <label htmlFor="coverImage" className="block mb-2 font-medium">
          Cover Image
        </label>
        <input
          id="coverImage"
          value={coverImage}
          onChange={handleCoverImageChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
          disabled={mode === "delete"}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="parent" className="block mb-2 font-medium">
          Category
        </label>
        <ReferencePicker
          onChange={handleCategoryChange}
          propertyName="name"
          queryFunction={handleQuery}
          mode={mode}
          value={category}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="phoneNumbers" className="block mb-2 font-medium">
          Phone Numbers
        </label>
        <ArrayField
          values={phoneNumbers}
          setValues={setPhoneNumbers}
          childComponent={PhoneNumberInput}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block mb-2 font-medium">
          Email
        </label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          disabled={mode === "delete"}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="website" className="block mb-2 font-medium">
          Website
        </label>
        <input
          type="text"
          id="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          disabled={mode === "delete"}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="whatsapp" className="block mb-2 font-medium">
          Whatsapp
        </label>
        <input
          type="text"
          id="whatsapp"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          disabled={mode === "delete"}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="facebook" className="block mb-2 font-medium">
          Facebook
        </label>
        <input
          type="text"
          id="facebook"
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          disabled={mode === "delete"}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="twitter" className="block mb-2 font-medium">
          Twitter
        </label>
        <input
          type="text"
          id="twitter"
          value={twitter}
          onChange={(e) => setTwitter(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          disabled={mode === "delete"}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="instagram" className="block mb-2 font-medium">
          Instagram
        </label>
        <input
          type="text"
          id="instagram"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          disabled={mode === "delete"}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="youtube" className="block mb-2 font-medium">
          Youtube
        </label>
        <input
          type="text"
          id="youtube"
          value={youtube}
          onChange={(e) => setYoutube(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          disabled={mode === "delete"}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="media" className="block mb-2 font-medium">
          Media
        </label>
        <ArrayField
          values={media}
          setValues={setMedia}
          childComponent={MediaInput}
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

export default ListingForm;
