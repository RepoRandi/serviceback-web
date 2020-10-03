const schedule = (start, end, interval) => {
  const times = [];
  var tt = start * 60; // start time
  for (var i = 0; tt <= end * 60; i++) {
    var hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
    var mm = tt % 60; // getting minutes of the hour in 0-55 format
    times[i] = ('0' + hh).slice(-2) + ':' + ('0' + mm).slice(-2); // pushing data in array in [00:00 - 12:00 AM/PM format]
    tt = tt + interval;
  }
  return times;
};

export default schedule(8, 19, 30).map((t) => {
  return {
    id: t,
    type: 'secondary',
    value: t,
  };
});
