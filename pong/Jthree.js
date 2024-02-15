import './style.css';
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as dat from 'dat.gui'
import { TextureLoader } from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
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
let velx = Math.random() / 5
if(Math.random() < 0.5){
  velx *= -1
}
let win = false
let velz = 0.2
// let velx = 0
// let velz = 0
let random = Math.random()
let player = 0
let enemy = 0
let defended = true
//objects

const standout_material = new THREE.MeshBasicMaterial({
  color:0xff0000,

})

const wall_material = new THREE.MeshMatcapMaterial({
  transparent:true,
  opacity:0.95,
  color: 0xc4dbff
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
const side1_mesh = new THREE.Mesh(side1_geometry,wall_material)
scene.add(side1_mesh)
side1_mesh.position.set(0,0.5,dimentions/2+0.5)

const side2_geometry = new THREE.BoxGeometry(dimentions,2,1)
const side2_mesh = new THREE.Mesh(side2_geometry,wall_material)
scene.add(side2_mesh)
side2_mesh.position.set(0,0.5,-dimentions/2-0.5)

const side3_geometry = new THREE.BoxGeometry(1,2,dimentions+2)
const side3_mesh = new THREE.Mesh(side3_geometry,wall_material)
scene.add(side3_mesh)
side3_mesh.position.set(-dimentions/2-0.5,0.5,0)

const side4_geometry = new THREE.BoxGeometry(1,2,dimentions+2)
const side4_mesh = new THREE.Mesh(side4_geometry,wall_material)
scene.add(side4_mesh)
side4_mesh.position.set(dimentions/2+0.5,0.5,0)


//ball
const ball_geometry = new THREE.BoxGeometry(1,1,1)
const ball_material = new THREE.MeshMatcapMaterial({
  color:0xff0000,
  transparent: true,
  opacity:0.95,
})
const ball_mesh = new THREE.Mesh(ball_geometry,ball_material)
scene.add(ball_mesh)

ball_mesh.position.set(0,1,0)

//paddle

const paddle_geometry = new THREE.BoxGeometry(4,1,1)

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



//fonts


const fontloader = new FontLoader()

fontloader.load('./fonts/Open Sans_Bold.json',function(font){
  console.log(font)
  const fontGeometry = new THREE.TextGeometry
})




document.addEventListener('keydown', function(event) {

  if(event.keyCode == 37) {
    if(player > -(dimentions/2)+4.5){
      player-=2
    } else{
      player -= (dimentions/2-2.5)+player
    }
  }
  else if(event.keyCode == 39) {
    if(player < dimentions/2-4.5){
      player+=2
    } else{
      player += ((dimentions/2-2.5)-player)
    }
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
      // console.log("you suck")
      velx = 0
      velz = 0
    }
    if(ballz < -((dimentions/2)-1)){
      console.log("you win")
      velx = 0
      velz = 0
      win = true
    }
    if(ballz > (dimentions/2)-2 && ballz < (dimentions/2)-1.5 && ballx>(player-2) && ballx < (player+2)){
      console.log("good")
      if(defended == true){
        velz *= -1.1
        velx += -.03*(player-ballx)
        defended = false
      }
    }
    if(-ballz > (dimentions/2)-2 && ballx>(enemy-2) && ballx < (enemy+2)){
      console.log("haha, defended")
      velz *= -1.1
      defended = true
    }
    ballx += velx
    ballz += velz
    ball_mesh.position.set(ballx,1,ballz)
    paddle_mesh.position.set(player,1,((dimentions/2)-0.5))
    if(enemy-2 > ballx){
      enemy -= 0.15
    } else if(enemy+2 < ballx){
      enemy += 0.15
    }
    enemy_mesh.position.set(enemy,1,-((dimentions/2)-0.5))

  }
  
  animate()

  //make ball bouncing better
  //make enemy better
  //make in blender enemy players and make the arrow keys hit real buttons with a n animation
  //finish making ball bounce better

  make the font work correctly
//make the other enemy better