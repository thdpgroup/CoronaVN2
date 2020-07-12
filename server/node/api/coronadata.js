const fs = require('fs');
const axios = require('axios');
const urlGetData = 'https://www.parsehub.com/api/v2/runs/tuhDjc8x7rQ7/data?api_key=t-_9R5KZG9aM';

var coronaJsonPath ='./data/hcm.json';

const getExistingData = function(){
    fs.exists(coronaJsonPath, function(exists) {
        if(exists){
            fs.readFile(coronaJsonPath, 'utf8', function readFileCallback(err, data){
                if (err){
                    console.log("error");
                    console.log(err);
                } else {
               
                var content = data;
                cities = JSON.parse(content);
                return cities;
            }});
        }
    })
}
const create =  function() {
    axios.get(urlGetData,{headers: {'Content-Type': 'application/json'}}).then(response => {
        
        fs.exists(coronaJsonPath, function(exists) {
            if(exists){
                fs.readFile(coronaJsonPath, 'utf8', function readFileCallback(err, data){
                    if (err){
                        console.log(err);
                    } else {
                    var content = data;
                    var obj = JSON.parse(content);
                    response.data.date.forEach(city => {
                        obj.data.push(city);
                    });
                    
                    json = JSON.stringify(obj); //convert it back to json
                    fs.writeFile(coronaJsonPath, json, 'utf8', function(err,result){
                        if(err) console.log('error', err);
                    }); // write it back 
                }});
            }
            else{
                var obj={data:[]};
                response.data.date.forEach(city => {
                    obj.data.push(city);
                });
                json = JSON.stringify(obj);
                fs.writeFile(coronaJsonPath, json, 'utf8', function(err,result){
                    if(err) console.log('error', err);
                }); // write it back 
            }
        
      });
    })
    .catch(error => {
      console.log(error);
    });
}
module.exports.create = create;
  

