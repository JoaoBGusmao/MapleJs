export default (reader) => {
  const login = reader.readString();
  const password = reader.readString();

  return ({
    login,
    password,
  });
};
