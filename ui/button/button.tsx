import { ReactNode } from 'react';
import './button.scss';

export type ButtonTypePreset = 'primary' | 'primary-ghost' | 'link' | 'default';

interface ButtonProps {
  preset?: ButtonTypePreset;
  text: string | ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  left?: ReactNode;
  right?: ReactNode;
  size?: 'small' | 'normal' | 'medium' | 'big';
  type?: 'submit' | 'reset' | 'button';
  autoWidth?: boolean;
}

const Button = ({
  text,
  onClick,
  disabled,
  left,
  right,
  preset = 'default',
  size = 'normal',
  type = 'button',
  autoWidth,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`--${preset}${text && ' --has-title'} --size-${size} ${
        autoWidth && '--auto-width'
      }`}
    >
      {left ? <div className='button__element'>{left}</div> : null}
      {text}
      {right ? <div className='button__element'>{right}</div> : null}
    </button>
  );
};

export default Button;
