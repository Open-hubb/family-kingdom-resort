import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function WavePlane() {
  const meshRef = useRef()
  const materialRef = useRef()

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColorDeep: { value: new THREE.Color('#0C2340') },
    uColorShallow: { value: new THREE.Color('#1a3a5c') },
    uColorFoam: { value: new THREE.Color('#C8A96E') },
  }), [])

  const vertexShader = `
    uniform float uTime;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      vUv = uv;
      vec3 pos = position;

      float wave1 = sin(pos.x * 1.2 + uTime * 0.6) * 0.25;
      float wave2 = sin(pos.x * 2.5 + pos.y * 1.5 + uTime * 0.8) * 0.12;
      float wave3 = cos(pos.y * 1.8 + uTime * 0.4) * 0.18;
      float wave4 = sin(pos.x * 0.5 + pos.y * 0.8 + uTime * 0.3) * 0.3;

      pos.z = wave1 + wave2 + wave3 + wave4;
      vElevation = pos.z;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `

  const fragmentShader = `
    uniform vec3 uColorDeep;
    uniform vec3 uColorShallow;
    uniform vec3 uColorFoam;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      float mixStrength = (vElevation + 0.3) * 1.2;
      mixStrength = clamp(mixStrength, 0.0, 1.0);

      vec3 color = mix(uColorDeep, uColorShallow, mixStrength);

      float foam = smoothstep(0.25, 0.45, vElevation);
      color = mix(color, uColorFoam, foam * 0.15);

      float edgeFade = smoothstep(0.0, 0.3, vUv.y) * smoothstep(1.0, 0.7, vUv.y);
      float alpha = edgeFade * 0.75;

      gl_FragColor = vec4(color, alpha);
    }
  `

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -2.5, -1]}>
      <planeGeometry args={[14, 10, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  )
}

function FloatingParticles() {
  const pointsRef = useRef()
  const count = 150

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4
    }
    return pos
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const arr = pointsRef.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += Math.sin(t * 0.3 + i) * 0.001
      arr[i * 3] += Math.cos(t * 0.2 + i * 0.5) * 0.0005
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#C8A96E"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

export default function Ocean() {
  return (
    <div className="absolute inset-0 z-[5]" style={{ pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 2, 5], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[2, 3, 4]} intensity={0.4} color="#C8A96E" />
        <WavePlane />
        <FloatingParticles />
      </Canvas>
    </div>
  )
}
