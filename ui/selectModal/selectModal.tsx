import { useState } from "react";
import Text from "@/ui/text/text";
import Spacer from "@/ui/spacer/spacer";
import Modal from "@/ui/modal/modal";
import List from "@/ui/list/list";
import "./selectModal.scss";

const SelectModal = ({
  options,
  setOption,
}: {
  options: {
    id: number;
    value: string;
  }[];
  setOption: (value: string) => void;
}) => {
  const [modal, setModal] = useState(false);
  const [startClosingModal, setStartClosingModal] = useState(false);

  const [buttonText, setButtonText] = useState("-- Choose a country --");

  const handleClick = (value: string) => {
    setButtonText(value);
    setStartClosingModal(true);
    setOption(value);
  };

  return (
    <>
      <Text text="Choose a Country:" preset="small" />
      <Spacer />
      <button className="select-button" onClick={() => setModal(true)}>
        {buttonText}
      </button>

      {modal && (
        <Modal
          onClose={() => {
            setStartClosingModal(false);
            setModal(false);
          }}
          header={
            <Text
              text="Seleccionar Provincia"
              preset="headline4"
              weight="bold"
            />
          }
          content={
            <List elements={options} color="subtle" extraAction={handleClick} />
          }
          startClosing={startClosingModal}
        />
      )}
    </>
  );
};

export default SelectModal;
