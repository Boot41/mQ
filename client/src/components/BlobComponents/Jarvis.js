import React, { useEffect, useRef, useMemo } from 'react';
import './Jarvis.css';

const Jarvis = ({ isRecording, isMinimized, isClosing, isSpeaking, playerRef, onClick ,playvideo}) => {
  const canvasRef = useRef(null);
  const offscreenCanvasRef = useRef(null);

  const particleColor = useMemo(() => 
    isRecording || isSpeaking ? 'rgba(235, 94, 52,' : 'rgba(0, 72, 255,',
  [isRecording, isSpeaking]);

  useEffect(() => {
    console.log('Particle color:', particleColor); // Debug log

    const canvas = canvasRef.current;
    const offscreenCanvas = offscreenCanvasRef.current;
    const context = canvas.getContext("2d");
    const offscreenContext = offscreenCanvas.getContext("2d");

    let sphereRad = 25;
    let radius_sp = 0.9;

    let displayWidth = canvas.width;
    let displayHeight = canvas.height;
    offscreenCanvas.width = displayWidth;
    offscreenCanvas.height = displayHeight;

    const particles = [];
    const maxParticles = 400;

    function initParticle(p) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);
      p.x = sphereRad * Math.sin(phi) * Math.cos(theta);
      p.y = sphereRad * Math.sin(phi) * Math.sin(theta);
      p.z = sphereRad * Math.cos(phi);
      p.velX = p.velY = p.velZ = 0;
      p.age = 0;
      p.dead = false;
    }

    function updateParticle(p, sinAngle, cosAngle) {
      p.age++;

      const rotX = cosAngle * p.x + sinAngle * p.z;
      const rotZ = -sinAngle * p.x + cosAngle * p.z;
      
      const m = radius_sp * 80 / (80 - rotZ);
      p.projX = rotX * m + displayWidth / 2;
      p.projY = p.y * m + displayHeight / 2;

      p.alpha = (1 - rotZ / 187.5);
      p.alpha = p.alpha > 1 ? 1 : (p.alpha < 0 ? 0 : p.alpha);

      if (p.projX > displayWidth || p.projX < 0 || 
          p.projY < 0 || p.projY > displayHeight || 
          rotZ > 78) {
        p.dead = true;
      }
    }

    function drawParticle(p, ctx) {
      ctx.fillStyle = particleColor + p.alpha + ")";
      ctx.beginPath();
      ctx.arc(p.projX, p.projY, 0.5, 0, 2 * Math.PI, false);
      ctx.closePath();
      ctx.fill();
    }

    function animate(timestamp) {
      offscreenContext.clearRect(0, 0, displayWidth, displayHeight);

      const turnAngle = (timestamp * 0.001) % (2 * Math.PI);
      const sinAngle = Math.sin(turnAngle);
      const cosAngle = Math.cos(turnAngle);

      // Add new particles
      while (particles.length < maxParticles) {
        particles.push({});
        initParticle(particles[particles.length - 1]);
      }

      // Update and draw particles
      particles.forEach((p, index) => {
        if (p.dead) {
          initParticle(p);
        }
        updateParticle(p, sinAngle, cosAngle);
        drawParticle(p, offscreenContext);
      });

      // Draw the offscreen canvas to the main canvas
      context.clearRect(0, 0, displayWidth, displayHeight);
      context.drawImage(offscreenCanvas, 0, 0);

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

    return () => {
      // Cleanup if necessary
    };
  }, [particleColor]);

  const containerStyle = {
    width: playvideo ? '60px' : '100px',
    height: playvideo ? '60px' : '100px',
    bottom: playvideo ? '420px' : '20px',
    right: playvideo ? '960px' : '20px',
    position: 'fixed',
    transition: 'all 0.5s ease-in-out',
    zIndex: 1002,
    cursor: 'pointer'
  };

  return (
    <div 
      id="JarvisHood" 
      className={isMinimized && !isClosing ? 'minimized' : ''} 
      style={containerStyle}
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