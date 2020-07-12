const axios = require('axios');
const fs = require('fs');
const urlGetData = 'https://www.parsehub.com/api/v2/runs/tuhDjc8x7rQ7/data?api_key=t-_9R5KZG9aM';
var cities={};
var cityJsonPath ='./data/city.json';
var provincesJsonPath='./assets/data/provinces.json';

const getExistingData = function(){
    fs.exists(cityJsonPath, function(exists) {
        if(exists){
            fs.readFile(cityJsonPath, 'utf8', function readFileCallback(err, data){
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
        
        fs.exists(cityJsonPath, function(exists) {
            if(exists){
                fs.readFile(cityJsonPath, 'utf8', function readFileCallback(err, data){
                    if (err){ console.log(err);
                    } else {
                    var content = data;
                    var obj = JSON.parse(content);
                    response.data.date.forEach(city => {
                        obj.data.push(city);
                    });
                    
                    json = JSON.stringify(obj); //convert it back to json
                    fs.writeFile(cityJsonPath, json, 'utf8', function(err,result){
                        if(err) console.log('error', err);
                    }); // write it back 
                }});
            }
            else{
                var obj={data:[]};
                response.data.date.forEach(city => {
                    obj.data.push(city);
                });
                json = JSON.stringify(obj); //convert it back to json
                fs.writeFile(cityJsonPath, json, 'utf8', function(err,result){
                    if(err) console.log('error', err);
                }); 
            }
        
      });
    })
    .catch(error => {
      console.log(error);
    });
}
module.exports.create = create;

const {to,ResponseError,ResponseSuccess,} = require('../../services/util.service');

const getProvinces = async function getProvinces(req, res){
    fs.exists(provincesJsonPath, function(exists) {
        if(exists){
            fs.readFile(provincesJsonPath, 'utf8', function readFileCallback(err, data){
                if (err){ console.log(err);
                } else {
                var content = data;
                var obj = JSON.parse(content);
                return ResponseSuccess(res, { data: obj });
            }});
        }
  });
}
module.exports.getProvinces = getProvinces;  

var GetData = {
    getProvinces() {
        fs.exists(provincesJsonPath, function(exists) {
            if(exists){
                fs.readFile(provincesJsonPath, 'utf8', function readFileCallback(err, data){
                    if (err){ console.log(err);
                    } else {
                    var content = data;
                    var obj = JSON.parse(content);
                    console.log(obj);
                    return obj;
                }});
            }
      });
    }
}
module.exports.GetData = GetData; 


