export default reader => ({
  name: reader.readString(),
  job: reader.readInt(),
  face: reader.readInt(),
  hair: reader.readInt(),
  hairColor: reader.readInt(),
  skin: reader.readInt(),
  topWear: reader.readInt(),
  bottomWear: reader.readInt(),
  shoes: reader.readInt(),
  weapon: reader.readInt(),
  gender: reader.readByte(),
});
