import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function SpaceBackground() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200)
    camera.position.z = 14

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // ----- 1. Distant star particles -----
    const starGeo = new THREE.BufferGeometry()
    const STAR_COUNT = 1200
    const starPositions = new Float32Array(STAR_COUNT * 3)
    const starColors = new Float32Array(STAR_COUNT * 3)
    for (let i = 0; i < STAR_COUNT; i++) {
      const r = 30 + Math.random() * 60
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      starPositions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta)
      starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      starPositions[i * 3 + 2] = r * Math.cos(phi)
      const tint = Math.random()
      // warm gold-cream palette
      if (tint < 0.7) {
        starColors[i * 3 + 0] = 0.95
        starColors[i * 3 + 1] = 0.82
        starColors[i * 3 + 2] = 0.55
      } else if (tint < 0.9) {
        starColors[i * 3 + 0] = 0.85
        starColors[i * 3 + 1] = 0.65
        starColors[i * 3 + 2] = 0.35
      } else {
        starColors[i * 3 + 0] = 1.0
        starColors[i * 3 + 1] = 0.92
        starColors[i * 3 + 2] = 0.75
      }
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3))

    const starCanvas = document.createElement('canvas')
    starCanvas.width = 64
    starCanvas.height = 64
    const sctx = starCanvas.getContext('2d')
    const sgrad = sctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    sgrad.addColorStop(0, 'rgba(255,255,255,1)')
    sgrad.addColorStop(0.3, 'rgba(255,230,180,0.5)')
    sgrad.addColorStop(1, 'rgba(255,220,160,0)')
    sctx.fillStyle = sgrad
    sctx.fillRect(0, 0, 64, 64)
    const starTex = new THREE.CanvasTexture(starCanvas)

    const starMat = new THREE.PointsMaterial({
      size: 0.35,
      map: starTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })
    const stars = new THREE.Points(starGeo, starMat)
    scene.add(stars)

    // ----- 2. Floating glowing orbs at mid-depth -----
    const orbs = []
    const ORB_COUNT = 14
    const orbGeo = new THREE.SphereGeometry(1, 24, 24)
    for (let i = 0; i < ORB_COUNT; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0xc8a96e).lerp(new THREE.Color(0xe8d5a8), Math.random()),
        transparent: true,
        opacity: 0.08 + Math.random() * 0.12,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
      const orb = new THREE.Mesh(orbGeo, mat)
      const scale = 0.6 + Math.random() * 2.4
      orb.scale.setScalar(scale)
      orb.position.set(
        (Math.random() - 0.5) * 26,
        (Math.random() - 0.5) * 26,
        -8 - Math.random() * 14
      )
      orb.userData = {
        baseY: orb.position.y,
        baseX: orb.position.x,
        speed: 0.15 + Math.random() * 0.25,
        phase: Math.random() * Math.PI * 2,
        driftRadius: 0.8 + Math.random() * 1.4,
      }
      orbs.push(orb)
      scene.add(orb)
    }

    // ----- 3. Slow-rotating golden ring (subtle hero motif at depth) -----
    const ringGeo = new THREE.TorusGeometry(8, 0.015, 16, 200)
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xc8a96e,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
    })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.position.z = -18
    ring.rotation.x = Math.PI / 2.3
    scene.add(ring)

    // ----- Mouse / scroll parallax -----
    const target = { x: 0, y: 0, scroll: 0 }
    const current = { x: 0, y: 0, scroll: 0 }

    const onMouseMove = (e) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2
      target.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    const onScroll = () => {
      target.scroll = window.scrollY
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })

    const clock = new THREE.Clock()
    let rafId

    const animate = () => {
      const elapsed = clock.getElapsedTime()
      current.x += (target.x - current.x) * 0.04
      current.y += (target.y - current.y) * 0.04
      current.scroll += (target.scroll - current.scroll) * 0.06

      // Scene drifts gently with mouse + scroll
      scene.rotation.y = current.x * 0.08 + elapsed * 0.008
      scene.rotation.x = -current.y * 0.05
      scene.position.y = -current.scroll * 0.0008

      // Orbs gently float
      for (const orb of orbs) {
        const ud = orb.userData
        orb.position.y = ud.baseY + Math.sin(elapsed * ud.speed + ud.phase) * ud.driftRadius
        orb.position.x = ud.baseX + Math.cos(elapsed * ud.speed * 0.7 + ud.phase) * ud.driftRadius * 0.6
        orb.material.opacity = (0.08 + Math.sin(elapsed * 0.5 + ud.phase) * 0.04) * 1.4
      }

      // Stars slow rotation
      stars.rotation.y = elapsed * 0.008
      stars.rotation.x = elapsed * 0.005

      // Ring tilt
      ring.rotation.z = elapsed * 0.05

      renderer.render(scene, camera)
      rafId = requestAnimationFrame(animate)
    }
    animate()

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      starGeo.dispose()
      starMat.dispose()
      starTex.dispose()
      orbGeo.dispose()
      ringGeo.dispose()
      ringMat.dispose()
      orbs.forEach((o) => o.material.dispose())
      renderer.dispose()
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        background:
          'radial-gradient(ellipse at 30% 20%, rgba(232,213,168,0.35) 0%, transparent 50%), radial-gradient(ellipse at 75% 80%, rgba(200,169,110,0.22) 0%, transparent 55%), linear-gradient(180deg, #F5F1EB 0%, #EFE8DA 100%)',
      }}
    />
  )
}
