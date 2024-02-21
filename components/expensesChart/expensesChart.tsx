import { useStepStore } from "@/store/zustand";
import DonutsChart from "@/ui/donutChart/donutChart";
import Spacer from "@/ui/spacer/spacer";
import data from "../../data/rates.json";
import ResumeList from "@/ui/resumeList/resumeList";
import { useEffect } from "react";

const ExpensesChart = ({}: {}) => {
  const {
    amountFinanced,
    province,
    housePrice,
    isNewRadioOption,
    setTotalExpenses,
  } = useStepStore();

  const provinceData = data["autonomous-region"]?.find(
    (element) => element.name === province
  );

  const expensesData = [
    {
      color: "#193a48",
      firstValue: +housePrice - amountFinanced,
      secondValue: `Parte no financiada ${(
        (1 - amountFinanced / +housePrice) *
        100
      ).toFixed(0)}%`,
    },
    {
      color: "#F3B14E",
      firstValue:
        isNewRadioOption === "Si"
          ? +housePrice * 0.1
          : (+housePrice * (provinceData?.["itp-prcg"] || 0)) / 100,
      secondValue:
        isNewRadioOption === "Si"
          ? "Impuestos IVA 10%"
          : `Impuestos ITP ${provinceData?.["itp-prcg"]}%`,
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

  useEffect(() => {
    setTotalExpenses(totalExpenses);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
            <div className="donutChart-info__sub-title">
              {new Intl.NumberFormat("es-ES", {
                maximumFractionDigits: 2,
                style: "currency",
                currency: "EUR",
              }).format(totalExpenses)}
            </div>
          </>
        }
      />
      <Spacer size="huge" />
      <ResumeList data={expensesData} />
    </div>
  );
};

export default ExpensesChart;
