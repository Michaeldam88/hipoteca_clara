"use client";

import "./seeComponents.scss";

import Spacer from "@/ui/spacer/spacer";
import { useEffect, useState } from "react";
import Text from "@/ui/text/text";
import Button from "@/ui/button/button";
import RadioButton from "@/ui/radioButton/radioButton";
import Select from "@/ui/select/select";
import Modal from "@/ui/modal/modal";
import SelectModal from "@/ui/selectModal/selectModal";
import List from "@/ui/list/list";
import Input from "@/ui/customInput/input";

export default function SeeComponents() {
  const radioOptions = [
    { id: 1001, label: "Yes", subLabel: "All the little details" },
    { id: 1002, label: "No", subLabel: "All the little details" },
    { id: 1003, label: "Unknown" },
  ];

  const countryOptions = [
    { id: 2001, value: "Spain" },
    { id: 2002, value: "Italy" },
    { id: 2003, value: "Portugal" },
    { id: 2004, value: "Germany" },
  ];

  const [radioOption, setRadioOption] = useState("");
  const [countryOption, setCountryOption] = useState("");
  const [countryOptionModal, setCountryOptionModal] = useState("");
  const [inputValue, setInputValue] = useState("");

  const [modal, setModal] = useState(false);
  const [startClosingModal, setStartClosingModal] = useState(false);

  const getRadioOption = (value: string) => {
    setRadioOption(value);
  };

  const getCountryOption = (value: string) => {
    setCountryOption(value);
  };

  const getCountryOptionModal = (value: string) => {
    setCountryOptionModal(value);
  };

  const inputRight = "€";

  const getInputValue = (value: string) => {
    setInputValue(value);
  };

  useEffect(() => {
    console.log(radioOption, countryOption, countryOptionModal, inputValue);
  }, [radioOption, countryOption, countryOptionModal, inputValue]);

  return (
    <section className="seeComponents-container">
      <h1>Components</h1>
      <Spacer />
      <p>Header H1</p>
      <Spacer />
      <Text
        preset="headline1"
        text={"Calculadora de hipotecas"}
        weight="bold"
      />
      <Spacer />
      <p>Header H2</p>
      <Spacer />
      <Text preset="headline2" text={"Calculadora de hipotecas"} />
      <Spacer />
      <p>Header H3</p>
      <Spacer />
      <Text preset="headline3" text={"Calculadora de hipotecas"} />
      <Spacer />
      <p>Header H4</p>
      <Spacer />
      <Text preset="headline4" text={"Calculadora de hipotecas"} />
      <Spacer />
      <p>Header H5</p>
      <Spacer />
      <Text preset="headline5" text={"Calculadora de hipotecas"} />
      <Spacer />
      <p>Paragraph</p>
      <Spacer />
      <Text
        preset="small"
        text={
          "total, incluyendo hipoteca y gastos asociados. Toma decisiones informadas y confía en tu futuro."
        }
      />
      <Spacer />
      <p>Paragraph Subtle</p>
      <Spacer />
      <Text
        preset="small"
        text={
          "total, incluyendo hipoteca y gastos asociados. Toma decisiones informadas y confía en tu futuro."
        }
        color="subtle"
      />
      <Spacer />
      <p>Button</p>
      <Spacer />
      <Button
        text="Button Title"
        preset="primary"
        type="button"
        size="medium"
      />
      <Spacer />
      <p>Button Disabled</p>
      <Spacer />
      <Button
        text="Button Title"
        preset="primary"
        type="button"
        size="medium"
        disabled
      />
      <Spacer />
      <p>List</p>
      <List elements={countryOptions} />
      <Spacer />
      <Spacer />
      <p>Radio Button</p>
      <Spacer />
      <RadioButton
        options={radioOptions}
        name="Confirm Radio"
        setOption={getRadioOption}
      />
      <Spacer />
      <p>Select</p>
      <Spacer />
      <Select
        name="country-select"
        options={countryOptions}
        setOption={getCountryOption}
      />
      <Spacer />
      <p>Modal Select</p>
      <Spacer />
      <SelectModal options={countryOptions} setOption={getCountryOptionModal} />
      <Spacer />
      <p>Modal</p>
      <Spacer />
      <Button
        text="Open Modal"
        preset="primary"
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
          content={<Text text="Hola" preset="small" />}
          footer={
            <Button
              preset="primary"
              text={"Close Modal"}
              onClick={() => setStartClosingModal(true)}
              size="medium"
            />
          }
          startClosing={startClosingModal}
        />
      )}
      <Spacer />
      <p>Text Input Placeholder</p>
      <Spacer />
      <Input
        setValue={getInputValue}
        placeholder="Nombre Presupuesto"
        type="text"
      />
      <Spacer />
      <p>Text Input Label</p>
      <Spacer />
      <Input
        setValue={getInputValue}
        label="Precio vivienda"
        right={inputRight}
        type="number"
      />
      <Spacer />
    </section>
  );
}
