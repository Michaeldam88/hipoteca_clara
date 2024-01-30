import { FormSteps } from "@/app/form/page";
import { useStepStore } from "@/store/zustand";
import Button from "@/ui/button/button";
import Input from "@/ui/customInput/input";
import RangeInput from "@/ui/rangeInput/rangeInput";
import Spacer from "@/ui/spacer/spacer";
import { useState } from "react";

const SecondStep = ({
  dataCheck,
}: {
  dataCheck: (nextStep: FormSteps) => void;
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

  return (
    <div>
      <Input
        type="text"
        label="Precio Vivienda"
        setValue={setHousePrice}
        value={housePrice}
        right="€"
        moneyFormat={true}
      />
      {isPricedRadioOption === "Si" && (
        <>
          <Spacer size="xhuge" />
          <Input
            type="text"
            label="Valor de la Tasación"
            setValue={setAppraisalPrice}
            value={appraisalPrice}
            right="€"
            moneyFormat={true}
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
        step={1}
        labelText="Importe a financiar"
        topFormattedValue={new Intl.NumberFormat("es-ES", {
          maximumFractionDigits: 0,
          style: "currency",
          currency: "EUR",
        }).format(amountFinanced)}
        setPercentage={getMortgagePercentage}
        bottomFormattedValue={`${mortgagePercentage} %`}
        limitColor={true}
        limitColorMin={20}
        limitColorMax={80}
      />
      <Spacer size="giant" />
      <RangeInput
        name="yearsMortgage"
        setValue={setYearsMortgage}
        value={yearsMortgage}
        step={1}
        min={9}
        max={40}
        labelText="Años de financiación"
        bottomFormattedValue={yearsMortgage}
        bottomStartFormattedValue={9}
        bottomEndFormattedValue={40}
      />

      <div className="form-button">
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