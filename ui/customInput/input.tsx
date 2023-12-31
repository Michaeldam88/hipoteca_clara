import { ReactNode, useRef, useState } from "react";
import "./input.scss";

const Input = ({
  setValue,
  label,
  placeholder,
  type,
  right,
}: {
  setValue: (value: string) => void;
  label?: string;
  placeholder?: string;
  type: "text" | "number";
  right?: ReactNode;
}) => {
  const [inputValue, setInputValue] = useState("");
  const [focus, setFocus] = useState(false);

  const handleInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(ev.target.value);
    setValue(ev.target.value);
  };

  const handleLabelFocus = () => {
    if (label) setFocus(true);
  };

  const handleLabelUnfocus = () => {
    if (label) {
      setFocus(false);
    }
  };

  return (
    <div
      className={`input-container ${focus ? "input-container--focused" : ""}`}
    >
      {label && (
        <label
          className={`custom-label ${focus && "custom-label--focused"} ${
            !focus && inputValue && "custom-label--with-value"
          }`}
          htmlFor={`customInput${label}`}
        >
          {label}
        </label>
      )}
      <input
        id={`customInput${label}`}
        type={type}
        onChange={handleInput}
        value={inputValue}
        placeholder={placeholder && placeholder}
        className="custom-input"
        onFocus={handleLabelFocus}
        onBlur={handleLabelUnfocus}
      />
      {right && <p>{right}</p>}
    </div>
  );
};

export default Input;
