import './style.css';
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as dat from 'dat.gui'
import { TextureLoader } from 'three';

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x1a1a1a)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000)
camera.position.set(0,5,0)
camera.lookAt(0,0,0)

const renderer = new THREE.WebGL1Renderer({
  alpha:true
})
const gui = new dat.GUI()
renderer.setSize(window.innerWidth,window.innerHeight)
document.body.appendChild(renderer.domElement)
const controls = new OrbitControls( camera, renderer.domElement );


//varibles

const dimentions = 50
let ballx = 0
let ballz = 0
let velx = 0.05
let velz = 0.05

//objects

//floor
const bottom_geometry = new THREE.BoxGeometry(dimentions,1,dimentions)
const bottom_material = new THREE.MeshBasicMaterial({
  color:0xc4dbff
})
const bottom_mesh = new THREE.Mesh(bottom_geometry,bottom_material)
scene.add(bottom_mesh)



//ball
const ball_geometry = new THREE.BoxGeometry(1,1,1)
const ball_material = new THREE.MeshBasicMaterial({
  color:0xff0000,

})
const ball_mesh = new THREE.Mesh(ball_geometry,ball_material)
scene.add(ball_mesh)

ball_mesh.position.set(0,1,0)

function animate(){
    requestAnimationFrame(animate)
    renderer.render(scene,camera)
    controls.update();
    console.log(`${ballx} > ${dimentions/2}`)
    console.log(ballx>dimentions/2)
    if(ballx > dimentions/2 || ballx < -dimentions/2){
      velx *= -1
    }
    ballx += velx
    ballz += velz
    ball_mesh.position.set(ballx,1,ballz)

  }
  
  animate()