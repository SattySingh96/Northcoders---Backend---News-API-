exports.formatDates = list => {
  if (list.length === 0) return [];
  else {
    return list.map((obj) => {
      obj.created_at = new Date(obj.created_at);
      return obj;
    });
  }
};

exports.makeRefObj = (list, key, value) => {
  if (list.length === 0) return {};
  else {
    return list.reduce(function (lookUpObj, arrayObj) {
      lookUpObj[arrayObj[key]] = arrayObj[value];
      return lookUpObj;
    }, {});
  };
};


exports.formatComments = (comments, articleRef) => {


};
