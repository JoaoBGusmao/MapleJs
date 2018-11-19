export default (reader) => {
  try {
    const username = reader.readString();
    const password = reader.readString();

    return ({
      username,
      password,
    });
  } catch (err) {
    return {};
  }
};
