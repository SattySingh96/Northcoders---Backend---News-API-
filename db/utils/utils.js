exports.formatDates = list => {
  if (list.length === 0) return [];
  else {
    return list.map((timeObj) => {
      return timeObj.created_at = new Date(timeObj.created_at);
    });
  }
};

exports.makeRefObj = list => { };

exports.formatComments = (comments, articleRef) => { };
