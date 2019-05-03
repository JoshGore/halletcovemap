import Cesium from 'cesium/Cesium';
import "./css/main.css";
import "cesium/Widgets/widgets.css";
import * as Mapillary from 'mapillary-js';
import "mapillary-js/dist/mapillary.min.css";

// Access Token jgore development account
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmMTdiNzIxNC02NjE0LTQ1YmMtYTVkNy05YWE3NmJlNzFhMWEiLCJpZCI6Nzk2Niwic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU1Njg0NjQwOX0.W7hLxfHvU7l2yRMNJONCzWRSz8AylFs9oDjkeiq2fmo';

// coordinates of Hallet Cove
var west = 138.4941;
var south = -35.0794;
var east = 138.5054;
var north = -35.0667;
var parkExtent = Cesium.Rectangle.fromDegrees(west, south, east, north);

// initiate cesium viewer
var viewer = new Cesium.Viewer('cesiumContainer', {
    timeline: false, animation: false, homeButton: false, geocoder: false, creditContainer: "credits", creditViewport: "credits"
});

// initiate mapillary viewer
var mapillary = new Mapillary.Viewer(
    'mapillary',
    'bXdBUXpPNGdUVzJIMlF3Vk9ZVmdKQTo0NDQ0NzE1NTQ4ZWE4MDE5',
    null,
    {
        component: {
            cover: false,
        },
    }
);

// start loading mapillary images geojson
Cesium.GeoJsonDataSource.load('./data/mapillaryimages.geojson').then((dataSource) => {
    dataSource.entities.values.forEach((entity) => {
        entity.billboard = undefined;
        entity.point = {
            pixelSize: 4,
            color: Cesium.Color.GREEN,
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 1
        };
    });
    /*
    dataSource.point = {
        pixelSize: 4,
        color: Cesium.Color.GREEN,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 1
    };
    */
    viewer.dataSources.add(dataSource);
});

// if mouse is over mapillary point highlight point and change courser
// var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
var previousPickedEntity = undefined;
// handler.setInputAction((movement) => {
viewer.screenSpaceEventHandler.setInputAction((movement) => {
    var pickedPrimitive = viewer.scene.pick(movement.endPosition);
    var pickedEntity = (Cesium.defined(pickedPrimitive)) ? pickedPrimitive.id : undefined;
    if (Cesium.defined(previousPickedEntity)) {
        previousPickedEntity.point.pixelSize = 4;
    }
    if (Cesium.defined(pickedEntity) && Cesium.defined(pickedEntity.point)) {
        pickedEntity.point.pixelSize = 6;
        previousPickedEntity = pickedEntity;
    }

}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
viewer.screenSpaceEventHandler.setInputAction((movement) => {
    var pickedPrimitive = viewer.scene.pick(movement.position);
    var pickedEntity = (Cesium.defined(pickedPrimitive)) ? pickedPrimitive.id : undefined;
    // pickedEntity && console.log(pickedEntity.properties.key.valueOf());
    pickedEntity && mapillary.moveToKey(pickedEntity.properties.key.valueOf());
    if (pickedEntity) {
        // document.getElementById('mapillary').className += "show";
        var el = document.getElementById('mapillary');
        el.className += " show";
    }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);

// handle resize on mapillary viewer resize
document.getElementById('mapillary').addEventListener("transitionend", () => mapillary.resize());


// access to camera 
var camera = viewer.camera;

// fly to initial view of entire park
camera.flyTo({
    // destination: Cesium.Cartesian3.fromDegrees(138.499209, -35.073201, 1500),
    destination: Cesium.Cartesian3.fromDegrees(138.485, -35.073201, 1000),
    orientation: {
        heading: Cesium.Math.toRadians(90),
        pitch: -Cesium.Math.toRadians(45),
    }
});

// set up sites

var site1 = viewer.entities.add({
    name: "Site 1: ",
});

// Sites of Interest (textual)
// Sites of Interest (3d model)
// Streetview
// zoom to point, then transition to viewer (including minimap?)
