export default (reader) => {
  try {
    const name = reader.readString();
    const job = reader.readInt();
    const face = reader.readInt();
    const hair = reader.readInt();
    const hairColor = reader.readInt();
    const skin = reader.readInt();
    const topWear = reader.readInt();
    const bottomWear = reader.readInt();
    const shoes = reader.readInt();
    const weapon = reader.readInt();
    const gender = reader.readByte();

    return ({
      name,
      job,
      face,
      hair,
      hairColor,
      skin,
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
