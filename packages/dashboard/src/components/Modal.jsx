import React from "react";

const Modal = ({ title, isOpen, onClose, ChildForm }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full"
      id="my-modal"
    >
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {title}
          </h3>
          <ChildForm />
          <button
            onClick={onClose}
            className="mt-4 py-2 px-4 bg-gray-600 hover:bg-red-700 rounded-md text-white font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
