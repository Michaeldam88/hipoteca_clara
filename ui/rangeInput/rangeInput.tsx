import { useEffect } from "react";
import "./rangeInput.scss";

const RangeInput = ({
  name,
  value,
  setValue,
  max = 100,
  min = 0,
  step = 1,
  labelText = "",
  limitColor = false,
  topFormattedValue,
  middleFormattedValue,
  bottomFormattedValue,
}: {
  name: string;
  value: number;
  setValue: (value: number) => void;
  max?: number;
  min?: number;
  step?: number;
  labelText?: string;
  limitColor?: boolean;
  topFormattedValue?: string;
  middleFormattedValue?: string;
  bottomFormattedValue?: string;
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  let trackWidth = percentage;

  //this help to hide the before bar when below 40%
  if (percentage > 0 && percentage <= 40) trackWidth = percentage + 2;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(+event.target.value);
  };

  useEffect(() => {
    const cssRoot: HTMLElement = document?.querySelector(":root")!!;
    cssRoot?.style.setProperty("--track-width", trackWidth + "%");

    const barWidth = document
      ?.querySelector(".range__bottom-container")
      ?.getBoundingClientRect()?.width;

    const bottomBoxPosition = ((barWidth || 0) / 100) * percentage;

    cssRoot?.style.setProperty(
      "--bottom-box-position",
      bottomBoxPosition + "px"
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="range">
      <label>
        <div className="range__top">
          {labelText && <p className="range__label-text">{labelText}</p>}
          {topFormattedValue && (
            <p className="range__top-formatted">{topFormattedValue}</p>
          )}
        </div>

        <div className="range__middle-container">
          <div className="range__middle-left">
            <input
              onChange={handleChange}
              className={`range__input ${
                limitColor && (percentage > 80 || percentage < 20)
                  ? "range__input--limit"
                  : ""
              }`}
              type="range"
              name={name}
              min={min}
              max={max}
              step={step}
              value={value}
            />
            {bottomFormattedValue && (
              <div className="range__bottom-container">
                <div className="range__bottom-box">
                  <p className="range__bottom-formatted">
                    {bottomFormattedValue}
                  </p>
                </div>
              </div>
            )}
          </div>
          {middleFormattedValue && (
            <p className="range__middle-right">{middleFormattedValue}</p>
          )}
        </div>
      </label>
    </div>
  );
};

export default RangeInput;
