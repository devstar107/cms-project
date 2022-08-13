// based on https://github.com/mrdoob/three.js/blob/r108/examples/webgl_panorama_equirectangular.html

import * as THREE from 'three/build/three.module.js'

let camera, scene, renderer
let container
let material
let raf

const autoRotate = false

let isUserInteracting = false
let onMouseDownMouseX = 0
let onMouseDownMouseY = 0
let lon = 180
let onMouseDownLon = 0
let lat = -20
let onMouseDownLat = 0
let phi = 0
let theta = 0

export function init (elem, src, width, height, query_lat, query_lon) {
  let mesh

  container = elem
  camera = new THREE.PerspectiveCamera(
    75,
    container.offsetWidth / container.offsetHeight,
    1,
    1100
  )
  camera.target = new THREE.Vector3(0, 0, 0)

  scene = new THREE.Scene()

  const geometry = new THREE.SphereBufferGeometry(500, 120, 80)
  // invert the geometry on the x-axis so that all of the faces point inward
  geometry.scale(-1, 1, 1)

  const texture = new THREE.TextureLoader().load(src)
  texture.minFilter = THREE.LinearFilter // prevent "Texture has been resized" warnings
  material = new THREE.MeshBasicMaterial({ map: texture })

  mesh = new THREE.Mesh(geometry, material)

  scene.add(mesh)

  renderer = new THREE.WebGLRenderer({ alpha: true })
  renderer.setPixelRatio(window.devicePixelRatio * 4)
  setSize(container, width, height)
  container.appendChild(renderer.domElement)
  lat = parseFloat(query_lat || lat)
  lon = parseFloat(query_lon || lon)
  setCamera()
  controlsInit()
}

function controlsInit () {
  container.addEventListener('mousedown', onPointerStart, false)
  container.addEventListener('mousemove', onPointerMove, false)
  container.addEventListener('mouseup', onPointerUp, false)

  container.addEventListener('wheel', onDocumentMouseWheel, false)

  container.addEventListener('touchstart', onPointerStart, false)
  container.addEventListener('touchmove', onPointerMove, false)
  container.addEventListener('touchend', onPointerUp, false)

  //

  window.addEventListener('resize', onWindowResize, false)
}

function controlsDispose () {
  container.removeEventListener('mousedown', onPointerStart, false)
  container.removeEventListener('mousemove', onPointerMove, false)
  container.removeEventListener('mouseup', onPointerUp, false)

  container.removeEventListener('wheel', onDocumentMouseWheel, false)

  container.removeEventListener('touchstart', onPointerStart, false)
  container.removeEventListener('touchmove', onPointerMove, false)
  container.removeEventListener('touchend', onPointerUp, false)

  //

  window.removeEventListener('resize', onWindowResize, false)
}

function onWindowResize () {
  camera.aspect = container.offsetWidth / container.offsetHeight
  camera.updateProjectionMatrix()

  setSize(container)
}

function setSize (elem, width, height) {
  renderer.setSize(width || elem.offsetWidth, height || elem.offsetHeight)
}

function onPointerStart (event) {
  if (event.button && event.button > 1) {
    return
  } // prevent click "stuck down" from right click
  event.preventDefault() // prevent text selection

  isUserInteracting = true

  const clientX = event.clientX || event.touches[0].clientX
  const clientY = event.clientY || event.touches[0].clientY

  onMouseDownMouseX = clientX
  onMouseDownMouseY = clientY

  onMouseDownLon = lon
  onMouseDownLat = lat
}

function onPointerMove (event) {
  if (isUserInteracting === true) {
    const clientX = event.clientX || event.touches[0].clientX
    const clientY = event.clientY || event.touches[0].clientY

    lon = (onMouseDownMouseX - clientX) * 0.1 + onMouseDownLon
    lat = (clientY - onMouseDownMouseY) * 0.1 + onMouseDownLat
  }
}

function onPointerUp (e) {
  isUserInteracting = false
  const event = new CustomEvent('panoMoved', { detail: { lat, lon } })
  document.dispatchEvent(event)
}

function onDocumentMouseWheel (event) {
  event.preventDefault()

  const fov = camera.fov + event.deltaY * 0.05

  camera.fov = THREE.Math.clamp(fov, 10, 75)

  camera.updateProjectionMatrix()
}

export function animate () {
  raf = requestAnimationFrame(animate)
  update()
}

export function update () {
  if (autoRotate && isUserInteracting === false) {
    lon += 0.1
  }

  phi = THREE.Math.degToRad(90 - lat)
  theta = THREE.Math.degToRad(lon)

  camera.target.x = 500 * Math.sin(phi) * Math.cos(theta)
  camera.target.y = 500 * Math.cos(phi)
  camera.target.z = 500 * Math.sin(phi) * Math.sin(theta)

  camera.lookAt(camera.target)

  /*
  // distortion
  camera.position.copy( camera.target ).negate();
  */

  renderer.render(scene, camera)
}

export function setCamera (lat, lon) {
  lat = lat === undefined ? -12 : parseFloat(lat)
  lon = lon === undefined ? 180 : parseFloat(lon)
}

export function setTexture (src) {
  material.map.image.src = src
  material.map.needsUpdate = true
}

export function dispose () {
  renderer.dispose()
  renderer.forceContextLoss() // release GPU in Chrome

  controlsDispose()

  cancelAnimationFrame(raf) // end loop
  raf = undefined

  renderer.domElement.parentNode.removeChild(renderer.domElement)
}
