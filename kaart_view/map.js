$(document).ready(function() {

    // Define map options
    let mapOptions = {
        zoomControl: true,
        center: [51.5931755007904, 5.327768325805664], // centreer rond Groenewoud
        zoom: 11,
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

    //basemap
    let osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    map.addLayer(osmLayer);

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
    };

    L.polygon(groenewoud_coor, groenewoud_style).addTo(map);

    //Projectpunten inladen in kaart
    let projectenPunten = L.geoJSON(voorbeeldprojecten).addTo(map);


    // Importeren projecten vanaf Geoserver(database)
    var projecten = L.tileLayer.wms('http://localhost:8080/geoserver/Avans_Groenewoud/wms', {
        layers: 'groenewoud projecten sql',
        format: 'image/png',
        transparent: true,
        opacity: 0.5
    });
    map.addLayer(projecten);

    // Define layer switcher, hiermee kan je van basemap wisselen
    let baseMaps = {
        "OpenStreetMap": osmLayer,

        "Satellietbeeld": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        }),

        "Grijze kaart": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
            maxZoom: 16
        }),

        "Landschap": L.tileLayer('https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey={apikey}', {
            attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            apikey: '907253e384a94ac2b54b7b769494fbd6',
            maxZoom: 22
        }),

        "Wandelroutes": L.tileLayer('https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey={apikey}', {
            attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            apikey: '907253e384a94ac2b54b7b769494fbd6',
            maxZoom: 22
        }),

        "Minimalistisch": L.tileLayer('https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0/standaard/EPSG:3857/{z}/{x}/{y}.png', {
            attribution: 'Kaartgegevens &copy; <a href="https://www.kadaster.nl">Kadaster</a>'
        }),

        "Waterlichamen": L.tileLayer('https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0/water/EPSG:3857/{z}/{x}/{y}.png', {
            minZoom: 6,
            maxZoom: 19,
            bounds: [
                [50.5, 3.25],
                [54, 7.6]
            ],
            attribution: 'Kaartgegevens &copy; <a href="https://www.kadaster.nl">Kadaster</a>'
        })
    };

    // Add to map
    L.control.layers(baseMaps).addTo(map);


    // Knop voor centreren
    $('#naargroenewoud').on('click', function() {
        map.flyTo([51.541757143956204, 5.354338836338569], 13);
    });

    // Slider waarde
    $('#sliderjaar').on('input', function() {
        bodemgeschikt.setParams({
            viewparams: 'aantaljaar:' + $(this).val()
        });
        $('#sliderwaarde').text(2021 + parseInt($(this).val()));
    });

});