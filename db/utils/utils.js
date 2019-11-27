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
      const newCommentObj = { ...commentObj };
      newCommentObj.article_id = articleRef[newCommentObj.belongs_to]
      delete newCommentObj.belongs_to;
      newCommentObj.author = newCommentObj.created_by
      delete newCommentObj.created_by
      newCommentObj.created_at = new Date(newCommentObj.created_at);
      return newCommentObj;
    });
  }
};
