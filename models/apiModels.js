const fs = require('fs')

//-------------------/api---------------------------

exports.fetchEndpointsJSON = () => {
    return new Promise ((resolve, reject ) => {
        return fs.readFile('endpoints.json', 'utf8', (err, data) => {
            if (err) reject(err)
            else {                
                resolve(JSON.parse(data));
            }
        });
    });
}