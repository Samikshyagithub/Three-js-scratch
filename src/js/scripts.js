import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene(); //to create a scene to the viewer

const camera = new THREE.PerspectiveCamera( //camera's perspective of an object
  75, // camera's perspective is fine between 40 and 80.
  window.innerWidth / window.innerHeight,
  0.1, //near and far clipping plane
  1000
);
//orbit is defined to set the position of camera so that we can rotate our object with cursor.
const orbit = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(5); //automatic creates an axis
scene.add(axesHelper);
//our camera has only two axes while it should have three that is why we introduce the z position
camera.position.set(0, 2, 5);
orbit.update();

//now we create a box
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

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
