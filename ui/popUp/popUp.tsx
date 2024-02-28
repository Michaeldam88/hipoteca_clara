import { ReactNode } from 'react';
import './popUp.scss';
import Button from '../button/button';

type ButtonTypePreset = 'white' | 'primary' | 'primary-ghost' | 'warning';

const PopUp = ({
  title,
  text,
  preset = 'white',
  handleClose,
}: {
  title?: string | ReactNode;
  text: ReactNode;
  preset?: ButtonTypePreset;
  handleClose: () => void;
}) => {
  return (
    <div className='pop-up'>
      <div className='pop-up__backdrop' onClick={handleClose}></div>
      <div className={`pop-up__wrapper pop-up--${preset}`}>
        <div className='pop-up__wrapper__content'>
          {title ? <div className='pop-up__wrapper__title'>{title}</div> : null}
          <div className='pop-up__wrapper__text'>{text}</div>
        </div>
        <div className='pop-up__wrapper__footer'>
          <Button text='Ok!' preset='primary' onClick={handleClose} />
        </div>
      </div>
    </div>
  );
};

export default PopUp;
