import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

export default function ToggleSwitch({ checked, onChange }) {
  const switchW = 46;
  const switchH = 24;
  const circleDia = 18;
  const offset = (switchH - circleDia) / 2;
  const effectW = circleDia / 2;
  const effectH = effectW / 2 - 1;

  const transition = "all 0.2s cubic-bezier(0.27, 0.2, 0.25, 1.51)";

  const sliderBg = checked ? "rgb(0, 218, 80)" : "rgb(131, 131, 131)";
  const circleLeft = checked ? switchW - circleDia - offset : offset;
  const circleShadow = checked
    ? "-1px 1px 2px rgba(163,163,163,0.45)"
    : "1px 1px 2px rgba(146,146,146,0.45)";
  const effectLeft = checked
    ? switchW - effectW - effectW / 2 - offset
    : offset + effectW / 2;

  const crossColor = "rgb(131, 131, 131)";
  const checkColor = "rgb(0, 218, 80)";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      style={{
        width: switchW,
        height: switchH,
        background: sliderBg,
        borderRadius: 999,
        position: "relative",
        cursor: "pointer",
        transition,
        border: "none",
        padding: 0,
        display: "flex",
        alignItems: "center",
        outline: "none",
      }}
    >
      {/* Effect line */}
      <span
        style={{
          position: "absolute",
          width: effectW,
          height: effectH,
          left: effectLeft,
          background: "#fff",
          borderRadius: 1,
          transition: "all 0.2s ease-in-out",
        }}
      />

      {/* Circle */}
      <span
        style={{
          width: circleDia,
          height: circleDia,
          background: "#fff",
          borderRadius: "inherit",
          boxShadow: circleShadow,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition,
          zIndex: 1,
          position: "absolute",
          left: circleLeft,
        }}
      >
        {/* Cross */}
        <span
          style={{
            color: crossColor,
            transform: checked ? "scale(0)" : "scale(1)",
            transition,
            display: "flex",
          }}
        >
          <RxCross2 size={10} />
        </span>

        {/* Checkmark */}
        <span
          style={{
            color: checkColor,
            transform: checked ? "scale(1)" : "scale(0)",
            transition,
            display: "flex",
          }}
        >
          <FaCheck size={10} />
        </span>
      </span>
    </button>
  );
}