
const fs = require('fs');



var patientsJsonPath='./assets/data/patients.json';

const {to,ResponseError,ResponseSuccess,} = require('../../services/util.service');

const getPatients = async function getPatients(req, res){
    fs.exists(patientsJsonPath, function(exists) {
        if(exists){
            fs.readFile(patientsJsonPath, 'utf8', function readFileCallback(err, data){
                if (err){ console.log(err);
                } else {
                var content = data;
                var obj = JSON.parse(content);
                return ResponseSuccess(res, { data: obj });
            }});
        }
  });
}


const writeFile = async function writeFile(req, res) {
    var data = JSON.stringify(req.body)
    fs.writeFile(patientsJsonPath, data, 'utf8', function(err,result){
        if(err) console.log('error', err);
    }); 
    return ResponseSuccess(res, { data : "Update successfully"})
}


module.exports = {
    getPatients : getPatients,
    writeFile : writeFile
}

