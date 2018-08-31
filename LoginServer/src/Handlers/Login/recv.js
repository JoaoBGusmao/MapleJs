export default (reader) => {
  try {
    const login = reader.readString();
    const password = reader.readString();

    return ({
      login,
      password,
    });
  } catch (err) {
    return {};
  }
};
