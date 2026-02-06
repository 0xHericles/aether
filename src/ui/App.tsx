import React, { useEffect, useState, useRef, useMemo } from 'react';
import ForceGraph3D, { ForceGraphMethods } from 'react-force-graph-3d';
import * as THREE from 'three';

const App = () => {
  const [data, setData] = useState({ nodes: [], links: [] });
  const fgRef = useRef<ForceGraphMethods>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/map');
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Failed to fetch map:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Poll every 5s
    return () => clearInterval(interval);
  }, []);

  // Custom shader for nodes to make them look like neural pulses
  const nodeThreeObject = useMemo(() => (node: any) => {
    const geometry = new THREE.SphereGeometry(node.val / 2);
    const material = new THREE.MeshPhongMaterial({
      color: node.group === 1 ? 0x00f2ff : 0xff00ff,
      transparent: true,
      opacity: 0.8,
      emissive: node.group === 1 ? 0x00f2ff : 0xff00ff,
      emissiveIntensity: 0.5,
    });
    const sphere = new THREE.Mesh(geometry, material);
    
    // Add a glow ring
    const ringGeo = new THREE.RingGeometry(node.val / 2 + 0.5, node.val / 2 + 1, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: material.color,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.3
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    sphere.add(ring);

    return sphere;
  }, []);

  return (
    <ForceGraph3D
      ref={fgRef}
      graphData={data}
      backgroundColor="#000000"
      nodeLabel="label"
      nodeThreeObject={nodeThreeObject}
      nodeThreeObjectExtend={false}
      linkWidth={(link: any) => Math.sqrt(link.weight)}
      linkColor={() => '#00f2ff'}
      linkDirectionalParticles={2}
      linkDirectionalParticleSpeed={(link: any) => link.weight * 0.01}
      linkDirectionalParticleWidth={2}
      onNodeClick={(node: any) => {
        // Aim at node from outside
        const distance = 40;
        const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);

        fgRef.current?.cameraPosition(
          { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new pos
          node, // lookAt ({ x, y, z })
          3000  // ms transition duration
        );
      }}
    />
  );
};

export default App;
