"use client";
import "./radioButton.scss";

const RadioButton = ({
  options,
  name,
  setOption,
}: {
  options: { id: number; label: string; subLabel?: string }[];
  name: string;
  setOption: (value: string) => void;
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOption(event.target.value);
  };

  return (
    <div className="radio-input" onChange={handleChange}>
      {options.map((option) => (
        <label className="radio-label" key={option.id}>
          <div>
            <p className="radio-label__main">{option.label}</p>
            {option.subLabel && (
              <p className="radio-label__optional">{option.subLabel}</p>
            )}
          </div>
          <input
            className="radio-element"
            type="radio"
            value={option.label}
            name={name}
          />
        </label>
      ))}
    </div>
  );
};

export default RadioButton;
