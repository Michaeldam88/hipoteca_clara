"use client";

import ResumeList from "@/components/resumeList/resumeList";
import Spacer from "@/ui/spacer/spacer";
import Text from "@/ui/text/text";
import "./results.scss";
import DonutsChart from "@/components/donutChart/donutChart";
import { useStepStore } from "@/store/zustand";
import data from "../../data/rates.json";

export default function Results() {
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
    variableTae,
    yearsMortgage,
  } = useStepStore();

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

  const provinceData = data["autonomous-region"]?.find(
    (element) => element.name === province
  );

  const mortgageResults = calculateMortgage(
    amountFinanced,
    +fixedTin,
    +fixedTae,
    yearsMortgage
  );

  const mortgageData = [
    {
      color: "#F3B14E",
      firstValue: mortgageResults.monthlyTinPayment,
      secondValue:
        mortgageOption === "Fija"
          ? `Cuota Mensual (TIN ${fixedTin}%)`
          : `Cuota Parte Fija (TIN ${fixedTin}%)`,
    },
    {
      color: "#193A48",
      firstValue:
        mortgageResults.monthlyTaePayment - mortgageResults.monthlyTinPayment,
      secondValue: `Intereses y Gastos (TAE ${fixedTae}%)`,
    },
  ];

  const expensesData = [
    {
      color: "#F3B14E",
      firstValue:
        isNewRadioOption === "Si"
          ? +housePrice * 0.1
          : (+housePrice * (provinceData?.["itp-prcg"] || 0)) / 100,
      secondValue:
        isNewRadioOption === "Si" ? "Impuestos IVA 10%" : `Impuestos ITP ${provinceData?.["itp-prcg"]}%`,
    },
    {
      color: "#87A1A2",
      firstValue:
        +housePrice < 100000 ? 1049 : 1049 + (+housePrice * 0.06) / 100,
      secondValue: "Notaria",
    },
    {
      color: "#4F7476",
      firstValue: +housePrice < 100000 ? 494 : 494 + (+housePrice * 0.06) / 100,
      secondValue: "Registro",
    },
    {
      color: "#DDEEEF",
      firstValue: 391,
      secondValue: "Gestoria",
    },
  ];

  const totalExpenses = expensesData.reduce(
    (acc, expense) => acc + expense.firstValue,
    0
  );

  const resumeData = [
    {
      color: "#193A48",
      firstValue: +housePrice,
      secondValue: "Precio Vivienda",
    },
    {
      color: "#3A5561",
      firstValue: amountFinanced,
      secondValue: "Importe a financiar",
    },
    {
      color: "#5B707A",
      firstValue: mortgageResults.totalPaidTae - amountFinanced,
      secondValue: "Intereses y gastos",
    },
    {
      color: "#6c8fa5",
      firstValue: mortgageResults.totalPaidTae,
      secondValue: "Total Hipoteca",
    },
    {
      color: "#96b4cb",
      firstValue: totalExpenses,
      secondValue: "Parte no financiable",
    },
    {
      color: "#DDEEEF",
      firstValue: totalExpenses + mortgageResults.totalPaidTae,
      secondValue: "Total Desembolso",
    },
  ];

  return (
    <div className="results-container">
      {/* Primer Bloque ---------------------- */}
      <Text preset="headline4" text="Hipoteca" />
      <Spacer size="large" />
      <div className="data-container">
        <Spacer size="huge" />
        <DonutsChart
          data={mortgageData}
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
                }).format(mortgageResults.totalPaidTae)}
              </div>
            </>
          }
        />
        <Spacer size="huge" />
        <ResumeList data={mortgageData} />
        <div className="total-amount">
          <p className="total-amount__text">{`Total a devolver en ${mortgageResults.totalPeriods} cuotas`}</p>
          <p className="total-amount__price">
            {new Intl.NumberFormat("es-ES", {
              maximumFractionDigits: 2,
              style: "currency",
              currency: "EUR",
            }).format(mortgageResults.totalPaidTae)}
          </p>
        </div>
      </div>
      <Spacer size="xhuge" />

      {/* Segundo Bloque ---------------------- */}

      <Text preset="headline4" text="Gastos asociados a la compra" />
      <Spacer size="large" />
      <div className="data-container">
        <Spacer size="huge" />
        <DonutsChart
          data={expensesData}
          width={180}
          strokeColor="#fff"
          innerRadius={0.65}
          strokeSize={2}
          innerElem={
            <>
              <div className="donutChart-info__title">Total</div>
              <div className="donutChart-info__sub-title">134.321,23€</div>
            </>
          }
        />
        <Spacer size="huge" />
        <ResumeList data={expensesData} />
      </div>
      <Spacer size="xhuge" />

      {/* Tercer Bloque ---------------------- */}

      <Text preset="headline4" text="Resumen" />
      <Spacer size="large" />
      <div className="data-container">
        <ResumeList data={resumeData} />
      </div>
      <Spacer size="huge" />

      {/* Last Bloque ---------------------- */}

      <div className="new-search-container"></div>
    </div>
  );
}
