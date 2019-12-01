// ------- Error Handling Middleware -------

exports.customHandlers = (err, req, res, next) => {
    if (err.status) res.status(err.status)
        .send({ msg: err.msg });
    else next(err)
}

exports.handle400s = (err, req, res, next) => {
    const errorCodes = ['22P02', '42703', '23502']
    if (errorCodes.includes(err.code)) {
        res.status(400).send({ msg: 'Bad Request' })
    } else next(err)
}

exports.handle422s = (err, req, res, next) => {
    const errorCodes = ['23503'];
    if (errorCodes.includes(err.code)) {
        res.status(422).send({ msg: 'unprocessable entity' });
    } else next(err);
}

exports.handle500s = (err, req, res, next) => {
    if (err) console.log(err)
    res.status(500).send({ msg: 'server error' })
}


//------------Error controllers------------------


exports.handle405s = (req, res, next) => {
    res.status(405).send({ msg: 'method not allowed on this path' })
}

exports.handle404s = (req, res, next) => {
    res.status(404).send({ msg: 'Invalid path/url' });
}