import type { CSSProperties } from "react";

const elements = ["Kim", "Mộc", "Thủy", "Hỏa", "Thổ"];

export function FateOrb() {
  return (
    <div aria-hidden="true" className="fate-orb">
      <div className="fate-orb__ring fate-orb__ring--outer" />
      <div className="fate-orb__ring fate-orb__ring--middle" />
      <div className="fate-orb__ring fate-orb__ring--inner" />
      <div className="fate-orb__core">
        <span>命</span>
      </div>
      {elements.map((element, index) => (
        <span
          className="fate-orb__mark"
          key={element}
          style={{ "--mark-index": index } as CSSProperties}
        >
          {element}
        </span>
      ))}
    </div>
  );
}
