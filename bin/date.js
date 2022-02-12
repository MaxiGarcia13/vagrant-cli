const format = (ts) => {
  const date = new Date(ts);
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
};

module.exports = {
  format,
};
