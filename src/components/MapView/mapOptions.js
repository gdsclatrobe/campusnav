const mapOptions = {
    zoom: 15,
    minZoom: 15,
    maxZoom: 18,
    restriction: {
        latLngBounds: {
            north: -37.7050,
            south: -37.7350,
            west: 145.0350,
            east: 145.0650
        },
        strictBounds: true
    },
    disableDefaultUI: true,
    styles: [
        {
            featureType: 'poi.business',
            stylers: [{ visibility: 'off' }]
        },
        {
            featureType: 'poi.medical',
            stylers: [{ visibility: 'off' }]
        },
        {
            featureType: 'poi.school',
            stylers: [{ visibility: 'off' }]
        },
        {
            featureType: 'poi.government',
            stylers: [{ visibility: 'off' }]
        },
        {
            featureType: 'poi.attraction',
            stylers: [{ visibility: 'off' }]
        },
        {
            featureType: 'poi.place_of_worship',
            stylers: [{ visibility: 'off' }]
        },
        {
            featureType: 'poi.sports_complex',
            stylers: [{ visibility: 'off' }]
        },
        {
            featureType: 'poi',
            elementType: 'labels.text',
            stylers: [{ visibility: 'off' }]
        },
        {
            featureType: 'transit',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
        },
        {
            featureType: 'landscape',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
        },
        {
            featureType: 'landscape.man_made',
            elementType: 'geometry',
            stylers: [
                { visibility: 'on' }
            ]
        },
        {
            featureType: 'landscape.man_made',
            elementType: 'geometry.fill',
            stylers: [
                { color: '#d0f0c0' },
                { lightness: 20 }
            ]
        },
        {
            featureType: 'landscape.natural',
            elementType: 'geometry',
            stylers: [
                { visibility: 'on' },
                { color: '#d0f0c0' }
            ]
        },
        {
            featureType: 'landscape.man_made.building',
            elementType: 'geometry.fill',
            stylers: [
                { color: '#ffe18c' }
            ]
        },
        {
            featureType: 'landscape.man_made.building',
            elementType: 'geometry.stroke',
            stylers: [
                { color: '#000000' },
                { weight: 2 }
            ]
        },
        {
            featureType: 'water',
            stylers: [{ color: '#b1ddfc' }]
        },
        {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [
                { visibility: 'on' },
                { color: '#d0f0c0' }
            ]
        }
    ]
};

export default mapOptions;
