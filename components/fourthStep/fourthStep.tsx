import { FormSteps } from "@/app/form/page";
import { useStepStore } from "@/store/zustand";
import Input from "@/ui/customInput/input";
import RangeInput from "@/ui/rangeInput/rangeInput";
import Spacer from "@/ui/spacer/spacer";
import { useState } from "react";
import Text from "@/ui/text/text";
import Button from "@/ui/button/button";

const FourthStep = ({
  dataCheck,
}: {
  dataCheck: (nextStep: FormSteps) => void;
}) => {
  const {
    mortgageOption,
    yearsMortgage,
    setYearsFixedMortgage,
    yearsFixedMortgage,
    setFixedTin,
    fixedTin,
    setFixedTae,
    fixedTae,
    setVariableTin,
    variableTin,
    setVariableTae,
    variableTae,
  } = useStepStore();

  return (
    <div>
      {mortgageOption === "Mixta" && (
        <>
          <RangeInput
            name="yearsFixedMortgage"
            setValue={setYearsFixedMortgage}
            value={yearsFixedMortgage}
            step={1}
            min={1}
            max={yearsMortgage - 1}
            labelText="Años de hipoteca fija"
            bottomFormattedValue={yearsFixedMortgage}
            bottomStartFormattedValue={1}
            bottomEndFormattedValue={yearsMortgage - 1}
          />
          <Spacer size="giant" />
        </>
      )}

      <Text
        preset="smaller"
        text={
          mortgageOption === "Mixta"
            ? "Parte Fija"
            : mortgageOption === "Variable"
            ? "Primer año"
            : ""
        }
      />

      <Spacer size="smaller" />

      <Input
        type="number"
        placeholder="TIN"
        setValue={setFixedTin}
        value={fixedTin}
        right="%"
        decimals={1}
      />

      <Spacer size="smaller" />

      <Input
        type="number"
        placeholder="TAE"
        setValue={setFixedTae}
        value={fixedTae}
        right="%"
        decimals={1}
      />

      <Spacer size="large" />

      {mortgageOption !== "Fija" && (
        <>
          <Text preset="smaller" text="Resto de años" />

          <Spacer size="smaller" />
          <Input
            type="number"
            placeholder="TIN"
            setValue={setVariableTin}
            value={variableTin}
            right="% + Euribor"
            decimals={1}
          />

          <Spacer size="smaller" />

          <Input
            type="number"
            placeholder="TAE"
            setValue={setVariableTae}
            value={variableTae}
            right="% + Euribor"
            decimals={1}
          />
        </>
      )}
      <div className="form-button">
        <Button
          text="Continuar"
          preset="primary"
          size="medium"
          onClick={() => dataCheck(FormSteps.TINTAE)}
        />
      </div>
    </div>
  );
};

export default FourthStep;
