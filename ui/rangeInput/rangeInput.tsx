import { ReactNode, useEffect } from "react";

import "./rangeInput.scss";
import Spacer from "../spacer/spacer";

const RangeInput = ({
  name,
  value,
  setValue,
  getPercentage,
  max = 100,
  min = 0,
  step = 1,
  labelText = "",
  limitColor = false,
  limitColorMin = 20,
  limitColorMax = 80,
  topEndFormattedValue,
  topFormattedValue,
  middleFormattedValue,
  bottomFormattedValue,
  bottomStartFormattedValue,
  bottomEndFormattedValue,
}: {
  name: string;
  value: number;
  setValue: (value: number) => void;
  getPercentage?: (value: number) => void;
  max?: number;
  min?: number;
  step?: number;
  labelText?: string;
  limitColor?: boolean;
  limitColorMin?: number;
  limitColorMax?: number;
  topEndFormattedValue?: ReactNode;
  middleFormattedValue?: ReactNode;
  bottomFormattedValue?: ReactNode;
  topFormattedValue?: ReactNode;
  bottomStartFormattedValue?: ReactNode;
  bottomEndFormattedValue?: ReactNode;
}) => {
  let percentage = ((value - min) / (max - min)) * 100;

  if (!percentage) percentage = 0;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.focus();
    setValue(+event.target.value);
  };

  useEffect(() => {
    if (getPercentage) getPercentage(percentage);

    // set the width of the slider bar
    const rangeInputCss: HTMLElement = document?.querySelector(
      `.range__input-${name}`
    )!!;

    rangeInputCss?.style.setProperty("--track-width", `${percentage}%`);

    // set the position of the bottom box
    const barWidth = document
      ?.querySelector(".range__bottom-container")
      ?.getBoundingClientRect()?.width;

    const bottomBoxPosition = ((barWidth || 0) / 100) * percentage;

    const bottomBox: HTMLElement = document?.querySelector(
      `.range__bottom-box-${name}`
    )!!;

    bottomBox?.style.setProperty(
      "--bottom-box-position",
      `${bottomBoxPosition}px`
    );

    const topBox: HTMLElement = document?.querySelector(
      `.range__top-box-${name}`
    )!!;

    topBox?.style.setProperty("--top-box-position", `${bottomBoxPosition}px`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="range">
      <label htmlFor={name}>
        <div className="range__top">
          {labelText && <p className="range__label-text">{labelText}</p>}
          {topEndFormattedValue && (
            <p className="range__top-end-formatted">{topEndFormattedValue}</p>
          )}
        </div>
        {topFormattedValue && (
          <>
            <Spacer size="huge" />
            <div className="range__top-formatted-container">
              <div className={`range__top-box range__top-box-${name}`}>
                <p className="range__top-formatted">{topFormattedValue}</p>
              </div>
            </div>
          </>
        )}

        <div className={"range__middle-container"}>
          <div className={"range__middle-left"}>
            <input
              id={name}
              onChange={handleChange}
              className={`range__input range__input-${name} ${
                limitColor &&
                (percentage > limitColorMax || percentage < limitColorMin)
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

            <div className="range__bottom-container">
              {bottomStartFormattedValue && (
                <div className="range__bottom-start">
                  {bottomStartFormattedValue}
                </div>
              )}

              {bottomFormattedValue && (
                <div className={`range__bottom-box range__bottom-box-${name}`}>
                  <p className="range__bottom-formatted">
                    {bottomFormattedValue}
                  </p>
                </div>
              )}

              {bottomEndFormattedValue && (
                <div className="range__bottom-end">
                  {bottomEndFormattedValue}
                </div>
              )}
            </div>
          </div>
          {middleFormattedValue && (
            <p className="range__middle-right">{middleFormattedValue}</p>
          )}
        </div>
        {(bottomEndFormattedValue ||
          bottomFormattedValue ||
          bottomStartFormattedValue) && <Spacer size="huge" />}
      </label>
    </div>
  );
};

export default RangeInput;
