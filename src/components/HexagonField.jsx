import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * Honeycomb field of extruded hexagons with varied Z-offset.
 * Slow drift + mouse parallax. Pure vanilla three (no R3F).
 */
export default function HexagonField({
  rows = 14,
  cols = 22,
  hexRadius = 0.55,
  depthRange = 0.45,
  baseOpacity = 0.55,
  faintMode = false,
}) {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const width = mount.clientWidth
    const height = mount.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, 0, 12)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    mount.appendChild(renderer.domElement)

    // Hex shape
    const hexShape = new THREE.Shape()
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i + Math.PI / 6
      const x = Math.cos(a) * hexRadius
      const y = Math.sin(a) * hexRadius
      if (i === 0) hexShape.moveTo(x, y)
      else hexShape.lineTo(x, y)
    }
    hexShape.closePath()

    const extrudeSettings = {
      depth: 0.15,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 2,
    }
    const baseGeo = new THREE.ExtrudeGeometry(hexShape, extrudeSettings)
    baseGeo.translate(0, 0, -0.075)

    const group = new THREE.Group()
    scene.add(group)

    const mat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.0,
      roughness: 0.55,
      transparent: true,
      opacity: baseOpacity,
    })

    // Place cells in pointy-top honeycomb tiling
    const horizSpacing = hexRadius * Math.sqrt(3)
    const vertSpacing = hexRadius * 1.5
    const meshes = []

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const offsetX = (r % 2 === 0 ? 0 : horizSpacing / 2)
        const x = (c - cols / 2) * horizSpacing + offsetX
        const y = (r - rows / 2) * vertSpacing
        const z = (Math.random() - 0.5) * 2 * depthRange

        const mesh = new THREE.Mesh(baseGeo, mat)
        mesh.position.set(x, y, z)
        mesh.userData = {
          baseZ: z,
          phase: Math.random() * Math.PI * 2,
          speed: 0.3 + Math.random() * 0.5,
        }
        mesh.castShadow = true
        mesh.receiveShadow = true
        group.add(mesh)
        meshes.push(mesh)
      }
    }

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.55)
    scene.add(ambient)

    const dir = new THREE.DirectionalLight(0xffffff, 0.9)
    dir.position.set(-4, 6, 5)
    dir.castShadow = true
    dir.shadow.mapSize.set(1024, 1024)
    dir.shadow.camera.near = 0.5
    dir.shadow.camera.far = 30
    dir.shadow.camera.left = -10
    dir.shadow.camera.right = 10
    dir.shadow.camera.top = 10
    dir.shadow.camera.bottom = -10
    scene.add(dir)

    // Tint light from orange side for warmth
    const warm = new THREE.PointLight(0xff8c50, 0.35, 18)
    warm.position.set(6, -3, 4)
    scene.add(warm)

    // Mouse / scroll parallax
    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }
    const onMouseMove = (e) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2
      target.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    const clock = new THREE.Clock()
    let rafId

    const animate = () => {
      const t = clock.getElapsedTime()
      current.x += (target.x - current.x) * 0.04
      current.y += (target.y - current.y) * 0.04

      group.rotation.y = t * 0.02 + current.x * 0.12
      group.rotation.x = -current.y * 0.08

      // Subtle Z breathing per cell
      for (const m of meshes) {
        const ud = m.userData
        m.position.z = ud.baseZ + Math.sin(t * ud.speed + ud.phase) * 0.08
      }

      renderer.render(scene, camera)
      rafId = requestAnimationFrame(animate)
    }
    animate()

    const onResize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      baseGeo.dispose()
      mat.dispose()
      renderer.dispose()
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
    }
  }, [rows, cols, hexRadius, depthRange, baseOpacity])

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="absolute inset-0"
      style={{
        pointerEvents: 'none',
        opacity: faintMode ? 0.18 : 1,
      }}
    />
  )
}
