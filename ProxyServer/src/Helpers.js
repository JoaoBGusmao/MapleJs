import Int64 from 'node-int64';

export const getFiletimeFromDate = (pDate) => {
  if (!(pDate instanceof Date)) return null;
  let rawTime = pDate.getTime();
  rawTime += 11644473600000; // Seconds between 1601-01-01 00:00:00 and 1970-01-01 00:00:00
  rawTime *= 10000; // Convert to nanoseconds
  return new Int64(rawTime);
};

export const nothing = () => {};
