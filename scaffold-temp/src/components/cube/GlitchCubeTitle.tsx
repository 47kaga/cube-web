"use client";

export function GlitchCubeTitle() {
  return (
    <span className="relative inline-block font-bold tracking-[0.2em] text-[#1a1a1a] dark:text-[#e8e8e8]">
      <span
        className="cube-glitch-text text-[#2d0a3d] dark:text-[#c9a0ff]"
        data-text="CUBE"
      >
        CUBE
      </span>
      <style jsx>{`
        .cube-glitch-text {
          position: relative;
          display: inline-block;
          animation: cube-wave 2.8s ease-in-out infinite,
            cube-flicker 4.2s steps(2, end) infinite;
        }
        .cube-glitch-text::before,
        .cube-glitch-text::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          opacity: 0.65;
          pointer-events: none;
        }
        .cube-glitch-text::before {
          color: #7a1020;
          transform: translate(-1px, 0);
          clip-path: inset(0 0 55% 0);
          animation: cube-jitter-a 0.35s infinite linear alternate;
        }
        .cube-glitch-text::after {
          color: #0d4d2a;
          transform: translate(1px, 0);
          clip-path: inset(45% 0 0 0);
          animation: cube-jitter-b 0.42s infinite linear alternate;
        }
        @keyframes cube-wave {
          0%,
          100% {
            transform: skewX(0deg) scaleY(1);
            filter: drop-shadow(0 0 0 transparent);
          }
          25% {
            transform: skewX(-2deg) scaleY(1.03);
            filter: drop-shadow(0 0 6px rgba(139, 92, 246, 0.45));
          }
          50% {
            transform: skewX(1.5deg) scaleY(0.98);
            filter: drop-shadow(0 0 10px rgba(139, 92, 246, 0.35));
          }
          75% {
            transform: skewX(-1deg) scaleY(1.02);
            filter: drop-shadow(0 0 4px rgba(220, 38, 38, 0.25));
          }
        }
        @keyframes cube-flicker {
          0%,
          95% {
            opacity: 1;
          }
          96% {
            opacity: 0.82;
          }
          97% {
            opacity: 1;
          }
          98% {
            opacity: 0.9;
          }
          100% {
            opacity: 1;
          }
        }
        @keyframes cube-jitter-a {
          0% {
            transform: translate(-1px, 0);
          }
          100% {
            transform: translate(1px, -1px);
          }
        }
        @keyframes cube-jitter-b {
          0% {
            transform: translate(1px, 0);
          }
          100% {
            transform: translate(-1px, 1px);
          }
        }
      `}</style>
    </span>
  );
}
