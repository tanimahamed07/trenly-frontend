import { Star } from "lucide-react";
import { useState } from "react";

export const StarInput = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button key={s} type="button" onClick={() => onChange(s)} onMouseEnter={() => setHovered(s)} onMouseLeave={() => setHovered(0)} className="transition-transform hover:scale-110">
          <Star size={28} className={s <= (hovered || value) ? "fill-warning text-warning" : "fill-base-300 text-base-300"} />
        </button>
      ))}
    </div>
  );
};