/* ASYNCHRONOUSLY FETCH BOUNDARY AND MARKER JSON*/

// var communityBoundariesJSON = null;
// var censusBoundariesJSON = null;
// var museumMarkersJSON = null;
// var greenspaceMarkersJSON = null;

var JSONToFetch = ["http://localhost/testing/la_mapping/Community_Boundaries_(CSA).js",
    "http://localhost/testing/la_mapping/2010_Census_Data_by_Tract.js",
    "http://localhost/testing/la_mapping/Parks_and_Gardens.js",
    "http://localhost/testing/la_mapping/museums.json"];


function fetchJSON() {
    //assign the right values to pre-instantiated variables
    // loadedJSON = JSON.parse(this.responseText);
    //loadedJSON = this.responseText;
    console.log("fetchJSON() fired");
    console.log("museums =" + museums);
    //console.log(la_communities);
}
//let museums = null;
async function asyncFetch() {
    // let req = new XMLHttpRequest();
    // req.addEventListener('load', fetchJSON);
    // for(let jsonPath of JSONToFetch) {
    //     console.log(jsonPath);
    //     req.open('GET', jsonPath);
    //     //console.log("responseType = " + req.responseType);
    //     req.onreadystatechange = function() {
    //         if(req.readyState === 4 && req.status === 200) {
    //             eval(req.responseText);
    //             console.log("done");
    //             console.log("responseText = " + req.responseText);
    //         }
    //     }
    //     req.send();
    // }


    // This was for testing XHR ~~~~~~~~~~~~~~~
    // let xhr = new XMLHttpRequest();
    // //xhr.addEventListener('load', console.log(xhr.responseText));
    // xhr.open('GET', 'http://localhost/testing/la_mapping/museums.json', false);
    // xhr.send();
    // museums = JSON.parse(xhr.responseText);
    // console.log(museums);
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    let communityData = await fetch('http://localhost/testing/la_mapping/Community_Boundaries_(CSA).json')
        .then(function(response){
            let promise = response.json().then(
                function(json){
                    return json;
                })
            return promise;
        });
    let censusData = await fetch('http://localhost/testing/la_mapping/2010_Census_Data_by_Tract.json')
        .then(function(response){
            let promise = response.json().then(
                function(json){
                    return json;
                })
            return promise;
        });
    let museumData = await fetch('http://localhost/testing/la_mapping/museums.json')
        .then(function(response){
            let promise = response.json().then(
                function(json){
                    return json;
                })
            return promise;
        });
    let greenspaceData = await fetch('http://localhost/testing/la_mapping/Parks_and_Gardens.json')
        .then(function(response){
            let promise = response.json().then(
                function(json){
                    return json;
                })
            return promise;
        });

    let result = {communityData, censusData, museumData, greenspaceData};

    return result;
}

//promisedData is itself a Promise and must be handled appropriately.
let promisedData = asyncFetch();


//promisedData.then((d)=>{console.log(d.greenspaceData)});

//Unpack all of the promises from promisedData for easier usage later.
var communityData = promisedData.then((d)=>{return d.communityData});
var censusData = promisedData.then((d)=>{return d.censusData});
var museumData = promisedData.then((d)=>{return d.museumData});
var greenspaceData = promisedData.then((d)=>{return d.greenspaceData});

//museumData.then((d)=>{console.log(d)});


