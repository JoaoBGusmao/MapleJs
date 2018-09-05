export default (reader) => {
  try {
    const name = reader.readString();

    return ({
      name,
    });
  } catch (err) {
    return {};
  }
};
