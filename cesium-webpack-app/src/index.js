import Cesium from 'cesium/Cesium';
import "./css/main.css";
import "cesium/Widgets/widgets.css";

// coordinates of Hallet Cove
var west = 138.4941;
var south = -35.0794;
var east = 138.5054;
var north = -35.0667;

// a two dimenstional region specified as longitude and latitude coordinates, in degrees
var rectangle = Cesium.Rectangle.fromDegrees(west, south, east, north);

// var heading = Cesium.HeadingPitchRange(1.5708, 0.785398);

// scale camera larger or smaller than DEFAULT_VIEW_RECTANGLE
Cesium.Camera.DEFAULT_VIEW_FACTOR = 0;

// default rectangle camera views on creation
Cesium.Camera.DEFAULT_VIEW_RECTANGLE = rectangle;

// default heading
// Cesium.Camera.DEFAULT_OFFSET = heading;

var viewer = new Cesium.Viewer('cesiumContainer', {timeline: false, animation: false, creditContainer: "credits", creditViewport: "credits" });
