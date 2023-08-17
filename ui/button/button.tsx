import { ReactNode } from "react";
import "./button.scss";

export type ButtonTypePreset = "primary" | "primary-ghost" | "link" | "default";

interface ButtonProps {
  preset?: ButtonTypePreset;
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  left?: ReactNode;
  right?: ReactNode;
  size?: "normal" | "medium" | "big";
  type?: "submit" | "reset" | "button";
}

const Button = ({
  text,
  onClick,
  disabled,
  left,
  right,
  preset = "default",
  size = "normal",
  type = "button",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`--${preset}${text && " --has-title"} --size-${size}`}
    >
      {left ? <div className="button__element">{left}</div> : null}
      {text}
      {right ? <div className="button__element">{right}</div> : null}
    </button>
  );
};

export default Button;
