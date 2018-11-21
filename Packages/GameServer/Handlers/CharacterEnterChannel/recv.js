export default (reader) => {
  try {
    const characterId = reader.readInt();

    return ({
      characterId,
    });
  } catch (err) {
    return {};
  }
};
