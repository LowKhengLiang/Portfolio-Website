import React, { useEffect, useRef } from 'react';

const Background = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let particles = [];
    const numParticles = Math.min(Math.floor((width * height) / 10000), 100);
    const maxDistance = 150;
    
    let mouse = { x: null, y: null };
    let scrollY = 0;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height * 2; // Spread across double height to allow scroll parallax
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 1.5 + 0.5;
        this.baseAlpha = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around horizontally
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;

        // Wrap around vertically within the expanded space
        if (this.y < 0) this.y = height * 2;
        if (this.y > height * 2) this.y = 0;
      }

      draw() {
        const renderY = this.y - scrollY * 0.3; // Parallax effect
        
        // Only draw if on screen
        if (renderY < -100 || renderY > height + 100) return;

        let alpha = this.baseAlpha;
        
        // Mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - renderY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            alpha = Math.min(alpha + (100 - dist) / 100, 1);
            this.radius += 0.05; // Slightly swell
            if(this.radius > 3) this.radius = 3;
          } else {
            this.radius = Math.max(this.radius - 0.05, 1);
          }
        }

        ctx.beginPath();
        ctx.arc(this.x, renderY, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 150, 255, ${alpha})`;
        ctx.fill();
        
        return { x: this.x, y: renderY };
      }
    }

    // Init
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Render lines between nodes
      const drawnParticles = [];
      particles.forEach(p => {
        p.update();
        const pos = p.draw();
        if(pos) {
            drawnParticles.push(pos);
        }
      });

      for (let i = 0; i < drawnParticles.length; i++) {
        for (let j = i + 1; j < drawnParticles.length; j++) {
          const dx = drawnParticles[i].x - drawnParticles[j].x;
          const dy = drawnParticles[i].y - drawnParticles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            let opacity = 1 - distance / maxDistance;
            
            // Brighten lines near mouse
            if (mouse.x !== null && mouse.y !== null) {
                const midX = (drawnParticles[i].x + drawnParticles[j].x) / 2;
                const midY = (drawnParticles[i].y + drawnParticles[j].y) / 2;
                const mdx = mouse.x - midX;
                const mdy = mouse.y - midY;
                const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
                if(mdist < 150) {
                    opacity = Math.min(opacity + 0.3, 1);
                }
            }

            ctx.beginPath();
            ctx.strokeStyle = `rgba(100, 150, 255, ${opacity * 0.3})`;
            ctx.lineWidth = 1;
            ctx.moveTo(drawnParticles[i].x, drawnParticles[i].y);
            ctx.lineTo(drawnParticles[j].x, drawnParticles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1] bg-transparent"
    />
  );
};

export default Background;
