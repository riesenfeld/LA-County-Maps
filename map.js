
const map = L.map('map').setView([34.0522, -118.2437], 9);

/* TILE LAYERS */
const Esri_WorldShadedRelief = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri',
    maxZoom: 13
}).addTo(map);

const Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var Esri_WorldStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
});

/**************************************************************************************************************/

/*
*
*   Wrapping the Boundary Layer and Marker Layer sections in an async function
*   because they rely on JSON data that is loaded asynchronously and must await
 *  the arrival of those data.
*
*
* /

/**************************************************************************************************************/
/* BOUNDARY LAYERS */
async function asyncBoundaryWrapper()
{

    la_communities = await communityData.then((d)=>{return d});
    census_data = await censusData.then((d)=>{return d});

    const communities = L.geoJSON(await la_communities, {
        style: function (feature) {
            return {
                weight: 1,
                color: '#33F',
                fillOpacity: 0.4
            }
        },
        onEachFeature: function (feature, layer) {
            let label = feature.properties.label;
            let descrip = '<h4>' + label + '</h4>';
        }
    });

    const census = L.geoJSON(census_data, {
        style: function (feature) {
            return {
                color: '#F33',
                weight: 0.5
            }
        },
        onEachFeature(feature, layer) {
            let population = feature.properties.p0010001;
            let tractNumber = feature.properties.ct10;
            let description = '<h3>Tract number : ' + tractNumber + '</h3><div> Population: ' + population + '</div>';

        }
    });


    /* EVENT HANDLERS */

    communities.on('click', function(e){
        document.getElementById('content').innerText = e.layer.feature.properties.label;
        console.log(e.layer.feature.properties.label)
    });
    census.on('click', function(e){
        let props = e.layer.feature.properties;
        let population = props.p0010001;
        let tractNumber = props.ct10;
        let ages_0_9 = props.ages_0_9;
        let ages_10_19 = props.ages_10_19;
        let ages_20_29 = props.ages_20_29;
        let ages_30_39 = props.ages_30_39;
        let ages_40_49 = props.ages_40_49;
        let ages_50_59 = props.ages_50_59;
        let ages_60_69 = props.ages_60_69;
        let ages_70_79 = props.ages_70_79;
        let ages_80_over = props.ages_80_over;
        let ages = 
            '<div> <strong> Ages 0 thru 9:</strong> '       + ages_0_9     + '</div>' +
            '<div> <strong> Ages 10 thru 19:</strong> '     + ages_10_19   + '</div>' +
            '<div> <strong> Ages 20 thru 29:</strong> '     + ages_20_29   + '</div>' +
            '<div> <strong> Ages 30 thru 39:</strong> '     + ages_30_39   + '</div>' +
            '<div> <strong> Ages 40 thru 49:</strong> '     + ages_40_49   + '</div>' +
            '<div> <strong> Ages 50 thru 59:</strong> '     + ages_50_59   + '</div>' +
            '<div> <strong> Ages 60 thru 69:</strong> '     + ages_60_69   + '</div>' +
            '<div> <strong> Ages 70 thru 79:</strong> '     + ages_70_79   + '</div>' +
            '<div> <strong> Ages 80 and over :</strong> '   + ages_80_over + '</div>';
        let description = '<h3>Tract number : ' + tractNumber + '</h3>' +
                          '<div><strong>Population:</strong> ' + population + '</div>' +
                          '<div>' + ages + '</div>';
        console.log('Tract number: ' + tractNumber + '\n Population: ' + population);
        document.getElementById('content').innerHTML = description;
    });

    return {communities, census};
}
boundaryLayers = asyncBoundaryWrapper();
communities = boundaryLayers.communities;
communities = boundaryLayers.then((d)=>{return d.communities});
census = boundaryLayers.then((d)=>{return d.census});

/*************************************************************************************************************/
/* MARKER LAYERS */

