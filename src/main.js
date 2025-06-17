import './style.css'

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Configurações padrões

// Criação da cena
const scene = new THREE.Scene()
// Criação da câmera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
// Criação do objeto
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#app')
})
// Definição do tamanho da janela
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight - 100)
// Posicionamento da câmera no centro da cena
camera.position.setZ(40)
// Renderiza tudo na tela
renderer.render(scene, camera)






// Cria um objeto principal (por enquanto é uma rosquinha)
const geometry = new THREE.TorusGeometry(10, 3, 16, 100)

// Cria um material para o objeto
// Wireframe: true para visualizar o objeto em formato de malha
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })

const material = new THREE.MeshStandardMaterial({ color: 0xff0000 })
// Cria um objeto Mesh com a geometria e o material
const torus = new THREE.Mesh(geometry, material)
// Adiciona o objeto à cena
scene.add(torus)







// Adiciona uma luz
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5, 5)

// Adiciona uma luz ambiente
const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

// Adiciona um helper para visualizar a luz
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)
scene.add(lightHelper, gridHelper)







// Criação de controle
// Possibilita o controle da câmera movendo o mouse
// Botão esquerdo movimenta se mantendo no mesmo eixo
// Botão direito movimenta o eixo
// A constante controls é adicionada no animate
// const controls = new OrbitControls(camera, renderer.domElement)







// Criando função que renderiza estrelas aleatórias na cena
function createStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24)
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff, opacity: 0.75 })
  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))
  star.position.set(x, y, z)
  scene.add(star)
}
// Cria 50 estrelas
// Automaticamente adiciona as estrelas na cena
Array(400).fill().forEach(createStar)






// Carrega texturas externas
const spaceTexture = new THREE.TextureLoader().load('public/space.jpg')
// Aplica a textura ao plano de fundo
scene.background = spaceTexture

// Carrega mais texturas externas
const trollfaceTexture = new THREE.TextureLoader().load('/public/trollface.png')

const trollface = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: trollfaceTexture })
)
trollface.position.set(2, 0, 0)
scene.add(trollface)





function moveCamera() {
  // Cria uma animação simples
  const top = document.body.getBoundingClientRect().top

  torus.rotation.x += 0.01
  torus.rotation.y += 0.005
  torus.rotation.z += 0.01

  trollface.rotation.y += 0.01
  trollface.rotation.z += 0.01
  trollface.rotation.x += 0.01

  camera.position.x = top * -0.0002
  camera.position.y = top * -0.0002
  camera.position.z = top * -0.01
}
document.body.onscroll = moveCamera



// Função para atualizar a cena
// Loop de animação infinito
function animate() {
  requestAnimationFrame(animate)

  // Rotação do objeto
  // Cria uma animação simples
  // torus.rotation.x += 0.001
  // torus.rotation.y += 0.005
  // torus.rotation.z += 0.001

  // Posicionamento da câmera
  // camera.position.x = Math.sin(Date.now() / 1000) * 30

  // Atualiza a posição da câmera com o movimento do mouse
  // controls.update()

  // Renderiza a cena
  renderer.render(scene, camera)
}
animate()