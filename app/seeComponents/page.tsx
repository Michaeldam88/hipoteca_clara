"use client";

import Spacer from "@/ui/spacer/spacer";
import { useState } from "react";
import "./seeComponents.scss";
import Text from "@/ui/text/text";
import Button from "@/ui/button/button";
import RadioButton from "@/ui/radioButton/radioButton";
import Select from "@/ui/select/select";
import Modal from "@/ui/modal/modal";
import SelectModal from "@/ui/selectModal/selectModal";
import List from "@/ui/list/list";

export default function SeeComponents() {
  const options = [
    { label: "Yes", subLabel: "All the little details" },
    { label: "No", subLabel: "All the little details" },
    { label: "Unknown", subLabel: "" },
  ];

  const countryOptions = ["Spain", "Italy", "Portugal", "Germany"];

  const [option, setOption] = useState("");
  const [countryOption, setCountryOption] = useState("");
  const [modal, setModal] = useState(false);
  const [startClosingModal, setStartClosingModal] = useState(false);

  return (
    <main className="container">
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
        options={options}
        name="Confirm Radio"
        setOption={setOption}
      />
      <Spacer />
      <p>Select</p>
      <Spacer />
      <Select
        name="country-select"
        options={countryOptions}
        setOption={setCountryOption}
      />
      <Spacer />
      <p>Modal Select</p>
      <Spacer />
      <SelectModal elements={countryOptions} />
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
    </main>
  );
}
