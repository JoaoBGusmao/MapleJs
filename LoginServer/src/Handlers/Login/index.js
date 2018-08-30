import recv from './recv';

export default (reader) => {
  const data = recv(reader);

  console.log(data);
};
