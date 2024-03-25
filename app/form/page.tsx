"use client";

import Stepper from "@/ui/stepper/stepper";
import "./form.scss";
import { useEffect, useState } from "react";
import Spacer from "@/ui/spacer/spacer";
import PopUp from "@/ui/popUp/popUp";
import { useStepStore, initializeFromSessionStorage } from "@/store/zustand";
import FirstStep from "@/components/firstStep/firstStep";
import SecondStep from "@/components/secondStep/secondStep";
import ThirdStep from "@/components/thirdStep/thirdStep";
import FourthStep from "@/components/fourthStep/fourthStep";
import { FormSteps } from "../types";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "@/ui/icons";

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
      setPopUp("Por favor selecciona si la vivienda es nueva.");
      return;
    }

    if (step === FormSteps.PROVINCE && !isPricedRadioOption) {
      setPopUp("Por favor seleccione si la vivienda está tasada.");
      return;
    }

    if (step === FormSteps.PROVINCE && !province) {
      setPopUp("Por favor seleccione una comunidad.");
      return;
    }

    //checks second step
    if (step === FormSteps.PRICE && !housePrice) {
      setPopUp("Por favor indique el precio de la vivienda.");
      return;
    }

    if (
      step === FormSteps.PRICE &&
      isPricedRadioOption === "Si" &&
      !appraisalPrice
    ) {
      setPopUp("Por favor indique el precio de tasación de la vivienda.");
      return;
    }

    if (step === FormSteps.PRICE && !amountFinanced) {
      setPopUp("Por favor indique el importe a financiar.");
      return;
    }

    //checks third step

    if (step === FormSteps.MORTGAGE_TYPE && !mortgageOption) {
      setPopUp("Por favor indique el tipo de financiación.");
      return;
    }

    //checks fourth step

    if (step === FormSteps.TINTAE && !fixedTin) {
      setPopUp("Por favor indique el TIN fijo.");
      return;
    }

    if (step === FormSteps.TINTAE && !fixedTae) {
      setPopUp("Por favor indique el TAE fijo.");
      return;
    }

    if (
      step === FormSteps.TINTAE &&
      mortgageOption !== "Fija" &&
      !variableTin
    ) {
      setPopUp("Por favor indique el TIN variable.");
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
      {step !== FormSteps.PROVINCE && (
        <>
          <div className="form-container__go-back" onClick={previousStep}>
            <ArrowLeft />
          </div>
        </>
      )}
      <Stepper<FormSteps> steps={steps} activeStep={step} />
      <Spacer size="huge" />
      {popUp && (
        <PopUp handleClose={() => setPopUp("")} text={popUp} title="Upps!" />
      )}

      {/* first Step ---------------------- */}
      {step === FormSteps.PROVINCE && <FirstStep dataCheck={dataCheck} />}

      {/* Second Step ---------------------- */}
      {step === FormSteps.PRICE && (
        <SecondStep setPopUp={setPopUp} dataCheck={dataCheck} />
      )}

      {/* Third Step ---------------------- */}
      {step === FormSteps.MORTGAGE_TYPE && (
        <ThirdStep dataCheck={dataCheck} />
      )}

      {/* Fourth Step ---------------------- */}
      {step === FormSteps.TINTAE && (
        <FourthStep setPopUp={setPopUp} dataCheck={dataCheck} />
      )}
    </div>
  );
}
