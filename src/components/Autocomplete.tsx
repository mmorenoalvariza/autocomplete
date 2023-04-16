import { FunctionComponent, useRef } from "react";
import useComponentVisible from "../hooks/useComponentVisible";
type Option = { id: string | number };
type Props<T> = {
  placeholder?: string;
  value: string;
  getLabel: (option: T) => string;
  onChange: (newValue: string) => void;
  options: Array<T>;
  onSelect: (selectedOption: T) => void;
};

const Autocomplete = <T extends Option>(props: Props<T>) => {
  const { ref, isVisible, setIsVisible } = useComponentVisible(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    placeholder = "",
    value,
    getLabel,
    onChange,
    options = [],
    onSelect,
  } = props;

  const handleOptionSelection = (option: T) => {
    onSelect(option);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div ref={ref} className="flex flex-col -50">
      <input
        ref={inputRef}
        onFocus={() => setIsVisible(true)}
        type="text"
        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 border"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {isVisible && (
        <Options
          options={options}
          value={value}
          onSelect={handleOptionSelection}
          getLabel={getLabel}
        />
      )}
    </div>
  );
};

const Options = <T extends Option>({
  options,
  value,
  onSelect,
  getLabel,
}: Pick<Props<T>, "options" | "value" | "onSelect" | "getLabel">) => {
  const noOptions = value && options.length === 0;
  return (
    <ul className="border flex flex-col justify-start overflow-auto max-h-52">
      {noOptions ? (
        <li>No options</li>
      ) : (
        options.map((option, i) => (
          <li
            tabIndex={0}
            role="button"
            className="cursor-pointer hover:bg-slate-100"
            key={option.id}
            onClick={() => onSelect(option)}
            onKeyDown={(e) => {
              if ([" ", "Enter"].includes(e.key)) {
                onSelect(option);
              }
            }}
          >
            <HighlightLabel label={getLabel(option)} value={value} />
          </li>
        ))
      )}
    </ul>
  );
};

const HighlightLabel: FunctionComponent<{ label: string; value: string }> = ({
  label,
  value,
}) => {
  const parts = label.split(new RegExp(`(${value})`, "gi"));
  return (
    <span>
      {" "}
      {parts.map((part, i) => (
        <span
          key={i}
          style={
            part.toLowerCase() === value.toLowerCase()
              ? { fontWeight: "bold" }
              : {}
          }
        >
          {part}
        </span>
      ))}{" "}
    </span>
  );
};

export default Autocomplete;
