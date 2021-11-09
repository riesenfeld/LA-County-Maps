var JSONToFetch = [
  "json/Community_Boundaries_(CSA).geojson",
  "json/2010_Census_Data_by_Tract.json",
  "json/museums.json",
  "json/Parks_and_Gardens.geojson",
]

async function asyncFetch() {
  let communityData = await fetch(JSONToFetch[0]).then(function (response) {
    let promise = response.json().then(function (json) {
      return json
    })
    return promise
  })
  let censusData = await fetch(JSONToFetch[1]).then(function (response) {
    let promise = response.json().then(function (json) {
      return json
    })
    return promise
  })
  let museumData = await fetch(JSONToFetch[2]).then(function (response) {
    let promise = response.json().then(function (json) {
      return json
    })
    return promise
  })
  let greenspaceData = await fetch(JSONToFetch[3]).then(function (response) {
    let promise = response.json().then(function (json) {
      return json
    })
    return promise
  })

  let result = { communityData, censusData, museumData, greenspaceData }

  return result
}

//promisedData is itself a Promise and must be handled appropriately.
let promisedData = asyncFetch()

//Unpack all of the promises from promisedData for easier usage later.
var communityData = promisedData.then((d) => {
  return d.communityData
})
var censusData = promisedData.then((d) => {
  return d.censusData
})
var museumData = promisedData.then((d) => {
  return d.museumData
})
var greenspaceData = promisedData.then((d) => {
  return d.greenspaceData
})
