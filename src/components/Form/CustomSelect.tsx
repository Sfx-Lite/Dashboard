import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Check } from "lucide-react";
import { popoverContainerVariants, popoverItemVariants } from "../../utils/animation-variants";

export type SelectOption = {
  value: string;
  label: string;
};

export type CustomSelectProps = {
  allLabel: string;
  options: SelectOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  className?: string;
};

export default function CustomSelect({
  allLabel,
  options,
  selected,
  onChange,
  className = "",
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  function toggleOption(value: string) {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  }

  const triggerLabel =
    selected.length === 0
      ? allLabel
      : selected.length === 1
      ? options.find((o) => o.value === selected[0])?.label ?? allLabel
      : `${selected.length} selected`;

  return (
    <div ref={rootRef} className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-full bg-sfx-primary-tint
                   text-sfx-muted font-rh-sb text-sm px-4 py-2
                   hover:bg-sfx-primary/15 transition-colors duration-300
                   focus:outline-none focus-visible:ring-2
                   focus-visible:ring-sfx-primary/60"
      >
        {triggerLabel}
        <ChevronDown
          size={16}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-multiselectable
            variants={popoverContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ originX: 0, originY: 0 }}
            className="absolute left-0 mt-2 min-w-[180px] rounded-2xl bg-white
                       shadow-lg ring-1 ring-black/5 py-2 z-20"
          >
            {options.map((option) => {
              const isSelected = selected.includes(option.value);
              return (
                <motion.li
                  key={option.value}
                  variants={popoverItemVariants}
                  role="option"
                  aria-selected={isSelected}
                >
                  <button
                    type="button"
                    onClick={() => toggleOption(option.value)}
                    className="w-full flex items-center justify-between gap-3
                               px-4 py-2 text-sm text-slate-700
                               hover:bg-sfx-primary/5 transition-colors"
                  >
                    <span>{option.label}</span>
                    {isSelected && (
                      <Check size={16} className="text-sfx-primary shrink-0" />
                    )}
                  </button>
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}