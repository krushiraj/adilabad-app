import React, { useState, useEffect, useContext } from "react";
import { FiEdit2, FiTrash2, FiSearch, FiPlus } from "react-icons/fi";

// api related
import { apiCallAddresses } from "../utils/api";

// components
import Modal from "../components/Modal";
import { UserContext } from "../contexts/user";
import AdvertisementForm from "../components/forms/Advertisement";

const AdsPage = () => {
  const [user] = useContext(UserContext);

  // eslint-disable-next-line no-unused-vars
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [advertisementId, setAdvertisementId] = useState(null);

  const handleOpenModal = (setFlag) => {
    setFlag(true);
  };

  const handleCloseModal = (setFlag) => {
    setFlag(false);
    setAdvertisementId(null);
  };

  const handleCreateForm = (data) => {
    handleCreate(data);
    handleCloseModal(setCreateModalOpen);
  };

  const handleUpdateForm = (data) => {
    handleEdit(data);
    handleCloseModal(setEditModalOpen);
  };

  const handleDeleteForm = (data) => {
    handleDelete(data);
    handleCloseModal(setDeleteModalOpen);
  };

  useEffect(() => {
    // Fetch items from API on initial load
    fetchItems();
  }, [searchQuery]);

  const fetchItems = async () => {
    try {
      const response = await fetch(
        apiCallAddresses.advertisements.listByQuery`${searchQuery}`
      );

      const items = await response.json();
      setItems(items);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleSearch = () => {
    fetchItems();
  };

  const handleCreate = (data) => {
    // Make necessary API call to create an item
    fetch(apiCallAddresses.advertisements.create, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => {
        fetchItems();
      })
      .catch((error) => {
        console.error("Error creating item:", error);
      });
  };

  const handleEdit = (data) => {
    // Make necessary API call to edit an item
    fetch(apiCallAddresses.advertisements.update`${advertisementId}`, {
      credentials: "include",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => {
        fetchItems();
        setAdvertisementId(null);
      })
      .catch((error) => {
        console.error("Error editing item:", error);
      });
  };

  const handleEditOpen = (itemId) => {
    handleOpenModal(setEditModalOpen);
    setAdvertisementId(itemId);
  };

  const handleDeleteOpen = (itemId) => {
    handleOpenModal(setDeleteModalOpen);
    setAdvertisementId(itemId);
  };

  const handleDelete = async () => {
    fetch(apiCallAddresses.advertisements.delete`${advertisementId}`, {
      credentials: "include",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
    })
      .then((response) => response.json())
      .then(() => {
        fetchItems();
        setAdvertisementId(null);
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  const CreateAdvertisementModal = () => (
    <Modal
      isOpen={isCreateModalOpen}
      onClose={() => handleCloseModal(setCreateModalOpen)}
      title="Create Advertisement"
      ChildForm={() => (
        <AdvertisementForm onSubmit={handleCreateForm} mode="create" />
      )}
    />
  );

  const EditAdvertisementModal = () => (
    <Modal
      isOpen={isEditModalOpen}
      onClose={() => handleCloseModal(setEditModalOpen)}
      title="Edit Advertisement"
      ChildForm={() => (
        <AdvertisementForm
          onSubmit={handleUpdateForm}
          mode="edit"
          advertisementId={advertisementId}
        />
      )}
    />
  );

  const DeleteAdvertisementModal = () => (
    <Modal
      isOpen={isDeleteModalOpen}
      onClose={() => handleCloseModal(setDeleteModalOpen)}
      title="Delete Advertisement"
      ChildForm={() => (
        <AdvertisementForm
          onSubmit={handleDeleteForm}
          mode="delete"
          advertisementId={advertisementId}
        />
      )}
    />
  );

  return user ? (
    <>
      <CreateAdvertisementModal />
      <EditAdvertisementModal />
      <DeleteAdvertisementModal />

      <div className="flex justify-between p-4 bg-white shadow">
        <input
          type="text"
          placeholder="Search..."
          className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex flex-row">
          <button
            className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 flex items-center border"
            onClick={handleSearch}
          >
            <FiSearch className="ml-2" />
          </button>
          <button
            className="bg-green-500 justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 flex items-center border"
            onClick={() => handleOpenModal(setCreateModalOpen)}
          >
            Create <FiPlus className="ml-2" />
          </button>
        </div>
      </div>
      <ul>
        <div className="flex justify-between items-center p-4 bg-gray-200 border-b">
          <span>Advertisement name</span>
          <span>Actions</span>
        </div>
        {items
          .sort((a, b) => b.type.localeCompare(a.type))
          .map((item) => (
            <li key={item._id}>
              <div className="flex flex-col mb-2 p-4 bg-white">
                <div className="flex justify-between pb-2 items-center bg-white border-b">
                  <div>
                    <span className="font-bold">{item.name}</span>
                    <span className="mx-2 px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded-md">
                      {item.type}
                    </span>
                  </div>
                  <div className="flex flex-row space-x-4">
                    <button
                      className="text-blue-500 font-bold py-2 px-4 border rounder"
                      onClick={() => handleEditOpen(item._id)}
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      className="text-red-500 font-bold py-2 px-4 border rounder"
                      onClick={() => handleDeleteOpen(item._id)}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col pt-2">
                  <span className="font-semibold">
                    {item.type === "image" ? "Image" : "Text"}
                  </span>
                  <span className="ml-2">
                    {item.type === "image" ? (
                      <img className="border-gray-600 border-2 p-1" src={item.content} />
                    ) : (
                      <span>{item.content}</span>
                    )}
                  </span>
                </div>
                {item.alt && (
                  <div className="flex flex-col">
                    <span className="font-semibold">Alt</span>
                    <span className="ml-2">{item.alt}</span>
                  </div>
                )}
              </div>
            </li>
          ))}
      </ul>
    </>
  ) : (
    <>
      <h1 className="text-4xl font-medium text-center">
        Please login to view this page
      </h1>
    </>
  );
};

export default AdsPage;
