
var JSONToFetch = ["http://localhost/testing/la_mapping/Community_Boundaries_(CSA).js",
    "http://localhost/testing/la_mapping/2010_Census_Data_by_Tract.js",
    "http://localhost/testing/la_mapping/Parks_and_Gardens.js",
    "http://localhost/testing/la_mapping/museums.json"];

async function asyncFetch() {

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


//Unpack all of the promises from promisedData for easier usage later.
var communityData = promisedData.then((d)=>{return d.communityData});
var censusData = promisedData.then((d)=>{return d.censusData});
var museumData = promisedData.then((d)=>{return d.museumData});
var greenspaceData = promisedData.then((d)=>{return d.greenspaceData});


