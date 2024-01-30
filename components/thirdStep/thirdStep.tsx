import { FormSteps } from "@/app/form/page";
import { useStepStore } from "@/store/zustand";
import Button from "@/ui/button/button";
import RadioButton from "@/ui/radioButton/radioButton";

const ThirdStep = ({
  dataCheck,
}: {
  dataCheck: (nextStep: FormSteps) => void;
}) => {
  const { mortgageOption, setMortgageOption } = useStepStore();

  const mortgageOptions = [
    {
      id: 2001,
      label: "Variable",
      subLabel: "Toda la hipoteca con interes variable",
    },
    {
      id: 2002,
      label: "Mixta",
      subLabel: "Primera parte con interes fijo y el resto variable",
    },
    { id: 2003, label: "Fija", subLabel: "Toda la hipoteca con interes fijo " },
  ];

  const getMortgageType = (value: string) => {
    setMortgageOption(value);
  };

  return (
    <div>
      <RadioButton
        name="mortgage-option"
        options={mortgageOptions}
        selectedOption={mortgageOption}
        setOption={getMortgageType}
      />

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

export default ThirdStep;
