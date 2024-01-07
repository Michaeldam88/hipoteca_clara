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
import PopUp from "@/ui/popUp/popUp";
import Input from "@/ui/customInput/input";
import RangeInput from "@/ui/rangeInput/rangeInput";

export default function Form() {
  const [popUp, setPopUp] = useState("");

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
  const [isPricedRadioOption, setIsPricedRadioOption] = useState("");
  const [province, setProvince] = useState("");
  const [housePrice, setHousePrice] = useState("");
  const [appraisalPrice, setAppraisalPrice] = useState("");
  const [amountFinanced, setAmountFinanced] = useState(10000);
  const [yearsMortgage, setYearsMortgage] = useState(25);

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

  const getIsPricedRadioOption = (value: string) => {
    setIsPricedRadioOption(value);
  };

  const provinces = data["autonomous-region"].map((element) => {
    return {
      id: element.id,
      value: element.name,
    };
  });

  const getProvince = (value: string) => {
    setProvince(value);
  };

  const mortgagePercentage = Math.round(
    (amountFinanced /
      (+appraisalPrice > +housePrice ? +housePrice : +appraisalPrice)) *
      100
  );

  const dataCheck = (nextStep: FormSteps) => {
    if (!isPricedRadioOption) {
      setPopUp("Selecciona si está tasada");
      return;
    }

    if (!province) {
      setPopUp("Selecciona una comunidad");
      return;
    }

    setStep(nextStep);
  };

  const previousStep = () => {
    const currentPosition = steps.findIndex((element) => element.id === step);
    setStep(steps[currentPosition - 1].id);
  };

  return (
    <div className="form-container">
      <Spacer size="xhuge" />
      <Stepper<FormSteps> steps={steps} activeStep={step} />
      <Spacer size="xhuge" />

      {step !== FormSteps.PROVINCE && (
        <button className="prev-btn" onClick={previousStep}>{`<-`}</button>
      )}

      {popUp && <PopUp handleClose={() => setPopUp("")} text={popUp} />}

      {/* first Step ---------------------- */}
      {step === FormSteps.PROVINCE && (
        <div>
          <Text
            preset="small"
            text="¿La vivienda está tasada?"
            color="subtle"
          />
          <Spacer size="huge" />
          <RadioButton
            name="is-priced"
            options={isPricedRadioOptions}
            selectedOption={isPricedRadioOption}
            setOption={getIsPricedRadioOption}
          />
          <Spacer size="giant" />
          <SelectModal
            options={provinces}
            setOption={getProvince}
            selectName="¿Donde esta la casa?"
            initialButtonText={province ? province : "Seleccionar"}
            modalHeader="Selecciona una comunidad"
          />
          <div className="form-button">
            <Button
              text="Continuar"
              preset="primary"
              size="medium"
              onClick={() => dataCheck(FormSteps.PRICE)}
            />
          </div>
        </div>
      )}

      {/* Second Step ---------------------- */}
      {step === FormSteps.PRICE && (
        <div>
          <Input
            type="text"
            label="Precio Vivienda"
            setValue={setHousePrice}
            value={housePrice}
            right="€"
            moneyFormat={true}
          />

          <Spacer size="xhuge" />
          <Input
            type="text"
            label="Valor de la Tasación"
            setValue={setAppraisalPrice}
            value={appraisalPrice}
            right="€"
            moneyFormat={true}
          />
          <Spacer size="xhuge" />
          <RangeInput
            name="amountFinanced"
            setValue={setAmountFinanced}
            value={+amountFinanced}
            max={+appraisalPrice > +housePrice ? +housePrice : +appraisalPrice}
            step={1}
            labelText="Importe a financiar"
            topFormattedValue={new Intl.NumberFormat("es-ES", {
              maximumFractionDigits: 0,
              style: "currency",
              currency: "EUR",
            }).format(amountFinanced)}
            bottomFormattedValue={`${mortgagePercentage} %`}
            limitColor={true}
            limitColorMin={20}
            limitColorMax={80}
          />
          <Spacer size="xhuge" />
          <RangeInput
            name="yearsMortgage"
            setValue={setYearsMortgage}
            value={yearsMortgage}
            step={1}
            min={9}
            max={40}
            labelText="Años de financiación"
            bottomFormattedValue={yearsMortgage}
          />

          {/* Third Step ---------------------- */}

          {/* Next step Button ---------------------- */}
          <div className="form-button">
            <Button
              text="Continuar"
              preset="primary"
              size="medium"
              // onClick={() => dataCheck(FormSteps.MORTGAGE_TYPE)}
              onClick={() =>
                console.log(
                  housePrice,
                  appraisalPrice,
                  amountFinanced,
                  mortgagePercentage,
                  yearsMortgage
                )
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}
