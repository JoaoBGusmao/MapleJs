export default (reader) => {
  try {
    const PIC = reader.readString();
    const characterId = reader.readInt();

    return ({
      PIC,
      characterId,
    });
  } catch (err) {
    return {};
  }
};
