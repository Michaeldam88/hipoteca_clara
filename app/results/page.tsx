import ResumeList from "@/components/resumeList/resumeList";
import Spacer from "@/ui/spacer/spacer";
import Text from "@/ui/text/text";
import "./results.scss";

export default function Results() {
  const resumeData = [
    { color: "red", firstValue: "542€", secondValue: "Cuota mensual" },
    { color: "green", firstValue: "35€", secondValue: "De los cuales Seguros y Gastos (TAE)" },
  ];

  return (
    <div className="results-container">
      <Text preset="headline4" text="Hipoteca" />
      <Spacer size="huge" />
      <div className="data-container">
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
