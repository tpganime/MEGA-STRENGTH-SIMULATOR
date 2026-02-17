
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Float, MeshDistortMaterial, Sphere } from '@react-three/drei';

const PlaceholderModel = () => {
  return (
    <group scale={1.5}>
      <mesh position={[0, 0, 0]}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#ff7b00" wireframe />
      </mesh>
      <Float speed={5} rotationIntensity={2} floatIntensity={2}>
        <Sphere args={[0.6, 32, 32]}>
          <MeshDistortMaterial
            color="#ff7b00"
            speed={4}
            distort={0.4}
            radius={1}
            emissive="#ff7b00"
            emissiveIntensity={0.5}
          />
        </Sphere>
      </Float>
      <mesh position={[1.2, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
        <capsuleGeometry args={[0.3, 1, 4, 8]} />
        <meshStandardMaterial color="#1d1d1f" />
      </mesh>
      <mesh position={[-1.2, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <capsuleGeometry args={[0.3, 1, 4, 8]} />
        <meshStandardMaterial color="#1d1d1f" />
      </mesh>
    </group>
  );
};

const ModelViewer3D: React.FC = () => {
  return (
    <div className="w-full h-[500px] md:h-[700px] relative liquid-glass overflow-hidden border-white/40 shadow-2xl group cursor-grab active:cursor-grabbing">
      <div className="absolute top-8 left-10 z-10">
        <h4 className="text-sm font-black text-[#ff7b00] uppercase tracking-[0.5em] mb-2">TITAN PREVIEW</h4>
        <p className="text-[10px] font-black text-[#86868b] uppercase tracking-widest">INTERACTIVE 3D CORE</p>
      </div>
      
      <div className="absolute bottom-8 right-10 z-10 text-right opacity-40 group-hover:opacity-100 transition-opacity">
        <p className="text-[9px] font-black text-[#1d1d1f] uppercase tracking-widest italic">DRAG TO ROTATE • SCROLL TO ZOOM</p>
      </div>

      <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.5} contactShadow={{ opacity: 0.4, blur: 2 }}>
            <PlaceholderModel />
          </Stage>
        </Suspense>
        <OrbitControls 
            enableZoom={true} 
            enablePan={false} 
            minDistance={3} 
            maxDistance={8}
            autoRotate
            autoRotateSpeed={0.5}
        />
      </Canvas>

      <div className="absolute inset-0 pointer-events-none border-[12px] border-white/5 rounded-[40px]"></div>
    </div>
  );
};

export default ModelViewer3D;
