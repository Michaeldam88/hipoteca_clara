import ResumeList from "@/components/resumeList/resumeList";
import Spacer from "@/ui/spacer/spacer";
import Text from "@/ui/text/text";
import "./results.scss";
import DonutsChart from "@/components/donutChart/donutChart";

export default function Results() {
  const resumeData = [
    { color: "#193A48", firstValue: "300", secondValue: "Cuota mensual" },
    {
      color: "#87A1A2",
      firstValue: "150",
      secondValue: "De los cuales Seguros y Gastos (TAE)",
    },
    {
      color: "#F3B14E",
      firstValue: "450",
      secondValue: "De los cuales Seguros y Gastos (TAE)",
    },
    {
      color: "#4F7476",
      firstValue: "50",
      secondValue: "De los cuales Seguros y Gastos (TAE)",
    },
  ];

  return (
    <div className="results-container">
      <Text preset="headline4" text="Hipoteca" />
      <Spacer size="huge" />
      <div className="data-container">
        <Spacer size="huge" />
        <DonutsChart
          chartName="Total-Amount"
          data={resumeData}
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
        <ResumeList data={resumeData} />
        <div className="total-amount">
          <p className="total-amount__text">Total a devolver x cuotas</p>
          <p className="total-amount__price">134.321,23€</p>
        </div>
      </div>
      <Text preset="headline4" text="Gastos asociados a la compra" />
      <Spacer size="huge" />
      <div className="data-container"></div>
      <Text preset="headline4" text="Resumen" />
      <Spacer size="huge" />
      <div className="data-container"></div>
      <Spacer size="huge" />
      <div className="new-search-container"></div>
    </div>
  );
}
