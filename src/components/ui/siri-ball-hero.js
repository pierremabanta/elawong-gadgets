'use client';

import React, { useRef, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import BrandsMarquee from '@/components/BrandsMarquee';

function SiriBallScene() {
  const mountRef = useRef(null);
  const lightRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;
    currentMount.appendChild(renderer.domElement);

    // Siri-like flowing colors: cyan, blue, purple, pink
    const colors = [
      new THREE.Color('#00d4ff'), // cyan
      new THREE.Color('#7b61ff'), // purple
      new THREE.Color('#ff6b9d'), // pink
      new THREE.Color('#00ff87'), // mint
    ];

    // Create a high-detail sphere with custom shader for Siri-like effect
    const geometry = new THREE.SphereGeometry(1.1, 128, 128);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pointLightPos: { value: new THREE.Vector3(0, 0, 5) },
        color1: { value: colors[0] },
        color2: { value: colors[1] },
        color3: { value: colors[2] },
        color4: { value: colors[3] },
        glowIntensity: { value: 0.6 },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv;
        uniform float time;

        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 pointLightPos;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        uniform vec3 color4;
        uniform float glowIntensity;

        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv;

        // Simple noise function for organic color flow
        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }

        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          float a = hash(i);
          float b = hash(i + vec2(1.0, 0.0));
          float c = hash(i + vec2(0.0, 1.0));
          float d = hash(i + vec2(1.0, 1.0));
          return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
        }

        void main() {
          vec3 normal = normalize(vNormal);
          vec3 viewDir = normalize(-vPosition);

          // Flowing pattern based on UV + time
          float speed = time * 0.15;
          vec2 uvFlow = vUv * 3.0 + vec2(speed * 0.7, speed * 0.5);
          float n1 = noise(uvFlow);
          float n2 = noise(vUv * 4.0 - vec2(speed * 0.3, speed * 0.6));
          float n3 = noise(vUv * 5.0 + vec2(speed * 0.5, speed * 0.2));

          // Blend colors based on noise
          vec3 c1 = mix(color1, color2, n1);
          vec3 c2 = mix(color3, color4, n2);
          vec3 baseColor = mix(c1, c2, n3);

          // Add some pink/purple variation
          float warm = noise(vUv * 2.0 + time * 0.1);
          baseColor = mix(baseColor, mix(color3, color4, warm), 0.3);

          // Lighting - diffuse
          vec3 lightDir = normalize(pointLightPos - vPosition);
          float diff = max(dot(normal, lightDir), 0.0);
          float ambient = 0.3;

          // Specular highlight
          vec3 halfDir = normalize(lightDir + viewDir);
          float spec = pow(max(dot(normal, halfDir), 0.0), 64.0);

          // Fresnel / rim glow
          float fresnel = 1.0 - max(dot(viewDir, normal), 0.0);
          fresnel = pow(fresnel, 3.0) * 0.8;

          // Combine
          vec3 litColor = baseColor * (ambient + diff * 0.7);
          litColor += vec3(1.0) * spec * 0.6;
          litColor += mix(color2, color4, 0.5) * fresnel * 1.2;

          // Internal glow pulsing
          float pulse = sin(time * 1.5 + vUv.y * 6.0 + vUv.x * 4.0) * 0.5 + 0.5;
          litColor += baseColor * pulse * 0.15;

          // Soft glow around edges
          float edgeGlow = pow(1.0 - abs(dot(normal, viewDir)), 4.0);
          litColor += mix(color1, color3, 0.5) * edgeGlow * glowIntensity;

          gl_FragColor = vec4(litColor, 0.95);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Outer glow sphere (larger, transparent, no lighting)
    const glowGeometry = new THREE.SphereGeometry(1.4, 48, 48);
    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: colors[0] },
        color2: { value: colors[2] },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec2 vUv;
        varying vec3 vViewDir;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vUv = uv;
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vViewDir = normalize(cameraPosition - worldPos.xyz);
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec3 vNormal;
        varying vec2 vUv;
        varying vec3 vViewDir;

        void main() {
          float fresnel = 1.0 - max(dot(vViewDir, vNormal), 0.0);
          fresnel = pow(fresnel, 3.0);
          vec3 glowColor = mix(color1, color2, sin(time * 0.3 + vUv.y * 2.0) * 0.5 + 0.5);
          float alpha = fresnel * 0.25;
          gl_FragColor = vec4(glowColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glowMesh);

    // Light source
    const pointLight = new THREE.PointLight(0xffffff, 2, 100);
    pointLight.position.set(0, 0, 5);
    lightRef.current = pointLight;
    scene.add(pointLight);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404060, 0.5);
    scene.add(ambientLight);

    let frameId;
    const animate = (t) => {
      const time = t * 0.001;
      material.uniforms.time.value = time;
      glowMaterial.uniforms.time.value = time;

      mesh.rotation.y += 0.002;
      mesh.rotation.x += 0.0005;
      glowMesh.rotation.y = mesh.rotation.y;
      glowMesh.rotation.x = mesh.rotation.x;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate(0);

    const handleResize = () => {
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      const vec = new THREE.Vector3(x, y, 0.5).unproject(camera);
      const dir = vec.sub(camera.position).normalize();
      const dist = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(dist));
      lightRef.current.position.copy(pos);
      material.uniforms.pointLightPos.value = pos;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      glowGeometry.dispose();
      glowMaterial.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full z-0" />;
}

export function SiriBallHero({
  title = 'Ela Wong Gadgets Shop',
  subtitle = 'Your Trusted Apple Partner in Marikina',
  description = 'Genuine Apple products with official warranty. From the latest iPhones to MacBooks, AirPods, and accessories.',
  ctaText = 'Shop Now',
  ctaLink = '/shop',
}) {
  return (
    <section
      role="banner"
      className="relative w-full min-h-screen bg-background text-foreground overflow-hidden"
    >
      <Suspense fallback={<div className="w-full h-full bg-background" />}>
        <SiriBallScene />
      </Suspense>

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent z-10" />

      <div className="relative z-20 flex flex-col items-center justify-end h-full pb-16 md:pb-24 text-center">
        <div className="max-w-3xl px-4">
          <div className="animate-fade-in-up inline-flex flex-col items-center mb-6">
            <span
              className="font-serif italic text-4xl sm:text-5xl md:text-6xl tracking-tight"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif", color: '#b8942c', lineHeight: 0.85 }}
            >
              Ela Wong
            </span>
            <span
              className="font-bold text-lg sm:text-xl md:text-2xl tracking-[0.2em] -mt-1"
              style={{ color: '#0a0a0a' }}
            >
              GADGETS SHOP
            </span>
            <span
              className="text-xs sm:text-sm italic mt-0.5"
              style={{ color: '#b8942c' }}
            >
              by Shannela Co.
            </span>
          </div>
          <p className="animate-fade-in-up-delay-1 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto mb-8">
            {description}
          </p>
          <div className="animate-fade-in-up-delay-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={ctaLink}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
            >
              {ctaText}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
            <a
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-border text-foreground text-sm font-medium rounded-lg hover:bg-accent/50 transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Brands conveyor belt */}
        <div className="mt-12 md:mt-16 w-full px-4">
          <BrandsMarquee />
        </div>
      </div>
    </section>
  );
}