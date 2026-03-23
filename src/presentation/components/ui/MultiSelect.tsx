import { useState, useRef, useEffect } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

interface Props {
  options: SelectOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  colorMap?: Record<string, string>;
}

function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select...",
  colorMap,
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function toggle(value: string) {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  }

  function remove(value: string, e: React.MouseEvent) {
    e.stopPropagation();
    onChange(selected.filter((v) => v !== value));
  }

  return (
    <div ref={ref} className="relative w-full">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="min-h-11 w-full flex flex-wrap items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-sm cursor-pointer focus-within:ring-2 focus-within:ring-red-400 transition"
      >
        {selected.length === 0 && (
          <span className="text-gray-400 dark:text-gray-500 text-sm select-none">
            {placeholder}
          </span>
        )}
        {selected.map((value) => (
          <span
            key={value}
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${colorMap?.[value] ?? "bg-red-100 text-red-700"}`}
          >
            {value}
            <button
              onClick={(e) => remove(value, e)}
              className="hover:text-red-900 leading-none"
            >
              ×
            </button>
          </span>
        ))}
        <span className="ml-auto text-gray-400 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </div>

      {open && (
        <div className="absolute z-10 mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => {
            const isSelected = selected.includes(option.value);
            return (
              <div
                key={option.value}
                onClick={() => toggle(option.value)}
                className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer text-sm capitalize transition hover:bg-gray-50 dark:hover:bg-gray-700 ${isSelected ? "text-red-500 font-semibold" : "text-gray-700 dark:text-gray-200"}`}
              >
                <span
                  className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition ${isSelected ? "bg-red-500 border-red-500" : "border-gray-300 dark:border-gray-500"}`}
                >
                  {isSelected && (
                    <svg
                      className="w-3 h-3 text-white"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                {option.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MultiSelect;
