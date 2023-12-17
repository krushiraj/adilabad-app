import React, { useState, useEffect, useContext } from "react";
import { FiEdit2, FiTrash2, FiSearch, FiPlus } from "react-icons/fi";
import { apiCallAddresses } from "../utils/api";
import Modal from "../components/Modal";
import { UserContext } from "../contexts/user";
import ListingForm from "../components/forms/Listing";

const ListingsPage = () => {
  const [user] = useContext(UserContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [listingId, setListingId] = useState(null);

  const handleOpenModal = (setFlag) => {
    setFlag(true);
  };

  const handleCloseModal = (setFlag) => {
    setFlag(false);
    setListingId(null);
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
        apiCallAddresses.listings.listByName`${searchQuery}`
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
    fetch(apiCallAddresses.listings.create, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: JSON.stringify({
        ...data,
        category: data.category._id,
      }),
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
    fetch(apiCallAddresses.listings.update`${listingId}`, {
      credentials: "include",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: JSON.stringify({
        ...data,
        category: data.category._id,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        fetchItems();
        setListingId(null);
      })
      .catch((error) => {
        console.error("Error editing item:", error);
      });
  };

  const handleDelete = async () => {
    fetch(apiCallAddresses.listings.delete`${listingId}`, {
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
        setListingId(null);
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  const handleEditOpen = (itemId) => {
    handleOpenModal(setEditModalOpen);
    setListingId(itemId);
  };

  const handleDeleteOpen = (itemId) => {
    handleOpenModal(setDeleteModalOpen);
    setListingId(itemId);
  };

  const CreateListingModal = () => (
    <Modal
      isOpen={isCreateModalOpen}
      onClose={() => handleCloseModal(setCreateModalOpen)}
      title="Create Listing"
      ChildForm={() => (
        <ListingForm onSubmit={handleCreateForm} mode="create" />
      )}
    />
  );

  const EditListingModal = () => (
    <Modal
      isOpen={isEditModalOpen}
      onClose={() => handleCloseModal(setEditModalOpen)}
      title="Edit Listing"
      ChildForm={() => (
        <ListingForm
          onSubmit={handleUpdateForm}
          mode="edit"
          listingId={listingId}
        />
      )}
    />
  );

  const DeleteListingModal = () => (
    <Modal
      isOpen={isDeleteModalOpen}
      onClose={() => handleCloseModal(setDeleteModalOpen)}
      title="Delete Listing"
      ChildForm={() => (
        <ListingForm
          onSubmit={handleDeleteForm}
          mode="delete"
          listingId={listingId}
        />
      )}
    />
  );

  return user ? (
    <>
      <CreateListingModal />
      <EditListingModal />
      <DeleteListingModal />

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
      <ul className="divide-y divide-gray-100">
        <div className="flex justify-between items-center p-4 bg-gray-200 border-b">
          <span>Listing name</span>
          <span>Actions</span>
        </div>
        {items.map((item) => (
          <li key={item._id}>
            <div className="flex justify-between items-center p-4 bg-white border-b">
              <span>{item.name}</span>
              <div className="flex flex-row space-x-4">
                <button
                  className="text-blue-500 font-bold py-2 px-4 border rounded"
                  onClick={() => handleEditOpen(item._id)}
                >
                  <FiEdit2 />
                </button>
                <button
                  className="text-red-500 font-bold py-2 px-4 border rounded"
                  onClick={() => handleDeleteOpen(item._id)}
                >
                  <FiTrash2 />
                </button>
              </div>
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

export default ListingsPage;
