"use client";

import Stepper from "@/ui/stepper/stepper";
import "./form.scss";
import { useState } from "react";
import Spacer from "@/ui/spacer/spacer";
import Text from "@/ui/text/text";
import RadioButton from "@/ui/radioButton/radioButton";
import SelectModal from "@/ui/selectModal/selectModal";
import data from "../../data/rates.json";
import Button from "@/ui/button/button";

export default function Form() {
  const enum FormSteps {
    PROVINCE = "PROVINCE",
    PRICE = "PRICE",
    MORTGAGE_TYPE = "MORTGAGE_TYPE",
    YEARS = "YEARS",
  }

  interface StepItem<T> {
    title: string;
    id: T;
  }

  const [step, setStep] = useState<FormSteps>(FormSteps.PROVINCE);

  const steps: StepItem<FormSteps>[] = [
    {
      id: FormSteps.PROVINCE,
      title: "Tasación y provincia",
    },
    {
      id: FormSteps.PRICE,
      title: "Precio y financiación",
    },
    {
      id: FormSteps.MORTGAGE_TYPE,
      title: "Tipo de hipoteca",
    },
    {
      id: FormSteps.YEARS,
      title: "Años de hipoteca, TIN y TAE",
    },
  ];

  const isPricedRadioOptions = [
    { id: 1001, label: "Yes" },
    { id: 1002, label: "No" },
  ];

  const [isPricedRadioOption, setIsPricedRadioOption] = useState("");

  const getIsPricedRadioOption = (value: string) => {
    setIsPricedRadioOption(value);
  };

  const provinces = data["autonomous-region"].map((element) => {
    return {
      id: element.id,
      value: element.name,
    };
  });

  const [province, setProvince] = useState("");

  const getProvince = (value: string) => {
    setProvince(value);
  };

  return (
    <div className="form-container">
      <Spacer size="xhuge" />
      <Stepper<FormSteps> steps={steps} activeStep={step} />
      <Spacer size="xhuge" />

      <div>
        <Text preset="small" text="¿La vivienda está tasada?" color="subtle" />
        <Spacer size="huge" />
        <RadioButton
          name="is-priced"
          options={isPricedRadioOptions}
          setOption={getIsPricedRadioOption}
        />
        <Spacer size="giant" />
        <SelectModal
          options={provinces}
          setOption={getProvince}
          name="Seleccione una comunidad"
          buttonName="Seleccionar"
        />
        <div className="form-button">
          <Button text="Continuar" preset="primary" size="medium" />
        </div>
      </div>
    </div>
  );
}
