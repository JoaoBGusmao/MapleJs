export default reader => ({
  PIC: reader.readString(),
  characterId: reader.readInt(),
  macs: reader.readString(),
});
