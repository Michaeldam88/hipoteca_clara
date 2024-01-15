import { ReactNode, useRef, useState } from "react";
import "./input.scss";

const Input = ({
  setValue,
  label,
  placeholder,
  type,
  right,
  value,
  moneyFormat = false,
}: {
  setValue: (value: string) => void;
  label?: string;
  placeholder?: string;
  type: "text" | "number";
  right?: ReactNode;
  value?: string | number;
  moneyFormat?: boolean;
}) => {
  const [focus, setFocus] = useState(false);
  const [showedValue, setShowedValue] = useState(value);

  //if we will use the MoneyFormat the input has to be a text type and the value a String
  const handleInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (moneyFormat && Number.isNaN(+ev.target.value)) {
      setValue("");
    } else {
      setValue(Math.round(+ev.target.value).toString());
    }
    setShowedValue(ev.target.value);
  };

  const handleLabelFocus = () => {
    if (moneyFormat) setShowedValue(value);
    if (label) setFocus(true);
  };

  const handleLabelUnfocused = () => {
    if (moneyFormat && showedValue) {
      if (Number.isNaN(+showedValue)) {
        setShowedValue("Indica un número valido");
      }

      if (value) {
        setShowedValue(
          new Intl.NumberFormat("es-ES", {
            style: "decimal",
            maximumFractionDigits: 0,
          }).format(+value)
        );
      }
    }

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
            !focus && showedValue && "custom-label--with-value"
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
        value={showedValue}
        placeholder={placeholder && placeholder}
        className="custom-input"
        onFocus={handleLabelFocus}
        onBlur={handleLabelUnfocused}
      />
      {right && <p>{right}</p>}
    </div>
  );
};

export default Input;
