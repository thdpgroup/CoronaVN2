const fs = require('fs');
const http = require('http');
var options = {
    host: 'www.google.com',
    port: 80,
    path: '/index.html'
  };
  
  
const collectingData= function(){
    http.get(options, function(res) {
        res.on('data', function (chunk) {
            var str=chunk.toString();
            console.log(str);
            
        });  
      }).on('error', function(e) {
        console.log("Got error: " + e.message);
      });
}
const create =  function() {
    collectingData();
    fs.exists('./data/City.json', function(exists) {
        if(exists){
            fs.readFile('./data/City.json', 'utf8', function readFileCallback(err, data){
                if (err){
                    console.log("error");
                    console.log(err);
                } else {
                console.log(data);
                var content = data;
                var obj = JSON.parse(content);
                obj.data.push({
                    "cityId": "28",
                    "city": "hahahahah",
                    "activeCase": "12",
                    "recovered": "72"
                });
                json = JSON.stringify(obj); //convert it back to json
                fs.writeFile('./data/City.json', json, 'utf8', function(err,result){
                    if(err) console.log('error', err);
                }); // write it back 
            }});
        }
        else{
           var obj={data:[]};
           obj.data.push({
                "cityId": "01",
                "city": "Ho Chi Minh",
                "activeCase": "12",
                "recovered": "72"
            });
            json = JSON.stringify(obj); //convert it back to json
            fs.writeFile('./data/City.json', json, 'utf8', function(err,result){
                if(err) console.log('error', err);
            }); // write it back 
        }
    
  });
}
module.exports.create = create;
  

