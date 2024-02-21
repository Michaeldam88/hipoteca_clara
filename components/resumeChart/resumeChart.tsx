import { useStepStore } from "@/store/zustand";
import ResumeList from "@/ui/resumeList/resumeList";

const ResumeChart = ({}: {}) => {
  const {
    amountFinanced,
    mortgageResults,
    housePrice,
    totalExpenses,
  } = useStepStore();

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
    <div className="data-container">
      <ResumeList data={resumeData} />
    </div>
  );
};

export default ResumeChart;
