"use client";

import Stepper from "@/ui/stepper/stepper";
import "./form.scss";
import { useEffect, useState } from "react";
import Spacer from "@/ui/spacer/spacer";
import PopUp from "@/ui/popUp/popUp";
import { useStepStore } from "@/store/zustand";
import FirstStep from "@/components/firstStep/firstStep";
import SecondStep from "@/components/secondStep/secondStep";
import ThirdStep from "@/components/thirdStep/thirdStep";
import FourthStep from "@/components/fourthStep/fourthStep";
import { FormSteps } from "../types";
import { useRouter } from "next/navigation";
import { initializeFromSessionStorage } from "@/store/zustand";

export default function Form() {
  const {
    isNewRadioOption,
    isPricedRadioOption,
    province,
    housePrice,
    appraisalPrice,
    amountFinanced,
    mortgageOption,
    fixedTin,
    fixedTae,
    variableTin,
  } = useStepStore();
  const [popUp, setPopUp] = useState("");
  
  interface StepItem<T> {
    title: string;
    id: T;
  }

  const [step, setStep] = useState<FormSteps>(FormSteps.PROVINCE);

  const router = useRouter();

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
      id: FormSteps.TINTAE,
      title: "TIN y TAE",
    },
  ];

  const dataCheck = (nextStep: FormSteps) => {
    //checks first step

    if (step === FormSteps.PROVINCE && !isNewRadioOption) {
      setPopUp("Selecciona si es nueva");
      return;
    }

    if (step === FormSteps.PROVINCE && !isPricedRadioOption) {
      setPopUp("Selecciona si está tasada");
      return;
    }

    if (step === FormSteps.PROVINCE && !province) {
      setPopUp("Selecciona una comunidad");
      return;
    }

    //checks second step
    if (step === FormSteps.PRICE && !housePrice) {
      setPopUp("Indica el precio de la vivienda");
      return;
    }

    if (
      step === FormSteps.PRICE &&
      isPricedRadioOption === "Si" &&
      !appraisalPrice
    ) {
      setPopUp("Indica el precio de tasación");
      return;
    }

    if (step === FormSteps.PRICE && !amountFinanced) {
      setPopUp("Indica el importe a financiar");
      return;
    }

    //checks third step

    if (step === FormSteps.MORTGAGE_TYPE && !mortgageOption) {
      setPopUp("Indica el tipo de financiación");
      return;
    }

    //checks fourth step

    if (step === FormSteps.TINTAE && !fixedTin) {
      setPopUp("Indica el TIN fijo");
      return;
    }

    if (step === FormSteps.TINTAE && !fixedTae) {
      setPopUp("Indica el TAE fijo");
      return;
    }

    if (
      step === FormSteps.TINTAE &&
      mortgageOption !== "Fija" &&
      !variableTin
    ) {
      setPopUp("Indica el TIN variable");
      return;
    }

    setStep(nextStep);
    if (step === FormSteps.TINTAE) {
      router.push("/results");
    }
  };

  const previousStep = () => {
    const currentPosition = steps.findIndex((element) => element.id === step);
    setStep(steps[currentPosition - 1].id);
  };

  useEffect(() => {    
    useStepStore.setState(initializeFromSessionStorage());
  }, []);

  return (
    <div className="form-container">
      <Stepper<FormSteps> steps={steps} activeStep={step} />
      <Spacer size="huge" />

      {step !== FormSteps.PROVINCE && (
        <button className="prev-btn" onClick={previousStep}>{`<-`}</button>
      )}

      {popUp && <PopUp handleClose={() => setPopUp("")} text={popUp} />}

      {/* first Step ---------------------- */}
      {step === FormSteps.PROVINCE && <FirstStep dataCheck={dataCheck} />}

      {/* Second Step ---------------------- */}
      {step === FormSteps.PRICE && <SecondStep dataCheck={dataCheck} />}

      {/* Third Step ---------------------- */}
      {step === FormSteps.MORTGAGE_TYPE && <ThirdStep dataCheck={dataCheck} />}

      {/* Fourth Step ---------------------- */}
      {step === FormSteps.TINTAE && <FourthStep dataCheck={dataCheck} />}
    </div>
  );
}
