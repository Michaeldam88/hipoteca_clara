import { use, useState } from "react";
import Text from "@/ui/text/text";
import Button from "@/ui/button/button";
import Spacer from "@/ui/spacer/spacer";
import Modal from "@/ui/modal/modal";
import List from "@/ui/list/list";

const SelectModal = ({ elements }: { elements: string[] }) => {
  const [modal, setModal] = useState(false);
  const [buttonText, setButtonText] = useState("-- Choose a country --");
  const [startClosingModal, setStartClosingModal] = useState(false);

  const handleClick = (value:string) => {
    setButtonText(value);
    setStartClosingModal(true);    
  };

  return (
    <>
      <Text text="Choose a Country:" preset="small" />
      <Spacer />
      <Button
        text={buttonText}
        preset="primary-ghost"
        type="button"
        size="medium"
        onClick={() => setModal(true)}
      />

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
            <List
              elements={elements}
              color="subtle"
              extraAction={handleClick}
            />
          }
          startClosing={startClosingModal}
        />
      )}
    </>
  );
};

export default SelectModal;
