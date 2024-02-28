import { ReactNode, useState } from 'react';
import './input.scss';

const Input = ({
  setValue,
  label,
  placeholder,
  type,
  right,
  value,
  moneyFormat = false,
  decimals = 0,
}: {
  setValue: (value: string) => void;
  label?: string;
  placeholder?: string;
  type: 'text' | 'number';
  right?: ReactNode;
  value?: string | number;
  moneyFormat?: boolean;
  decimals?: number;
}) => {
  const [focus, setFocus] = useState(false);
  const [showedValue, setShowedValue] = useState(value);

  //if we will use the MoneyFormat the input has to be a text type and the value a String
  const handleInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (
      (moneyFormat && Number.isNaN(+ev.target.value)) ||
      +ev.target.value === 0
    ) {
      setValue('');
    } else {
      setValue((+ev.target.value).toFixed(decimals).toString());
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
        setShowedValue('Por favor indique un número valido.');
      }

      if (value) {
        setShowedValue(
          new Intl.NumberFormat('es-ES', {
            style: 'decimal',
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
      className={`input-container ${focus ? 'input-container--focused' : ''}`}
    >
      {label && (
        <label
          className={`custom-label ${focus && 'custom-label--focused'} ${
            !focus && showedValue && 'custom-label--with-value'
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
        className='custom-input'
        onFocus={handleLabelFocus}
        onBlur={handleLabelUnfocused}
      />
      {right && <p className='input-right'>{right}</p>}
    </div>
  );
};

export default Input;
