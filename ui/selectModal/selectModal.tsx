import { useState } from 'react';
import Text from '@/ui/text/text';
import Spacer from '@/ui/spacer/spacer';
import Modal from '@/ui/modal/modal';
import List from '@/ui/list/list';
import './selectModal.scss';

const SelectModal = ({
  options,
  setOption,
  selectName = '',
  modalHeader = '',
  initialButtonText,
}: {
  options: {
    id: number;
    value: string;
  }[];
  setOption: (value: string) => void;
  selectName?: string;
  initialButtonText: string;
  modalHeader?: string;
}) => {
  const [modal, setModal] = useState(false);
  const [startClosingModal, setStartClosingModal] = useState(false);

  const [buttonText, setButtonText] = useState(initialButtonText);

  const handleClick = (value: string) => {
    setButtonText(value);
    setStartClosingModal(true);
    setOption(value);
  };

  return (
    <>
      <Text text={selectName} preset='small' />
      <Spacer />
      <button className='select-button' onClick={() => setModal(true)}>
        {buttonText}
      </button>
      {modal && (
        <Modal
          onClose={() => {
            setStartClosingModal(false);
            setModal(false);
          }}
          header={<Text text={modalHeader} preset='headline4' weight='bold' />}
          content={
            <List elements={options} color='subtle' extraAction={handleClick} />
          }
          startClosing={startClosingModal}
        />
      )}
    </>
  );
};

export default SelectModal;
