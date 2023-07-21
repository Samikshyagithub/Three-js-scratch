import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene(); //to create a scene to the viewer

const camera = new THREE.PerspectiveCamera( //camera's perspective of an object
  45, // camera's perspective is fine between 40 and 80.
  window.innerWidth / window.innerHeight,
  0.1, //near and far clipping plane
  1000
);
//orbit is defined to set the position of camera so that we can rotate our object with cursor.
const orbit = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(5); //automatic creates an axis
scene.add(axesHelper);
//our camera has only two axes while it should have three that is why we introduce the z position
camera.position.set(-10, 30, 30);
orbit.update();

//now we create a box
//In three js we first need the geometry then the material and finally we cover up the geometry with our material.
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial); //fusion of geometry and material (mesh can be cube or character)
scene.add(box);

//creating a plane with const passing width and height as parameters
const planeGeometry = new THREE.PlaneGeometry(30, 30); //this is a geometry
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide, //since the plane gets diappeared from lower we need to first make it doubleside
}); //this the cover as in mesh as in shape
const plane = new THREE.Mesh(planeGeometry, planeMaterial); //this is part where we cover our geometry with material
scene.add(plane); //The plane should be displayed in the scene .
plane.rotation.x = -0.5 * Math.PI; //we also want the plane to rotate

//adding a helper
const gridHelper = new THREE.GridHelper(30); //30 is the width or height
scene.add(gridHelper);

//moving forward to making a sphere
const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
const sphereMaterial = new THREE.MeshBasicMaterial({
  //There are other mesh materials too'
  //MeshStandardMaterial(These needs light to show up.)
  //MeshLambertMaterial

  color: 0x0000ff,
  wireframe: true, //the shape of the sphere will not look good until and unless we set the wireframe to true
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
//position of the sphere
sphere.position.set(-10, 10, 0);

/*okay so its difficult to set the position but they
have built a library which we install using npm install dat.gui*/

const gui = new dat.GUI();

const options = {
  sphereColor: "#ffea00", //we are setting color but to chamge it as we want.
};
//to add the colorpalatte we have to set options as first argument and key of the element as second argument
//next is the onchange method in call back function in which we specify what has to be done every time we change the colour in the interface
gui.addColor(options, "sphereColor").onChange(function (e) {
  sphere.material.color.set(e); //color.set changes the colour of the sphere and variable e contains the colour code.
});

//we perform 5 radiation rotation on the box
//box.rotation.x=5;
//box.rotation.y=5;
//can be done but we need to rotate in some amount of time that is why we create a function animate
function animate(time) {
  box.rotation.x = time / 1000; //0.01 can be written but to make the code reusable and so that we can update time according to our will. ;
  box.rotation.y = time / 1000; //0.01 ;
  renderer.render(scene, camera);
}
//if we want to control the time then we have to pass it as an argument.
//always remember to pass the arguments
renderer.setAnimationLoop(animate);

camera.position.z = 5;
renderer.render(scene, camera); //render method from the rendere to pass the arguments i.e scene and camera
