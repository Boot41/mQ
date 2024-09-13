import { useEffect, useRef, useState, useMemo } from 'react';
import './Jarvis.css';

const Jarvis = ({ isRecording, isMinimized, isClosing, isSpeaking, playerRef, onClick }) => {
  const canvasRef = useRef(null);
  const offscreenCanvasRef = useRef(null);

  const particleConfig = useMemo(() => ({
    count: 100,
    size: 0.5,
    maxSpeed: 0.025,
    minSpeed: 0.005,
    color: isRecording || isSpeaking ? [235, 94, 52] : [0, 72, 255],
    blurFactor: 0.5,
  }), [isRecording, isSpeaking]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const offscreenCanvas = offscreenCanvasRef.current;
    const context = canvas.getContext("2d");
    const offscreenContext = offscreenCanvas.getContext("2d");

    let sphereRad = 25; // Reduced sphere radius
    let radius_sp = 0.9;

    let displayWidth;
    let displayHeight;
    let wait;
    let count;
    let numToAddEachFrame;
    let particleList;
    let recycleBin;
    let particleAlpha;
    let r, g, b;
    let fLen;
    let m;
    let projCenterX;
    let projCenterY;
    let zMax;
    let turnAngle;
    let turnSpeed;
    let sphereCenterX, sphereCenterY, sphereCenterZ;
    let particleRad;
    let zeroAlphaDepth;
    let randAccelX, randAccelY, randAccelZ;
    let gravity;
    let rgbString;
    let animationFrameId;
    let lastFrameTime = 0;
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;

    function init() {
      wait = 1;
      count = wait - 1;
      numToAddEachFrame = 4; // Reduced particles added each frame

      if (isRecording || isSpeaking) {
        r = 235;
        g = 94;
        b = 52;
      } else {
        r = 0;
        g = 72;
        b = 255;
      }   

      rgbString = "rgba(" + r + "," + g + "," + b + ",";
      particleAlpha = 0.5; // Reduced overall particle opacity

      displayWidth = canvas.width;
      displayHeight = canvas.height;
      offscreenCanvas.width = displayWidth;
      offscreenCanvas.height = displayHeight;

      fLen = 80; // Reduced focal length
      projCenterX = displayWidth / 2;
      projCenterY = displayHeight / 2;

      zMax = fLen - 2;

      particleList = {};
      recycleBin = {};

      randAccelX = 0.1;
      randAccelY = 0.1;
      randAccelZ = 0.1;

      gravity = 0;

      particleRad = 0.5; // Smaller particle radius

      sphereCenterX = displayWidth / 2;
      sphereCenterY = displayHeight / 2;
      sphereCenterZ = -3 - sphereRad;

      zeroAlphaDepth = -187.5; // Adjusted depth

      turnSpeed = 2 * Math.PI / 1200;
      turnAngle = 0;

      animationFrameId = requestAnimationFrame(onTimer);
    }

    function onTimer(timestamp) {
      if (timestamp - lastFrameTime < frameInterval) {
        animationFrameId = requestAnimationFrame(onTimer);
        return;
      }
      lastFrameTime = timestamp;

      count++;
      if (count >= wait) {
        count = 0;
        for (let i = 0; i < numToAddEachFrame; i++) {
          let theta = Math.random() * 2 * Math.PI;
          let phi = Math.acos(Math.random() * 2 - 1);
          let x0 = sphereRad * Math.sin(phi) * Math.cos(theta);
          let y0 = sphereRad * Math.sin(phi) * Math.sin(theta);
          let z0 = sphereRad * Math.cos(phi);

          let p = addParticle(x0, y0, z0, 0, 0, 0);

          p.attack = 50;
          p.hold = 50;
          p.decay = 100;
          p.initValue = 0;
          p.holdValue = particleAlpha;
          p.lastValue = 0;

          p.stuckTime = 90 + Math.random() * 20;

          p.accelX = 0;
          p.accelY = gravity;
          p.accelZ = 0;
        }
      }

      turnAngle = (turnAngle + turnSpeed) % (2 * Math.PI);
      let sinAngle = Math.sin(turnAngle);
      let cosAngle = Math.cos(turnAngle);

      offscreenContext.clearRect(0, 0, displayWidth, displayHeight);

      let p = particleList.first;
      while (p != null) {
        let nextParticle = p.next;

        p.age++;

        if (p.age > p.stuckTime) {
          p.velX += p.accelX + randAccelX * (Math.random() * 2 - 1);
          p.velY += p.accelY + randAccelY * (Math.random() * 2 - 1);
          p.velZ += p.accelZ + randAccelZ * (Math.random() * 2 - 1);

          p.x += p.velX;
          p.y += p.velY;
          p.z += p.velZ;

          // Constrain particles within the sphere
          let dist = Math.sqrt(p.x * p.x + p.y * p.y + p.z * p.z);
          if (dist > sphereRad) {
            let scale = sphereRad / dist;
            p.x *= scale;
            p.y *= scale;
            p.z *= scale;

            // Reverse velocity components
            p.velX *= -0.5;
            p.velY *= -0.5;
            p.velZ *= -0.5;
          }
        }

        let rotX = cosAngle * p.x + sinAngle * p.z;
        let rotZ = -sinAngle * p.x + cosAngle * p.z;
        
        m = radius_sp * fLen / (fLen - rotZ);
        p.projX = rotX * m + projCenterX;
        p.projY = p.y * m + projCenterY;

        if (p.age < p.attack + p.hold + p.decay) {
          if (p.age < p.attack) {
            p.alpha = (p.holdValue - p.initValue) / p.attack * p.age + p.initValue;
          } else if (p.age < p.attack + p.hold) {
            p.alpha = p.holdValue;
          } else if (p.age < p.attack + p.hold + p.decay) {
            p.alpha = (p.lastValue - p.holdValue) / p.decay * (p.age - p.attack - p.hold) + p.holdValue;
          }
        } else {
          p.dead = true;
        }

        if ((p.projX > displayWidth) || (p.projX < 0) || (p.projY < 0) || (p.projY > displayHeight) || (rotZ > zMax)) {
          recycle(p);
        } else {
          let depthAlphaFactor = (1 - rotZ / zeroAlphaDepth);
          depthAlphaFactor = (depthAlphaFactor > 1) ? 1 : ((depthAlphaFactor < 0) ? 0 : depthAlphaFactor);
          offscreenContext.fillStyle = rgbString + depthAlphaFactor * p.alpha + ")";

          offscreenContext.beginPath();
          offscreenContext.arc(p.projX, p.projY, m * particleRad, 0, 2 * Math.PI, false);
          offscreenContext.closePath();
          offscreenContext.fill();
        }

        p = nextParticle;
      }

      // Draw the offscreen canvas to the main canvas
      context.clearRect(0, 0, displayWidth, displayHeight);
      context.drawImage(offscreenCanvas, 0, 0);

      animationFrameId = requestAnimationFrame(onTimer);
    }

    function addParticle(x0, y0, z0, vx0, vy0, vz0) {
      let newParticle;

      if (recycleBin.first != null) {
        newParticle = recycleBin.first;
        if (newParticle.next != null) {
          recycleBin.first = newParticle.next;
          newParticle.next.prev = null;
        } else {
          recycleBin.first = null;
        }
      } else {
        newParticle = {};
      }

      if (particleList.first == null) {
        particleList.first = newParticle;
        newParticle.prev = null;
        newParticle.next = null;
      } else {
        newParticle.next = particleList.first;
        particleList.first.prev = newParticle;
        particleList.first = newParticle;
        newParticle.prev = null;
      }

      newParticle.x = x0;
      newParticle.y = y0;
      newParticle.z = z0;
      newParticle.velX = vx0;
      newParticle.velY = vy0;
      newParticle.velZ = vz0;
      newParticle.age = 0;
      newParticle.dead = false;
      return newParticle;
    }

    function recycle(p) {
      if (particleList.first === p) {
        if (p.next != null) {
          p.next.prev = null;
          particleList.first = p.next;
        } else {
          particleList.first = null;
        }
      } else {
        if (p.next == null) {
          p.prev.next = null;
        } else {
          p.prev.next = p.next;
          p.next.prev = p.prev;
        }
      }
      if (recycleBin.first == null) {
        recycleBin.first = p;
        p.prev = null;
        p.next = null;
      } else {
        p.next = recycleBin.first;
        recycleBin.first.prev = p;
        recycleBin.first = p;
        p.prev = null;
      }
    }

    init();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isRecording,isSpeaking]);

  return (
    <div 
      id="JarvisHood" 
      className={isMinimized && !isClosing ? 'minimized' : ''} 
      style={{
        width: '100px', 
        height: '100px', 
        position: 'fixed',
        transition: 'all 0.5s ease-in-out',
        bottom: '20px',
        right: '20px',
        zIndex: 1002,
        cursor: 'pointer'
      }}
      onClick={onClick}
    >
      <canvas 
        ref={canvasRef} 
        width="100" 
        height="100" 
        style={{
          position: 'absolute',
          zIndex: 1,
          top: '0',
          left: '0',
          width: '100%',
          height: '100%'
        }}
      />
      <canvas 
        ref={offscreenCanvasRef} 
        style={{ display: 'none' }} 
      />
      <div className={`square ${isRecording || isSpeaking ? 'recording' : ''}`}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Jarvis;