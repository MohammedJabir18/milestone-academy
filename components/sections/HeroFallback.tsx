import React from "react";

export default function HeroFallback() {
  return (
    <div className="relative h-full w-full flex items-center justify-center overflow-hidden bg-transparent">
      {/* Abstract Glowing Orbs */}
      <div 
        className="absolute w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full mix-blend-multiply opacity-50 blur-[80px]"
        style={{ 
          background: "var(--green-300)", 
          top: "10%", 
          right: "10%",
          animation: "float-orb 8s ease-in-out infinite alternate" 
        }}
      />
      <div 
        className="absolute w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] rounded-full mix-blend-multiply opacity-40 blur-[70px]"
        style={{ 
          background: "var(--green-200)", 
          bottom: "10%", 
          left: "20%",
          animation: "float-orb 10s ease-in-out infinite alternate-reverse" 
        }}
      />

      {/* Premium Glass Morphism Core */}
      <div 
        className="relative z-10 flex h-[320px] w-[320px] lg:h-[400px] lg:w-[400px] flex-col items-center justify-center overflow-hidden rounded-[2.5rem]"
        style={{
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 100%)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          boxShadow: "0 30px 60px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
          animation: "glass-float 6s ease-in-out infinite"
        }}
      >
        {/* Shimmer Effect */}
        <div 
          className="absolute inset-0 z-0 h-full w-full"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
            transform: "skewX(-20deg) translateX(-150%)",
            animation: "shimmer 4s ease-in-out infinite"
          }}
        />

        {/* Inner Geometric Elements */}
        <div 
          className="relative z-10 mb-8 h-28 w-28 rounded-full border border-white/60 shadow-inner"
          style={{
            background: "linear-gradient(135deg, var(--green-400) 0%, var(--green-600) 100%)",
            animation: "pulse-glow 4s ease-in-out infinite"
          }}
        />
        
        <div className="flex flex-col gap-3">
          <div className="h-2 w-32 rounded-full bg-white/40" />
          <div className="h-2 w-20 rounded-full bg-white/40" />
        </div>
      </div>

      <style>{`
        @keyframes float-orb {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(30px, -40px) scale(1.1); }
        }
        @keyframes glass-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes shimmer {
          0%, 40% { transform: skewX(-20deg) translateX(-150%); }
          100% { transform: skewX(-20deg) translateX(200%); }
        }
        @keyframes pulse-glow {
          0%, 100% { transform: scale(1); opacity: 0.8; box-shadow: 0 0 20px var(--green-300); }
          50% { transform: scale(1.05); opacity: 1; box-shadow: 0 0 40px var(--green-400); }
        }
      `}</style>
    </div>
  );
}
