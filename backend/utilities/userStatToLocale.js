import generateLocaleTimestamp from "./generateLocaleTimestamp.js";

const userStatToLocale = (userStatistics, startDate, endDate) => {
  let result = [...userStatistics];

  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

  const searchDate = (date) => {
    return result.findIndex(
      (element) => element.date.toISOString() === date.toISOString()
    );
  };

  userStatistics.forEach(({ date, data }, index) => {
    const newTimeStat = {};
    Object.entries(data.time_stat).forEach(([k, v]) => {
      const objectToSave = {};
      objectToSave[k] = {
        ...v,
        timestamp_start: generateLocaleTimestamp(
          v.timestamp_start,
          v.patient_timezone
        ),
      };

      const newDate = new Date(
        (v.timestamp_start - v.patient_timezone * 60) * 1000
      );
      const offset = newDate.getTime();

      if (Math.abs(offset) >= oneDayInMilliseconds) {
        const dateWithOffset = new Date(date);
        dateWithOffset.setTime(
          dateWithOffset.getTime() + oneDayInMilliseconds * Math.sign(offset)
        );

        delete data.time_stat[k];

        const searchIndex = searchDate(dateWithOffset);
        if (searchIndex === -1)
          result.push({
            date: dateWithOffset,
            data: { time_stat: objectToSave },
          });
        else result[searchIndex].data.time_stat[k] = objectToSave[k];
      } else newTimeStat[k] = objectToSave[k];
    });

    result[index].data.time_stat = {
      ...result[index].data.time_stat,
      ...newTimeStat,
    };
  });

  [...result].forEach((record) => {
    if (Object.keys(record.data.time_stat).length === 0)
      result = result.filter((e) => e.date !== record.date);
  });

  const start = new Date(startDate);
  const end = new Date(endDate);
  return result.filter((e) => e.date >= start && e.date <= end);
};

export default userStatToLocale;
