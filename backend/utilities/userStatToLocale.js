const userStatToLocale = (userStatistics) => {
  const result = [...userStatistics];

  userStatistics.forEach((record, index) => {
    const { date, data } = record;
    const newTimeStat = {};
    Object.entries(data.time_stat).forEach(([k, v]) => {
      const newDate = new Date(
        (v.timestamp_start - v.patient_timezone * 60) * 1000
      );
      const newTimestamp =
        newDate.getUTCHours() * 3600 +
        newDate.getUTCMinutes() * 60 +
        newDate.getUTCSeconds();

      newTimeStat[k] = { ...v, timestamp_start: newTimestamp };
    });

    result[index] = { date, data: { ...data, time_stat: newTimeStat } };
  });
  return result;
};

export default userStatToLocale;
