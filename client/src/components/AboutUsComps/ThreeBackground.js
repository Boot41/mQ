import { useEffect } from "react";
import * as THREE from "three";
import { EffectComposer } from "postprocessing";
import { BlurPass } from "postprocessing";
import { RenderPass } from "postprocessing";
import { AnaglyphEffect } from "three/examples/jsm/effects/AnaglyphEffect.js";

const ThreeBackground = () => {
  useEffect(() => {
    let container, camera, scene, renderer, effect, composer;
    const spheres = [];
    let mouseX = 0;
    let mouseY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    function init() {
      // Create container and add it to the body
      container = document.createElement("div");
      container.style.position = "fixed";
      container.style.top = 0;
      container.style.left = 0;
      container.style.zIndex = "-1"; // Ensure it's behind your content
      document.body.appendChild(container);

      // Set up the camera
      camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.01,
        100
      );
      camera.position.z = 3;

      // Load the cube texture for the background
      const path = "textures/cube/pisa/";
      const format = ".png";
      const urls = [
        path + "px" + format,
        path + "nx" + format,
        path + "py" + format,
        path + "ny" + format,
        path + "pz" + format,
        path + "nz" + format,
      ];

      const textureCube = new THREE.CubeTextureLoader().load(urls);

      // Create the scene and set its background
      scene = new THREE.Scene();
      scene.background = textureCube;

      // Create the spheres with reflective surfaces and gradient color
      const geometry = new THREE.SphereGeometry(0.1, 32, 16);

      for (let i = 0; i < 500; i++) {
        // Create a color gradient for the spheres
        const color = new THREE.Color(`hsl(${(i / 500) * 360}, 100%, 50%)`);
        const material = new THREE.MeshStandardMaterial({
          color: color,
          metalness: 0.7, // Makes the spheres more metallic
          roughness: 0.2, // Controls the glossiness of the spheres
          envMap: textureCube,
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = Math.random() * 10 - 5;
        mesh.position.y = Math.random() * 10 - 5;
        mesh.position.z = Math.random() * 10 - 5;
        mesh.scale.set(
          Math.random() * 3 + 1,
          Math.random() * 3 + 1,
          Math.random() * 3 + 1
        );
        scene.add(mesh);
        spheres.push(mesh);
      }

      // Initialize the renderer
      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);

      // Initialize the anaglyph effect
      effect = new AnaglyphEffect(renderer);
      effect.setSize(window.innerWidth, window.innerHeight);

      // Initialize the effect composer for post-processing
      composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));

      // Add blur shader pass
      const blurPass = new BlurPass();
      composer.addPass(blurPass);

      // Add event listeners
      document.addEventListener("mousemove", onDocumentMouseMove);
      window.addEventListener("resize", onWindowResize);

      // Start the animation loop
      renderer.setAnimationLoop(animate);
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      effect.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    }

    function onDocumentMouseMove(event) {
      mouseX = (event.clientX - windowHalfX) / 100;
      mouseY = (event.clientY - windowHalfY) / 100;
    }

    function animate() {
      const timer = 0.0001 * Date.now();
      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      spheres.forEach((sphere, i) => {
        sphere.position.x = 5 * Math.cos(timer + i);
        sphere.position.y = 5 * Math.sin(timer + i * 1.1);
      });

      // Render the scene with post-processing
      composer.render();
    }

    init();

    // Clean up on unmount
    return () => {
      document.body.removeChild(container);
    };
  }, []);

  return null;
};

export default ThreeBackground;
