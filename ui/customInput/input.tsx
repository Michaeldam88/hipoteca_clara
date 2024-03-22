import { ReactNode, useEffect, useState } from "react";
import "./input.scss";

const Input = ({
  setValue,
  setError,
  label,
  placeholder,
  type,
  right,
  value,
  moneyFormat = false,
  decimals = 0,
  min,
  max,
}: {
  setValue: (value: string) => void;
  setError?: (value: string) => void;
  label?: string;
  placeholder?: string;
  type: "text" | "number";
  right?: ReactNode;
  value?: string | number;
  moneyFormat?: boolean;
  decimals?: number;
  min?: number;
  max?: number;
}) => {
  const [focus, setFocus] = useState(false);
  const [formattedOutput, setFormattedOutput] = useState(value);
  const [valueError, setValueError] = useState("");

  // If we use the MoneyFormat the input has to be a text type and the value a String
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.trim();
    if (type === "number") {
      const value = (+inputValue).toFixed(decimals);
      if (min && +value < min) {
        setValue(min.toString());
        setValueError("min");
      } else if (max && +value > max) {
        setValue(max.toString());
        setValueError("max");
      } else {
        setValue(value);
      }

      setFormattedOutput(inputValue);
    }

    if (!moneyFormat && type === "text") {
      setValue(inputValue);
      setFormattedOutput(inputValue);
    }

    if (moneyFormat && type === "text") {
      processInput(inputValue);
    }
  };

  // Function to process the input
  const processInput = (value: string) => {
    if (value === "") {
      setFormattedOutput("");
      setValue(min ? min.toString() : "1");
    } else {
      if (!isNaN(Number(value.replace(/\./g, "").replace(",", ".")))) {
        const numericValue = parseFloat(
          value.replace(/\./g, "").replace(",", ".")
        );

        const formattedNumber = new Intl.NumberFormat("de-DE", {
          style: "decimal",
        }).format(numericValue);

        if (min && numericValue < min) {
          setValue(min.toString());
          setValueError("min");
        } else if (max && numericValue > max) {
          setValue(max.toString());
          setValueError("max");
        } else {
          setValue(numericValue.toString());
        }

        setFormattedOutput(formattedNumber);
      } else {
        setValue(min ? min.toString() : "1");
        setValueError("text");
        setFormattedOutput(value);
      }
    }
  };
  const handleLabelFocus = () => {
    if (label) setFocus(true);
  };

  const handleLabelUnfocused = () => {
    if (valueError === "min") {
      setFormattedOutput(min);
      if (setError) setError(`¡El numero minimo es ${min}!`);
      setValueError("clean");
    }

    if (valueError === "max") {
      setFormattedOutput(max);
      if (setError) setError(`¡El numero maximo es ${max}!`);
      setValueError("clean");
    }

    if (valueError === "text") {
      setFormattedOutput(min ? min.toString() : "1");
      if (setError) setError("¡Indica un numero valido!");
      setValueError("clean");
    }

    if (type === "number") {
      setFormattedOutput(value);
      setValueError("clean");
    }

    if (label) {
      setFocus(false);
    }
  };

  useEffect(() => {
    if (moneyFormat && value) {
      processInput(value.toString());
      setValueError("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueError === "clean"]);

  return (
    <div
      className={`input-container ${focus ? "input-container--focused" : ""}`}
    >
      {label && (
        <label
          className={`custom-label ${focus && "custom-label--focused"} ${
            !focus && formattedOutput && "custom-label--with-value"
          }`}
          htmlFor={`customInput${label}`}
        >
          {label}
        </label>
      )}
      <input
        id={`customInput${label}`}
        type={type}
        onChange={handleInputChange}
        value={formattedOutput}
        placeholder={placeholder && placeholder}
        className="custom-input"
        onFocus={handleLabelFocus}
        onBlur={handleLabelUnfocused}
        min={min}
        max={max}
      />
      {right && <p className="input-right">{right}</p>}
    </div>
  );
};

export default Input;
