import './style.css';
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as dat from 'dat.gui'
import { TextureLoader } from 'three';

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x1a1a1a)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000)
camera.position.set(0,40,0)
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
let velx = 0.12
let velz = 0.13
let random = Math.random()
let player = 0
let enemy = 0
//objects

const standout_material = new THREE.MeshBasicMaterial({
  color:0xff0000,

})



//floor
const bottom_geometry = new THREE.BoxGeometry(dimentions,1,dimentions)
const boundry_material = new THREE.MeshBasicMaterial({
  color:0xc4dbff
})
const bottom_mesh = new THREE.Mesh(bottom_geometry,boundry_material)
scene.add(bottom_mesh)

//walls
const side1_geometry = new THREE.BoxGeometry(dimentions,2,1)
const side1_mesh = new THREE.Mesh(side1_geometry,standout_material)
scene.add(side1_mesh)
side1_mesh.position.set(0,0.5,dimentions/2+0.5)
//ball
const ball_geometry = new THREE.BoxGeometry(1,1,1)
const ball_material = new THREE.MeshBasicMaterial({
  color:0xff0000,

})
const ball_mesh = new THREE.Mesh(ball_geometry,ball_material)
scene.add(ball_mesh)

ball_mesh.position.set(0,1,0)

//paddle

const paddle_geometry = new THREE.BoxGeometry(5,1,1)

const paddle_material = new THREE.MeshMatcapMaterial({
  transparent:true,
  opacity:0.95,
})
const paddle_mesh = new THREE.Mesh(paddle_geometry,paddle_material)
scene.add(paddle_mesh)
paddle_mesh.position.set(0,1,(dimentions/2)-0.5)

const enemy_mesh = new THREE.Mesh(paddle_geometry,paddle_material)
scene.add(enemy_mesh)
enemy_mesh.position.set(0,1,-((dimentions/2)-0.5))
document.addEventListener('keydown', function(event) {
  if(event.keyCode == 37) {
    player-=2
  }
  else if(event.keyCode == 39) {
player+=2
  }
});



function animate(){
    requestAnimationFrame(animate)
    renderer.render(scene,camera)
    controls.update();
    if(ballx > ((dimentions/2)-1) || ballx < -((dimentions/2)-1)){
      velx *= -1.1
    }

    if(ballz > ((dimentions/2)-0.5)){
      console.log("you suck")
      velx = 0
      velz = 0
    }
    if(ballz < -((dimentions/2)-1)){
      console.log("you win")
    }
    if(ballz > (dimentions/2)-2 && ballx>(player-2) && ballx < (player+2)){
      console.log("good")
      velz *= -1.1
    }
    if(-ballz > (dimentions/2)-2 && ballx>(enemy-2) && ballx < (enemy+2)){
      console.log("haha, defended")
      velz *= -1.1
    }
    ballx += velx
    ballz += velz
    ball_mesh.position.set(ballx,1,ballz)
    paddle_mesh.position.set(player,1,((dimentions/2)-0.5))
    enemy_mesh.position.set(ballx,1,-((dimentions/2)-0.5))
    enemy = ballx
  }
  
  animate()

  //make texures better
  //make ball bouncing better
  //make enemy better