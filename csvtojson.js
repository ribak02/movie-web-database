const fs = require('fs');
const path = require('path');

var file = path.join(__dirname, 'movie_metadata_subset.csv');
var out = path.join(__dirname, 'movie_metadata_subset.json');

var data = fs.readFileSync(file, {encoding: 'utf-8'}, function(err){console.log(err);});
var json = []; 

data = data.split("\n");
headers = data[0].split(",");
data.shift();
   
data.forEach(function(n){
    temp = {}
    line = n.split(",")
    for(var i=0;i<headers.length;i++){
        temp[headers[i]] = line[i];
    }
    json.push(temp);
});

fs.writeFileSync(out, JSON.stringify(json), 'utf8', 
    function(err){console.log(err);});