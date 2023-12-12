// Function to save a single user object to local storage
const saveUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

// Function to read a single user object from local storage
const readUser = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? user : null;
};

// Function to delete a single user object from local storage
const deleteUser = () => {
  localStorage.removeItem('user');
};

export { saveUser, readUser, deleteUser };
