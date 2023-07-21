import * as THREE from "three";

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

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

camera.position.z = 5;
renderer.render(scene, camera); //render method from the rendere to pass the arguments i.e scene and camera
