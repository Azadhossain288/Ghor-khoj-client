export default function WaveBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-primary">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <path
          d="M0 620 C 240 560, 480 700, 720 640 S 1200 560, 1440 620 V900 H0 Z"
          fill="#1B2436"
          opacity="0.6"
        />
        <path
          d="M0 700 C 260 650, 520 760, 780 700 S 1220 650, 1440 700 V900 H0 Z"
          fill="#212B42"
          opacity="0.5"
        />
        <path
          d="M0 120 C 300 60, 600 180, 900 110 S 1300 40, 1440 100"
          stroke="#D7F32C"
          strokeOpacity="0.12"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M0 220 C 320 160, 640 280, 960 210 S 1300 140, 1440 200"
          stroke="#94A3B8"
          strokeOpacity="0.12"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M0 320 C 300 260, 700 380, 1000 300 S 1300 240, 1440 300"
          stroke="#94A3B8"
          strokeOpacity="0.08"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    </div>
  );
}