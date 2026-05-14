import Button from "../components/ui/Button"
import { useNavigate } from "react-router-dom";

export default function NotFound() {

  const navigate = useNavigate();

  return (
    <div style={styles.root}>
      <style>{`
        

        @keyframes flyPlane {
          0%   { transform: translateX(-180px) translateY(0px); }
          20%  { transform: translateX(15vw) translateY(-18px); }
          40%  { transform: translateX(35vw) translateY(10px); }
          60%  { transform: translateX(55vw) translateY(-8px); }
          80%  { transform: translateX(75vw) translateY(14px); }
          100% { transform: translateX(calc(100vw + 180px)) translateY(-4px); }
        }

        @keyframes trailFade {
          0%   { opacity: 0.7; }
          100% { opacity: 0; }
        }

        @keyframes cloudDrift1 {
          0%   { transform: translateX(0); }
          100% { transform: translateX(18px); }
        }
        @keyframes cloudDrift2 {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-14px); }
        }
        @keyframes cloudDrift3 {
          0%   { transform: translateX(0); }
          100% { transform: translateX(22px); }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .plane-wrap {
          position: absolute;
          top: 28%;
          left: 0;
          animation: flyPlane 9s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          display: flex;
          align-items: center;
          pointer-events: none;
        }

        .content-block {
          animation: fadeUp 1s ease 0.3s both;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(14,6,55,0.45) !important;
        }
        .btn-secondary:hover {
          background: rgba(255,255,255,0.18) !important;
        }
      `}</style>

      {/* ── Clouds – back layer (large, faint) ── */}
      <svg style={{ ...styles.cloudBase, top: "12%", left: "4%", opacity: 0.18, animation: "cloudDrift2 8s ease-in-out infinite alternate" }} viewBox="0 0 260 90" width="260" aria-hidden="true">
        <ellipse cx="130" cy="62" rx="120" ry="28" fill="white" />
        <ellipse cx="80" cy="48" rx="62" ry="36" fill="white" />
        <ellipse cx="160" cy="44" rx="72" ry="40" fill="white" />
        <ellipse cx="220" cy="58" rx="42" ry="24" fill="white" />
      </svg>

      <svg style={{ ...styles.cloudBase, top: "8%", right: "2%", opacity: 0.14, animation: "cloudDrift1 10s ease-in-out infinite alternate" }} viewBox="0 0 320 100" width="320" aria-hidden="true">
        <ellipse cx="160" cy="70" rx="148" ry="30" fill="white" />
        <ellipse cx="100" cy="54" rx="76" ry="42" fill="white" />
        <ellipse cx="200" cy="50" rx="86" ry="46" fill="white" />
        <ellipse cx="280" cy="66" rx="48" ry="0" fill="white" />
      </svg>

      {/* ── Clouds – mid layer ── */}
      <svg style={{ ...styles.cloudBase, top: "22%", left: "18%", opacity: 0.28, animation: "cloudDrift1 7s ease-in-out infinite alternate" }} viewBox="0 0 200 80" width="200" aria-hidden="true">
        <ellipse cx="100" cy="56" rx="92" ry="24" fill="white" />
        <ellipse cx="60" cy="42" rx="52" ry="32" fill="white" />
        <ellipse cx="130" cy="38" rx="58" ry="34" fill="white" />
      </svg>

      <svg style={{ ...styles.cloudBase, top: "18%", right: "22%", opacity: 0.32, animation: "cloudDrift2 9s ease-in-out infinite alternate" }} viewBox="0 0 180 70" width="180" aria-hidden="true">
        <ellipse cx="90" cy="50" rx="82" ry="22" fill="white" />
        <ellipse cx="55" cy="36" rx="48" ry="30" fill="white" />
        <ellipse cx="120" cy="32" rx="52" ry="32" fill="white" />
      </svg>

      <svg style={{ ...styles.cloudBase, top: "36%", left: "2%", opacity: 0.22, animation: "cloudDrift3 11s ease-in-out infinite alternate" }} viewBox="0 0 150 60" width="150" aria-hidden="true">
        <ellipse cx="75" cy="44" rx="68" ry="18" fill="white" />
        <ellipse cx="45" cy="32" rx="40" ry="26" fill="white" />
        <ellipse cx="100" cy="30" rx="44" ry="28" fill="white" />
      </svg>

      {/* ── Clouds – front layer (crisp, brighter) ── */}
      <svg style={{ ...styles.cloudBase, bottom: "30%", left: "8%", opacity: 0.45, animation: "cloudDrift1 6s ease-in-out infinite alternate" }} viewBox="0 0 220 80" width="220" aria-hidden="true">
        <ellipse cx="110" cy="58" rx="102" ry="22" fill="white" />
        <ellipse cx="68" cy="44" rx="56" ry="34" fill="white" />
        <ellipse cx="148" cy="40" rx="64" ry="38" fill="white" />
        <ellipse cx="196" cy="56" rx="32" ry="0" fill="white" />
      </svg>

      <svg style={{ ...styles.cloudBase, bottom: "24%", right: "5%", opacity: 0.5, animation: "cloudDrift2 7s ease-in-out infinite alternate" }} viewBox="0 0 280 90" width="280" aria-hidden="true">
        <ellipse cx="140" cy="64" rx="130" ry="26" fill="white" />
        <ellipse cx="88" cy="48" rx="68" ry="40" fill="white" />
        <ellipse cx="182" cy="44" rx="78" ry="44" fill="white" />
        <ellipse cx="248" cy="60" rx="0" ry="22" fill="white" />
      </svg>

      <svg style={{ ...styles.cloudBase, bottom: "38%", right: "30%", opacity: 0.35, animation: "cloudDrift3 8s ease-in-out infinite alternate" }} viewBox="0 0 160 65" width="160" aria-hidden="true">
        <ellipse cx="80" cy="48" rx="74" ry="20" fill="white" />
        <ellipse cx="50" cy="34" rx="46" ry="30" fill="white" />
        <ellipse cx="108" cy="30" rx="50" ry="32" fill="white" />
      </svg>

      {/* ── Airplane with contrail ── */}
      <div className="plane-wrap">
        {/* Contrail */}
        <svg
          style={{ position: "absolute", right: "100%", top: "50%", transform: "translateY(-50%)" }}
          viewBox="0 0 220 20"
          width="220"
          height="20"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="trailGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="100%" stopColor="white" stopOpacity="0.65" />
            </linearGradient>
          </defs>
          <rect x="0" y="8" width="220" height="2.5" rx="1.5" fill="url(#trailGrad)" />
          <rect x="0" y="11" width="180" height="1.5" rx="1" fill="url(#trailGrad)" opacity="0.4" />
        </svg>

        {/* Airplane SVG */}
        <svg
          viewBox="0 0 120 60"
          width="110"
          height="55"
          aria-label="Airplane"
        >
          {/* Fuselage */}
          <ellipse cx="62" cy="30" rx="46" ry="10" fill="white" />
          <ellipse cx="100" cy="30" rx="16" ry="7" fill="#e8f4ff" />

          {/* Nose */}
          <path d="M106 30 Q122 30 114 26 Q108 24 106 30Z" fill="white" />

          {/* Main wing */}
          <path d="M70 29 L50 10 L38 12 L55 29Z" fill="white" />
          <path d="M70 31 L50 50 L38 48 L55 31Z" fill="#dbeeff" />

          {/* Tail fin vertical */}
          <path d="M18 28 L10 14 L20 16 L24 28Z" fill="white" />

          {/* Tail fin horizontal */}
          <path d="M20 29 L6 22 L10 24 L18 29Z" fill="white" />
          <path d="M20 31 L6 38 L10 36 L18 31Z" fill="#dbeeff" />

          {/* Window row */}
          <circle cx="88" cy="28" r="2.8" fill="#bfdbfe" opacity="0.9" />
          <circle cx="78" cy="27" r="2.8" fill="#bfdbfe" opacity="0.9" />
          <circle cx="68" cy="27" r="2.8" fill="#bfdbfe" opacity="0.9" />
          <circle cx="58" cy="27" r="2.8" fill="#bfdbfe" opacity="0.9" />

          {/* Engine */}
          <ellipse cx="60" cy="36" rx="11" ry="5" fill="#cbd5e1" />
          <ellipse cx="60" cy="36" rx="8" ry="3.5" fill="#94a3b8" />
        </svg>
      </div>



      {/* ── Content ── */}
      <div className="z-10 flex flex-col items-center gap-10">
        <p className="font-header text-5xl md:text-9xl">404</p>
        <h2 className="font-bold">Te has salido del mapa.</h2>
        <p className="text-center">
          Nuestro equipo no puede localizar este destino. 
          <br />
          Es posible que la página que busca haya sido trasladada o que nunca haya existido.
        </p>
          <Button onClick={() => navigate(-1) || navigate("/")}>Volver</Button>
      </div>
    </div>
  );
}

const styles = {
  root: {
    minHeight: "100vh",
    background: "radial-gradient(circle, rgba(107,193,255,1) 0%, rgba(84,146,205,1) 25%, rgba(61,100,155,1) 50%, rgba(37,53,105,1) 75%, rgba(14,6,55,1) 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    position: "relative",
    gap: "60px",
    padding: "40px 24px",
    flexWrap: "wrap",
  },
  cloudBase: {
    position: "absolute",
    pointerEvents: "none",
  }
};
