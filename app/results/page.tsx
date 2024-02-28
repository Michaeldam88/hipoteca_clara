"use client";

import "./results.scss";
import Spacer from "@/ui/spacer/spacer";
import Text from "@/ui/text/text";
import MortgageChart from "@/components/mortgageChart/mortgageChart";
import ExpensesChart from "@/components/expensesChart/expensesChart";
import ResumeChart from "@/components/resumeChart/resumeChart";
import NewSearchChart from "@/components/newSearchChart/newSearchChart";

export default function Results() {
  return (
    <div className="results-container">
      <Text preset="headline4" text="Hipoteca" />
      <Spacer size="large" />
      <MortgageChart />
      <Spacer size="xhuge" />

      <Text preset="headline4" text="Gastos no financiables" />
      <Spacer size="large" />
      <ExpensesChart />
      <Spacer size="xhuge" />

      <Text preset="headline4" text="Resumen" />
      <Spacer size="large" />
      <ResumeChart />
      <Spacer size="huge" />

      <NewSearchChart />

      <Spacer size="huge" />
    </div>
  );
}
