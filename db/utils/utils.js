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
  if (comments.length === 0) return comments;
  else {
    return comments.map((commentObj) => {
      commentObj['belongs_to'] = articleRef[commentObj['belongs_to']]
      delete Object.assign(commentObj, { ['author']: commentObj['created_by'] })['created_by'];
      delete Object.assign(commentObj, { ['article_id']: commentObj['belongs_to'] })['belongs_to'];
      commentObj.created_at = new Date(commentObj.created_at);
      return commentObj;
    });
  }
};
