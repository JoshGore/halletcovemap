import Cesium from 'cesium/Cesium';
import "./css/main.css";
import "cesium/Widgets/widgets.css";

// coordinates of Hallet Cove
var west = 138.4941;
var south = -35.0794;
var east = 138.5054;
var north = -35.0667;

// a two dimenstional region specified as longitude and latitude coordinates, in degrees
var parkExtent = Cesium.Rectangle.fromDegrees(west, south, east, north);

// scale camera larger or smaller than DEFAULT_VIEW_RECTANGLE
// Cesium.Camera.DEFAULT_VIEW_FACTOR = 0;

// default rectangle camera views on creation
// Cesium.Camera.DEFAULT_VIEW_RECTANGLE = rectangle;

var viewer = new Cesium.Viewer('cesiumContainer', {
    timeline: false, animation: false, homeButton: false, geocoder: false, creditContainer: "credits", creditViewport: "credits"
});


var camera = viewer.camera;
camera.flyTo({
    // destination: Cesium.Cartesian3.fromDegrees(138.499209, -35.073201, 1500),
    destination: Cesium.Cartesian3.fromDegrees(138.485, -35.073201, 1000),
    orientation: {
        heading: Cesium.Math.toRadians(90),
        pitch: -Cesium.Math.toRadians(45),
    }
});
