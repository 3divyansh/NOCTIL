import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshTransmissionMaterial } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import type { Mesh, Group } from 'three';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/SectionHeading';

function WatchModel() {
  const group = useRef<Group>(null);
  const ringRef = useRef<Mesh>(null);
  const handRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.25;
    const mx = state.pointer.x * 0.3;
    const my = state.pointer.y * 0.2;
    group.current.rotation.x = my;
    group.current.rotation.z = -mx * 0.3;

    if (ringRef.current) ringRef.current.rotation.z += delta * 0.4;
    if (handRef.current) handRef.current.rotation.z = state.clock.elapsedTime * 0.5;
  });

  return (
    <group ref={group} scale={1.4}>
      {/* Case body */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[1, 1, 0.35, 64]} />
        <meshStandardMaterial color="#e8dfd0" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Bezel */}
      <mesh position={[0, 0.18, 0]}>
        <torusGeometry args={[1, 0.06, 32, 64]} />
        <meshStandardMaterial color="#b08d4f" metalness={1} roughness={0.15} />
      </mesh>

      {/* Glass dome */}
      <mesh position={[0, 0.19, 0]} scale={1}>
        <sphereGeometry args={[0.95, 64, 32, 0, Math.PI * 2, 0, Math.PI / 3]} />
        <MeshTransmissionMaterial
          thickness={0.5}
          roughness={0}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.05}
          backside
        />
      </mesh>

      {/* Dial */}
      <mesh position={[0, 0.12, 0]}>
        <circleGeometry args={[0.88, 64]} />
        <meshStandardMaterial color="#faf8f3" metalness={0.3} roughness={0.5} />
      </mesh>

      {/* Hour markers */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const r = 0.74;
        return (
          <mesh key={i} position={[Math.cos(angle) * r, 0.16, Math.sin(angle) * r]}>
            <boxGeometry args={[0.04, 0.01, 0.08]} />
            <meshStandardMaterial color="#b08d4f" metalness={1} roughness={0.2} />
          </mesh>
        );
      })}

      {/* Hands */}
      <mesh ref={handRef} position={[0, 0.2, 0]}>
        <boxGeometry args={[0.04, 0.01, 0.5]} />
        <meshStandardMaterial color="#2b2820" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.2, 0]} rotation={[0, 0, Math.PI / 3]}>
        <boxGeometry args={[0.03, 0.01, 0.6]} />
        <meshStandardMaterial color="#2b2820" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Rotating tourbillon ring */}
      <mesh ref={ringRef} position={[0, 0.2, 0]}>
        <torusGeometry args={[0.28, 0.015, 16, 48]} />
        <meshStandardMaterial color="#b08d4f" metalness={1} roughness={0.2} />
      </mesh>

      {/* Crown */}
      <mesh position={[1.05, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 0.12, 32]} />
        <meshStandardMaterial color="#b08d4f" metalness={1} roughness={0.15} />
      </mesh>

      {/* Lugs */}
      {[[-0.7, 0.5], [0.7, 0.5], [-0.7, -0.5], [0.7, -0.5]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0, z]} rotation={[0, 0, x > 0 ? 0.3 : -0.3]}>
          <boxGeometry args={[0.15, 0.3, 0.15]} />
          <meshStandardMaterial color="#e8dfd0" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

export function Watch3DSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-champagne via-pearl to-ivory py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="The Caliber NT-01"
          title={
            <>
              Engineered in
              <br />
              <span className="italic text-gradient-gold">three dimensions.</span>
            </>
          }
          description="A flying tourbillon, hand-finished in our Geneva atelier. Rotate, examine, and explore every angle of the movement that powers the Obsidian."
        />

        <div className="relative mt-16 h-[60vh] min-h-[500px] w-full">
          {/* Ambient glow */}
          <div className="absolute left-1/2 top-1/2 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(176,141,79,0.1),transparent_70%)] blur-3xl" />

          <Canvas
            camera={{ position: [0, 1.5, 4], fov: 35 }}
            shadows
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
          >
            <ambientLight intensity={0.5} />
            <spotLight position={[5, 8, 5]} angle={0.3} intensity={1.5} castShadow penumbra={1} />
            <pointLight position={[-5, 2, -5]} intensity={0.8} color="#b08d4f" />
            <pointLight position={[5, -2, 3]} intensity={0.4} color="#ffffff" />
            <Suspense fallback={null}>
              <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.4}>
                <WatchModel />
              </Float>
              <Environment preset="studio" />
            </Suspense>
          </Canvas>

          {/* Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center"
          >
            <span className="text-[9px] tracking-luxe-sm uppercase text-ink-muted">
              Move your cursor to rotate
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
