const logout = () => {
  localStorage.removeItem("user");
  return true;
};

export { logout };
