const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express()
const port = 22572

var file = path.join(__dirname, 'movie_metadata_subset.json');
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
	console.log("Received request to /");
	res.sendFile(__dirname + "/main.html");
})

app.get("/client.js", (req, res) => {
	console.log("Received request to client.js");
	res.sendFile(__dirname + "/client.js");
})

app.get("/data", (req, res) => {
	console.log("Received request to data");
    res.json(readJSON());
})

app.get("/createHTML", (req, res) => {
    console.log("Sent create.html");
    res.sendFile(__dirname + '/create.html');
})

app.post("/create", (req, res) => {
    console.log("Received POST create");
    let d = req.body;
    let entry = [d.dn, d.a2, d.g, d.a1, d.mt, d.a3, d.pk, d.ml];
    let failed = false;
    for (let i=0;i<entry.length;i++) {
        if (entry[i] == '') {
            failed = true;
        }
    }
    if(failed) {
        res.send("Server check: Not all entries filled. Retry")
    }
    else {
        createMovie(entry);
        res.redirect('/');
        console.log('Sent main.html');
    }
})

app.get("/editHTML", (req, res) => {
    console.log("Sent edit.html");
    res.sendFile(__dirname + '/edit.html');
})

app.post("/delete", (req, res) => {
    console.log("Received POST delete");
    let d = req.body.entry_data;
    deleteMovie(d);
    res.redirect('/');
})

app.listen(port, () => console.log("Server listening on port: " + port));

function writeJSON(new_data) {
    fs.writeFileSync(file, JSON.stringify(new_data), 'utf8', 
    function(err) {console.log(err);});
}

function readJSON() {
    return fs.readFileSync(file, {encoding: 'utf-8'}, function(err) {console.log(err);});
}

function createMovie(entry) {
    let data = JSON.parse(readJSON());
    data.unshift(entry);
    writeJSON(data);
}

function updateMovie() {
    
}

function deleteMovie(entry) {
    // let data = JSON.parse(readJSON());
    // for (let i=0;i<data.length;i++) {
    //     console.log(data[3])
    //     for (let [key, value] in Object.entries(data[i])) {
    //         if(entry == value) {
    //             delete data[i];
    //         }
    //     }
    // }
    // writeJSON(data);
    console.log("delete movie implementation here");
}