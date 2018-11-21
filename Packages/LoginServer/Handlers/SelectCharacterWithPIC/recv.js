export default (reader) => {
  try {
    const PIC = reader.readString();
    const characterId = reader.readInt();
    const macs = reader.readString();

    return ({
      PIC,
      characterId,
      macs,
    });
  } catch (err) {
    return {};
  }
};
