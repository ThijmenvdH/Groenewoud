$(document).ready(function() {

    // Define map options
    let mapOptions = {
        zoomControl: true,
        center: [51.541757143956204, 5.354338836338569], // centreer rond Groenewoud
        zoom: 13,
        minZoom: 10,
        maxBounds: [
            //south west
            [51.37643757456056, 4.439292835138251],
            //north east
            [51.75722639734795, 6.406109808681152]
        ]
    };

    // Define map global
    let map = L.map('kaart', mapOptions);

    //basemaps
    let osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    map.addLayer(osmLayer);

    let Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });

    let Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
        maxZoom: 16
    });

    L.marker([5.186920166015625, 51.55999738544502]).addTo(map);

    // Polygon groenewoud
    // Dit kan ook maar via localhost is mss mooier en makkelijker met toevoegen, verwijderen en aanpassen voor de klant
    let groenewoud_coor = [
        [51.47617233840713, 5.3932109184187915],
        [51.47275084759717, 5.2435222027435415],
        [51.53600689263029, 5.119926015488748],
        [51.585524584701936, 5.121299306458246],
        [51.6699216370312, 5.078727286403817],
        [51.691209198330164, 5.253135239530025],
        [51.70482798585954, 5.397330791327284],
        [51.63413600177135, 5.500327614039612],
        [51.54198602697715, 5.515433814704086],
        [51.49926068936951, 5.503074195978607]
    ];

    let groenewoud_style = {
        color: 'black',
        fillOpacity: 0,
        weight: 2,
    }

    L.polygon(groenewoud_coor, groenewoud_style).addTo(map);


    // Define layer switcher 
    let baseMaps = {
        "OpenStreetMap": osmLayer,
        "Satellietbeeld": Esri_WorldImagery,
        "Grijze kaart": Esri_WorldGrayCanvas
    };
    // Add to map
    L.control.layers(baseMaps).addTo(map);


    $('#naargroenewoud').on('click', function() {
        map.flyTo([51.541757143956204, 5.354338836338569], 13);
    });

    //var punten = [5.186920166015625, 51.55999738544502]

    ;





});