const {fetchEndpointsJSON} = require('../models/apiModels')

//-----------------------/api----------------------------------

exports.getEndpointsJSON = (req, res, next) => {
    console.log('endpoints controller')
    fetchEndpointsJSON()
        .then((data) => {
            console.log(data)
            res.status(200).send({data})
        })
        .catch(next)
}
