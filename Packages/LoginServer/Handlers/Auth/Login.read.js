export default reader => ({
  username: reader.readString(),
  password: reader.readString(),
});
