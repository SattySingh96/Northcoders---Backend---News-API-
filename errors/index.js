//---handlecustoms????---

exports.handle404s = (req, res, next) => {
  res.status(404).send({ msg: 'Invalid path/url' });
}

exports.handle405s = (req, res, next) => {
  res.status(405).send({ msg: 'method not allowed on this path' })
}
