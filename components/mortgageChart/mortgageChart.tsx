import Spacer from "@/ui/spacer/spacer";
import DonutsChart from "../../ui/donutChart/donutChart";
import ResumeList from "../../ui/resumeList/resumeList";
import Text from "../../ui/text/text";
import { useStepStore } from "@/store/zustand";
import { useEffect } from "react";

const MortgageChart = ({}: {}) => {
  const {
    amountFinanced,
    mortgageOption,
    fixedTin,
    fixedTae,
    variableTin,
    yearsMortgage,
    yearsFixedMortgage,
    setMortgageResults,
  } = useStepStore();

  const euribor = 3.648;

  function calculateMortgage(
    loanAmount: number,
    tin: number,
    tae: number,
    periods: number
  ) {
    const monthlyTinInterestRate = tin / 12 / 100;
    const totalPeriods = periods * 12;

    const monthlyTinPayment =
      loanAmount *
      (monthlyTinInterestRate /
        (1 - Math.pow(1 + monthlyTinInterestRate, -periods * 12)));

    const monthlyTaeInterestRate = tae / 12 / 100;
    const monthlyTaePayment =
      loanAmount *
      (monthlyTaeInterestRate /
        (1 - Math.pow(1 + monthlyTaeInterestRate, -totalPeriods)));

    const totalPaidTin = monthlyTinPayment * totalPeriods;
    const totalPaidTae = monthlyTaePayment * totalPeriods;

    return {
      monthlyTinPayment: monthlyTinPayment,
      monthlyTaePayment: monthlyTaePayment,
      totalPaidTin: totalPaidTin,
      totalPaidTae: totalPaidTae,
      totalPeriods: totalPeriods,
    };
  }

  function findInterestRate(
    loanAmount: number,
    monthlyPayment: number,
    periods: number
  ) {
    let annualInterestRate = 0;
    let monthlyInterestRate = 0;
    let tolerance = amountFinanced * 0.0001; // Tolerance for comparison

    // Start with an initial guess for the interest rate
    for (
      annualInterestRate = +variableTin + euribor;
      annualInterestRate < 20;
      annualInterestRate += 0.01
    ) {
      monthlyInterestRate = annualInterestRate / 12 / 100;

      // Calculate the monthly payment using the guessed interest rate
      let calculatedPayment =
        loanAmount *
        (monthlyInterestRate /
          (1 - Math.pow(1 + monthlyInterestRate, -periods)));

      // Check if the calculated payment is close enough to the known payment
      if (Math.abs(calculatedPayment - monthlyPayment) < tolerance) {
        // If it is, break out of the loop and return the interest rate
        break;
      }
    }

    return annualInterestRate.toFixed(2);
  }

  const mortgageResults = calculateMortgage(
    amountFinanced,
    +fixedTin,
    +fixedTae,
    yearsMortgage
  );

  const variableMortgageResults = calculateMortgage(
    amountFinanced,
    +variableTin + euribor,
    +fixedTae,
    yearsMortgage
  );

  const variableInterestRate = findInterestRate(
    amountFinanced,
    variableMortgageResults.monthlyTinPayment +
      mortgageResults.monthlyTaePayment -
      mortgageResults.monthlyTinPayment,
    mortgageResults.totalPeriods
  );

  const mortgageData = [
    {
      color: "#F3B14E",
      firstValue: mortgageResults.monthlyTinPayment,
      secondValue: `Cuota Mensual (TIN ${fixedTin}%)`,
    },
    {
      color: "#193A48",
      firstValue:
        mortgageResults.monthlyTaePayment - mortgageResults.monthlyTinPayment,
      secondValue: `Seguros y Gastos (TAE ${fixedTae}%)`,
    },
  ];

  const variableMortgageData = [
    {
      color: "#4F7476",
      firstValue: variableMortgageResults.monthlyTinPayment,
      secondValue: `Cuota Mensual (Tin ${variableTin}% + Euribor ${euribor.toFixed(
        2
      )}%)`,
    },
    {
      color: "#87A1A2",
      firstValue:
        mortgageResults.monthlyTaePayment - mortgageResults.monthlyTinPayment,
      secondValue: `Seguros y Gastos (TAE Variable ${variableInterestRate}%)`,
    },
  ];

  const totalMortgage =
    mortgageOption === "Fija"
      ? mortgageResults.totalPaidTae
      : mortgageResults.totalPaidTae -
        mortgageResults.totalPaidTin +
        (mortgageResults.totalPaidTin / yearsMortgage) * yearsFixedMortgage +
        (variableMortgageResults.totalPaidTin / yearsMortgage) *
          (yearsMortgage - yearsFixedMortgage);

  useEffect(() => {
    setMortgageResults(mortgageResults);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="data-container">
      <Spacer size="huge" />
      <DonutsChart
        data={variableMortgageData}
        width={180}
        strokeColor="#fff"
        innerRadius={0.65}
        strokeSize={2}
        innerElem={
          <>
            <div className="donutChart-info__title">Total</div>
            <div className="donutChart-info__sub-title">
              {new Intl.NumberFormat("es-ES", {
                maximumFractionDigits: 2,
                style: "currency",
                currency: "EUR",
              }).format(totalMortgage)}
            </div>
          </>
        }
      />
      <Spacer size="huge" />
      {mortgageOption !== "Fija" && (
        <p className="mortgageChart-text">
          {" "}
          Parte Fija ({yearsFixedMortgage}{" "}
          {yearsFixedMortgage > 1 ? "años" : "año"})
        </p>
      )}
      <ResumeList data={mortgageData} />

      <Spacer size="small" />
      {mortgageOption !== "Fija" && (
        <>
          <p className="mortgageChart-text">
            {" "}
            Parte Variable ({yearsMortgage - yearsFixedMortgage}{" "}
            {yearsMortgage - yearsFixedMortgage > 1 ? "años" : "año"})
          </p>
          <ResumeList data={variableMortgageData} />
        </>
      )}
      <div className="total-amount">
        <p className="total-amount__text">{`Total a devolver en ${mortgageResults.totalPeriods} cuotas`}</p>
        <p className="total-amount__price">
          {new Intl.NumberFormat("es-ES", {
            maximumFractionDigits: 2,
            style: "currency",
            currency: "EUR",
          }).format(totalMortgage)}
        </p>
      </div>
    </div>
  );
};

export default MortgageChart;
