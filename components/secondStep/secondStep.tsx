import { FormSteps } from "@/app/types";
import { useStepStore } from "@/store/zustand";
import Button from "@/ui/button/button";
import Input from "@/ui/customInput/input";
import RangeInput from "@/ui/rangeInput/rangeInput";
import Spacer from "@/ui/spacer/spacer";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const SecondStep = ({
  dataCheck,
  setPopUp,
}: {
  dataCheck: (nextStep: FormSteps) => void;
  setPopUp: Dispatch<SetStateAction<string>>;
}) => {
  const {
    isPricedRadioOption,
    housePrice,
    appraisalPrice,
    amountFinanced,
    yearsMortgage,
    setHousePrice,
    setAppraisalPrice,
    setAmountFinanced,
    setYearsMortgage,
  } = useStepStore();

  const [mortgagePercentage, setMortgagePercentage] = useState(0);

  const getMortgagePercentage = (value: number) => {
    setMortgagePercentage(Math.round(value));
  };

  const setError = (error: string) => {
    setPopUp(error);
  };

  useEffect(() => {
    const newMaxAmount =
      appraisalPrice &&
      +appraisalPrice < +housePrice &&
      isPricedRadioOption === "Si"
        ? +appraisalPrice
        : +housePrice;
    const amountPercentage = (newMaxAmount * mortgagePercentage) / 100;

    if (amountPercentage) setAmountFinanced(amountPercentage);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [housePrice, appraisalPrice]);

  return (
    <div>
      <Spacer size="small" />
      <Input
        type="text"
        label="Precio Vivienda"
        setValue={setHousePrice}
        value={housePrice}
        right="€"
        moneyFormat={true}
        min={10000}
        setError={setError}
      />

      {isPricedRadioOption === "Si" && (
        <>
          <Spacer size="huge" />
          <Input
            type="text"
            label="Valor de la Tasación"
            setValue={setAppraisalPrice}
            value={appraisalPrice}
            right="€"
            moneyFormat={true}
            setError={setError}
            min={10000}
          />
        </>
      )}

      <Spacer size="xhuge" />
      <RangeInput
        name="amountFinanced"
        setValue={setAmountFinanced}
        value={amountFinanced}
        max={
          appraisalPrice &&
          +appraisalPrice < +housePrice &&
          isPricedRadioOption === "Si"
            ? +appraisalPrice
            : +housePrice
        }
        step={100}
        labelText="Importe a financiar"
        topEndFormattedValue={new Intl.NumberFormat("es-ES", {
          maximumFractionDigits: 0,
          style: "currency",
          currency: "EUR",
        }).format(amountFinanced)}
        getPercentage={getMortgagePercentage}
        topFormattedValue={`${mortgagePercentage} %`}
        limitColor={true}
        limitColorMin={20}
        limitColorMax={80}
      />
      <Spacer size="medium" />
      <RangeInput
        name="yearsMortgage"
        setValue={setYearsMortgage}
        value={yearsMortgage}
        step={1}
        min={9}
        max={40}
        labelText="Años de financiación"
        topFormattedValue={yearsMortgage}
        bottomStartFormattedValue={9}
        bottomEndFormattedValue={40}
      />
      <Spacer size="enormous" />
      <Spacer size="small" />
      <div className="button-on-bottom">
        <Button
          text="Continuar"
          preset="primary"
          size="medium"
          onClick={() => dataCheck(FormSteps.MORTGAGE_TYPE)}
        />
      </div>
    </div>
  );
};

export default SecondStep;
