import { ArrowRight } from "lucide-react";

export default function RoleCard({
  title,
  description,
  icon,
  color,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="
        group
        relative
        w-full
        overflow-hidden
        rounded-3xl
        border
        border-white/40
        bg-white/60
        p-8
        text-left
        shadow-xl
        backdrop-blur-2xl
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-2xl
        hover:border-emerald-300
      "
    >
      {/* Glow */}
      <div
        className="
          absolute
          inset-0
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
      >
        <div
          className="
            absolute
            -right-10
            -top-10
            h-36
            w-36
            rounded-full
            blur-3xl
          "
          style={{
            background: color,
            opacity: 0.25,
          }}
        />
      </div>

      <div className="relative z-10 flex items-start justify-between">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-2xl text-3xl"
          style={{
            background: color,
          }}
        >
          {icon}
        </div>

        <ArrowRight
          className="
            text-slate-400
            transition-transform
            duration-300
            group-hover:translate-x-1
            group-hover:text-emerald-600
          "
        />
      </div>

      <h2 className="relative z-10 mt-8 text-2xl font-bold text-slate-800">
        {title}
      </h2>

      <p className="relative z-10 mt-3 leading-7 text-slate-600">
        {description}
      </p>

      <div
        className="
          relative
          z-10
          mt-8
          inline-flex
          items-center
          gap-2
          rounded-full
          bg-slate-900
          px-5
          py-2
          text-sm
          font-semibold
          text-white
          transition
          group-hover:bg-emerald-600
        "
      >
        Continue
        <ArrowRight size={16} />
      </div>
    </button>
  );
}