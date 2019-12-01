exports.formatDates = list => {
    return list.map((obj) => {
        const newObj = {...obj }
        newObj.created_at = new Date(newObj.created_at);
        return newObj;
    });
};

exports.makeRefObj = (list, key, value) => {
    return list.reduce(function(lookUpObj, arrayObj) {
        lookUpObj[arrayObj[key]] = arrayObj[value];
        return lookUpObj;
    }, {});
};


exports.formatComments = (comments, articleRef) => {
    return comments.map((commentObj) => {
        const newCommentObj = {...commentObj };
        newCommentObj.article_id = articleRef[newCommentObj.belongs_to]
        delete newCommentObj.belongs_to;
        newCommentObj.author = newCommentObj.created_by
        delete newCommentObj.created_by
        newCommentObj.created_at = new Date(newCommentObj.created_at);
        return newCommentObj;
    })
};