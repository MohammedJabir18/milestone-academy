
import React, { useEffect, useRef } from 'react';

const BackgroundAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle system
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = `rgba(0, ${Math.floor(Math.random() * 100) + 150}, ${Math.floor(Math.random() * 50) + 30}, ${Math.random() * 0.1 + 0.05})`;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) {
          this.speedX *= -1;
        }
        
        if (this.y > canvas.height || this.y < 0) {
          this.speedY *= -1;
        }
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Create grid lines
    class GridLine {
      x: number;
      y: number;
      length: number;
      vertical: boolean;
      color: string;
      opacity: number;
      speed: number;
      
      constructor(vertical: boolean) {
        this.vertical = vertical;
        if (vertical) {
          this.x = Math.random() * canvas.width;
          this.y = 0;
          this.length = canvas.height;
        } else {
          this.x = 0;
          this.y = Math.random() * canvas.height;
          this.length = canvas.width;
        }
        this.color = '#00C853';
        this.opacity = Math.random() * 0.07 + 0.01;
        this.speed = Math.random() * 0.2 + 0.1;
      }
      
      update() {
        if (this.vertical) {
          this.x += this.speed;
          if (this.x > canvas.width) {
            this.x = 0;
            this.opacity = Math.random() * 0.07 + 0.01;
          }
        } else {
          this.y += this.speed;
          if (this.y > canvas.height) {
            this.y = 0;
            this.opacity = Math.random() * 0.07 + 0.01;
          }
        }
      }
      
      draw() {
        ctx.strokeStyle = `rgba(0, 200, 83, ${this.opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        if (this.vertical) {
          ctx.moveTo(this.x, 0);
          ctx.lineTo(this.x, this.length);
        } else {
          ctx.moveTo(0, this.y);
          ctx.lineTo(this.length, this.y);
        }
        ctx.stroke();
      }
    }
    
    // Create candlestick pattern
    class Candlestick {
      x: number;
      y: number;
      width: number;
      height: number;
      isGreen: boolean;
      opacity: number;
      speed: number;
      
      constructor() {
        this.width = Math.random() * 10 + 3;
        this.height = Math.random() * 40 + 10;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.isGreen = Math.random() > 0.5;
        this.opacity = Math.random() * 0.1 + 0.05;
        this.speed = Math.random() * 0.5 + 0.1;
      }
      
      update() {
        this.y -= this.speed;
        this.opacity -= 0.0005;
        
        if (this.y < -this.height || this.opacity <= 0) {
          this.y = canvas.height;
          this.x = Math.random() * (canvas.width - this.width);
          this.isGreen = Math.random() > 0.5;
          this.height = Math.random() * 40 + 10;
          this.opacity = Math.random() * 0.1 + 0.05;
        }
      }
      
      draw() {
        const color = this.isGreen ? `rgba(0, 200, 83, ${this.opacity})` : `rgba(255, 70, 70, ${this.opacity})`;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Wick
        const wickX = this.x + this.width / 2;
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(wickX, this.y - this.height * 0.3);
        ctx.lineTo(wickX, this.y + this.height + this.height * 0.3);
        ctx.stroke();
      }
    }
    
    // Create wave animation
    class Wave {
      points: { x: number, y: number }[];
      amplitude: number;
      frequency: number;
      speed: number;
      color: string;
      
      constructor(yPosition: number) {
        this.points = [];
        this.amplitude = Math.random() * 20 + 10;
        this.frequency = Math.random() * 0.01 + 0.005;
        this.speed = Math.random() * 0.05 + 0.01;
        this.color = `rgba(0, ${Math.floor(Math.random() * 100) + 150}, ${Math.floor(Math.random() * 50) + 30}, ${Math.random() * 0.1 + 0.02})`;
        
        // Initialize points
        for (let x = 0; x <= canvas.width; x += 5) {
          this.points.push({
            x,
            y: yPosition + Math.sin(x * this.frequency) * this.amplitude
          });
        }
      }
      
      update() {
        this.points.forEach(point => {
          point.y = point.y + Math.sin(point.x * this.frequency + Date.now() * this.speed) * 0.1;
        });
      }
      
      draw() {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        this.points.forEach((point, index) => {
          if (index === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        });
        ctx.stroke();
      }
    }
    
    // Initialize particles, grid lines, candlesticks, and waves
    const particles: Particle[] = [];
    for (let i = 0; i < 100; i++) {
      particles.push(new Particle());
    }
    
    const gridLines: GridLine[] = [];
    for (let i = 0; i < 10; i++) {
      gridLines.push(new GridLine(true));
      gridLines.push(new GridLine(false));
    }
    
    const candlesticks: Candlestick[] = [];
    for (let i = 0; i < 15; i++) {
      candlesticks.push(new Candlestick());
    }
    
    const waves: Wave[] = [];
    for (let i = 1; i <= 5; i++) {
      waves.push(new Wave(canvas.height * (i / 6)));
    }
    
    // Animation loop
    const animate = () => {
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0D0D0D');
      gradient.addColorStop(1, '#121212');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw waves
      waves.forEach(wave => {
        wave.update();
        wave.draw();
      });
      
      // Update and draw grid lines
      gridLines.forEach(line => {
        line.update();
        line.draw();
      });
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Update and draw candlesticks
      candlesticks.forEach(candlestick => {
        candlestick.update();
        candlestick.draw();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default BackgroundAnimation;