async function asyncMarkerWrapper() {

    museums = await museumData.then((d)=>{return d});
    greenspace = await greenspaceData.then((d)=>{return d});

    var markericon = L.icon({
        iconUrl: 'icon0.svg',
        iconSize: [12, 12]
    });

    var geojsonMarkerOptions = {
        radius: 6,
        fillColor: '#117800',
        color: '#000',
        weight: 1,
        opacity: 1,
        fillOpacity: 1
    };

    const museumMarkers = L.layerGroup();
    for (let i = 0; i < museums.data.length; i++) {
        let description = "<h3>" + museums.data[i].name + "</h3><div>" + museums.data[i].details.address + "</div><div>" + museums.data[i].details.city + "</div>";
        let layer = L.marker(museums.data[i].latlng, {icon: markericon});
        museumMarkers.addLayer(layer);

        /* Add event handler on each Marker in the LayerGroup*/
        layer.on('click', function(e){
           console.log(description);
           document.getElementById('content').innerHTML = description;
        });
    }


    const greenspaceMarkers = L.geoJSON(greenspace, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
        },
        onEachFeature(feature, layer) {

        }
    });


    /* Event handler */
    greenspaceMarkers.on('click', function(e){
        console.log(e);
        let name = e.layer.feature.properties.name;
        let address = e.layer.feature.properties.addrln1;
        let city = e.layer.feature.properties.city;
        let org = e.layer.feature.properties.org_name;

        if(address == null || city == null){
            address = 'Address not on file';
            city = '';
        }

        let description = "<h3>" + name + "</h3><div>" + address + "</div><div>" + city + "</div><div>" + org + "</div>";
        document.getElementById('content').innerHTML = description;
    });

    return {museumMarkers, greenspaceMarkers};
}
markerLayers = asyncMarkerWrapper();

museumMarkers = markerLayers.then((d)=>{return d.museumMarkers});
greenspaceMarkers = markerLayers.then((d)=>{return d.greenspaceMarkers});

/*************************************************************************************************************/
/*Set Defaults*/
var currentTileLayer = Esri_WorldShadedRelief;
var currentBoundaryLayer = L.layerGroup();
var currentMarkerLayer = L.layerGroup();

let button = document.getElementById('tile-layer-button');
button.onclick = refreshMap;

function swapTileLayer(newTileLayer) {
    map.removeLayer(currentTileLayer);
    map.addLayer(newTileLayer);
    currentTileLayer = newTileLayer;
}

function swapBoundaryLayer(newBoundaryLayer) {
    map.removeLayer(currentBoundaryLayer);
    map.addLayer(newBoundaryLayer);
    currentBoundaryLayer = newBoundaryLayer;
}

function swapMarkerLayer(newMarkerLayer) {
    map.removeLayer(currentMarkerLayer);
    map.addLayer(newMarkerLayer);
    currentMarkerLayer = newMarkerLayer;
}

//Relies on the JSON fetched asynchronously in fetch.js
async function refreshMap() {
    let tileLayerDropdown = document.getElementById('tile-layer-menu');
    let boundaryLayerDropdown = document.getElementById('bounds-layer-menu');
    let markerLayerDropdown = document.getElementById('marker-layer-menu')
    let mapType = tileLayerDropdown.options[tileLayerDropdown.selectedIndex].value;
    let boundaryType = boundaryLayerDropdown.options[boundaryLayerDropdown.selectedIndex].value;
    let markerType = markerLayerDropdown.options[markerLayerDropdown.selectedIndex].value;
    switch(mapType) {
        case 'relief':
            swapTileLayer(Esri_WorldShadedRelief);
            break;
        case 'satellite-day':
            swapTileLayer(Esri_WorldImagery);
            break;
        case 'road-map':
            swapTileLayer(Esri_WorldStreetMap);
            break;
    }
    switch(boundaryType) {
        case 'la_communities':
            swapBoundaryLayer(await communities);
            break;
        case 'census_data':
            swapBoundaryLayer(await census);
            break;
        case 'blank':
            swapBoundaryLayer(L.layerGroup());
            break;
    }
    switch(markerType) {
        case 'museums':
            swapMarkerLayer(await museumMarkers);
            break;
        case 'parksandgardens':
            swapMarkerLayer(await greenspaceMarkers);
            break;
        case 'blank':
            swapMarkerLayer(L.layerGroup());
            break;
    }
}
