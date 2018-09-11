export default (reader) => {
  try {
    const name = reader.readString();
    const job = reader.readUInt32();
    const face = reader.readUInt32();
    const hair = reader.readUInt32();
    const hairColor = reader.readUInt32();
    const skinColor = reader.readUInt32();
    const topWear = reader.readUInt32();
    const bottomWear = reader.readUInt32();
    const shoes = reader.readUInt32();
    const weapon = reader.readUInt32();
    const gender = reader.readUInt8();

    return ({
      name,
      job,
      face,
      hair,
      hairColor,
      skinColor,
      topWear,
      bottomWear,
      shoes,
      weapon,
      gender,
    });
  } catch (err) {
    return {};
  }
};
