const {fetchEndpointsJSON} = require('../models/apiModels')

//-----------------------/api----------------------------------

exports.getEndpointsJSON = (req, res, next) => {
    fetchEndpointsJSON()
        .then((data) => {            
            res.status(200).send({data})
        })
        .catch(next)
}
