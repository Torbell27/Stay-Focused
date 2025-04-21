const generateLocaleTimestamp = (timestampStart, patientTimezone) => {
  const newDate = new Date((timestampStart - patientTimezone * 60) * 1000);
  const newTimestamp =
    newDate.getUTCHours() * 3600 +
    newDate.getUTCMinutes() * 60 +
    newDate.getUTCSeconds();
  return newTimestamp;
};

export default generateLocaleTimestamp;
