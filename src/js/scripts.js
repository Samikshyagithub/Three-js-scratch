import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

import image1 from "../image1.jpg";
import image2 from "../image2.jpg";
import image5 from "../image5.jpg";

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; //it is not automatically enabled so we have to render it to make it true to work with shadows.

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
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide, //since the plane gets diappeared from lower we need to first make it doubleside
}); //this the cover as in mesh as in shape
const plane = new THREE.Mesh(planeGeometry, planeMaterial); //this is part where we cover our geometry with material
scene.add(plane); //The plane should be displayed in the scene .
plane.rotation.x = -0.5 * Math.PI; //we also want the plane to rotate
plane.receiveShadow = true;
//adding a helper
const gridHelper = new THREE.GridHelper(30); //30 is the width or height
scene.add(gridHelper);

//moving forward to making a sphere
const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
const sphereMaterial = new THREE.MeshStandardMaterial({
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
sphere.castShadow = true;

//now we work to provide light
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight); //nothing happens becauseMeshBasicMaterial does not support light so change it to standard.

/*const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
scene.add(directionalLight); //this is important for shading of the object
directionalLight.position.set(-30, 50, 0);
directionalLight.castShadow = true;
directionalLight.shadow.camera.bottom = -12; //to cast shadow of the whole sphere we shifted the camera to buttom

const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(dLightHelper);

const dLightShadowHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera
);
scene.add(dLightShadowHelper); //the space formed by these is the only place where shadow can be formed through camera.*/

/*okay so its difficult to set the position but they
have built a library which we install using npm install dat.gui*/

const spotLight = new THREE.SpotLight(0xffffff);
spotLight.castShadow = true;
scene.add(spotLight);
spotLight.position.set(-100, 100, 0);
spotLight.angle = 0.2;

const sLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(sLightHelper);

//scene.fog = new THREE.FogExp2(0xffffff, 0.01); //disappears like fog when zoomed out

//renderer.setClearColor(0xff00ff); //to set the colour of the background or scene

//to set an image in the background
//first create an instance of the texture loader class and we need to call the load method
//on that instance and set the path name of the image as an argument and that will create a texture object
const textureLoader = new THREE.TextureLoader();
scene.background = textureLoader.load(image2);
//actually it is a cube containing each side the image we want
/*const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  image1,
  image1,
  image2,
  image2,
  image2,
  image2,
]);*/

const box2Geometry = new THREE.BoxGeometry(4, 4, 4);
const box2Material = new THREE.MeshBasicMaterial({
  //map: textureLoader.load(image1),
});
//what if we want different material and texture on different side of the cubes

const box2MultiMaterial = [
  new THREE.MeshBasicMaterial({ map: textureLoader.load(image1) }),
  new THREE.MeshBasicMaterial({ map: textureLoader.load(image2) }),
  new THREE.MeshBasicMaterial({ map: textureLoader.load(image1) }),
  new THREE.MeshBasicMaterial({ map: textureLoader.load(image2) }),
  new THREE.MeshBasicMaterial({ map: textureLoader.load(image1) }),
  new THREE.MeshBasicMaterial({ map: textureLoader.load(image2) }),
];
const box2 = new THREE.Mesh(box2Geometry, box2MultiMaterial);
scene.add(box2);
box2.position.set(0, 15, 10);
//box2.material.map = textureLoader.load(image1);

const gui = new dat.GUI();

const options = {
  sphereColor: "#ffea00", //we are setting color but to change it as we want.
  wireframe: false,
  speed: 0.01,
  angle: 0.2,
  penumbra: 0,
  intensity: 1, //you just need to define all your options you are using for gui.
};
//to add the colorpalette we have to set options as first argument and key of the element as second argument
//next is the onchange method in call back function in which we specify what has to be done every time we change the colour in the interface
gui.addColor(options, "sphereColor").onChange(function (e) {
  sphere.material.color.set(e); //color.set changes the colour of the sphere and variable e contains the colour code.
});

//there are other options too such as setting a colour palettee
gui.add(options, "wireframe").onChange(function (e) {
  sphere.material.wireframe = e; //okay this changes the colour of the sphere only when the check box is checked.
});
gui.add(options, "speed", 0, 0.1);
gui.add(options, "angle", 0, 1); //the min speed is 0 and max is 0.1 now we can control it whenever we want.
gui.add(options, "penumbra", 0, 1);
gui.add(options, "intensity", 0, 1);

let step = 0; //sphere bouncing
//whatever we want to animate it should be inside the animation

//we perform 5 radiation rotation on the box
//box.rotation.x=5;
//box.rotation.y=5;
//can be done but we need to rotate in some amount of time that is why we create a function animate
function animate(time) {
  box.rotation.x = time / 1000; //0.01 can be written but to make the code reusable and so that we can update time according to our will. ;
  box.rotation.y = time / 1000; //0.01 ;

  step += options.speed; //animation for bouncing the sphere
  sphere.position.y = 10 * Math.abs(Math.sin(step));

  spotLight.angle = options.angle;
  spotLight.penumbra = options.penumbra;
  spotLight.intensity = options.intensity;
  sLightHelper.update(); //everytime we change the values we have to update the helper

  renderer.render(scene, camera);
}
//if we want to control the time then we have to pass it as an argument.
//always remember to pass the arguments
renderer.setAnimationLoop(animate);

camera.position.z = 5;
renderer.render(scene, camera); //render method from the rendere to pass the arguments i.e scene and camera

//key notes
//webgl the value of the axis starts from neg 1 to positive 1
//values the top right corner coordinates are 19 20 and 0 the normalized values
//are 1 on the x axis and y on the y axis
//also original(480,0)
//Normalized:(-0.5,0)
