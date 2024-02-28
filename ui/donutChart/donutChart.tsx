import * as d3 from "d3";
import { ReactNode, useEffect, useRef } from "react";
import "./donutChart.scss";

const DonutsChart = ({
  
  width,
  data,
  type = "full",
  innerRadius = 0,
  padAngle = 0,
  strokeSize = 0,
  strokeColor,
  innerElem = "",
}: {
  
  width: number;
  data: { color: string; firstValue: number; secondValue: string }[];
  type?: "full" | "semi";
  innerRadius?: number;
  padAngle?: number;
  strokeColor?: string;
  strokeSize?: number;
  innerElem?: ReactNode;
}) => {
  const color = d3
    .scaleOrdinal()
    .domain(data.map((d) => d.firstValue.toString()))
    .range(data.map((d) => d.color));

  const height = type === "full" ? width : width / 2;
  const radius = width / 2;

  innerRadius = innerRadius > 1 ? 1 : innerRadius;
  innerRadius = innerRadius < 0 ? 0 : innerRadius;

  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const pie = d3
      .pie()
      .padAngle(padAngle)
      .startAngle(type === "full" ? 0 : Math.PI)
      .sort((a, b) => a.firstValue - b.firstValue)
      .value((d) => d.firstValue);

    svg
      .append("g")
      .selectAll()
      .data(pie(data))
      .join("path")
      .attr(
        "d",
        d3
          .arc()
          .innerRadius(innerRadius * radius)
          .outerRadius(radius)
      )
      .attr("id", "item")
      .attr(
        "transform",
        `rotate(${type === "full" ? "0" : "90"} 0 0) translate(${
          type === "full" ? 0 : radius / 2
        } 0)`
      )
      .attr("fill", (d) => color(d.data.firstValue))
      .attr("stroke", strokeColor ? strokeColor : (d) => color(d))
      .style("stroke-width", `${strokeSize}px`);
  });

  return (
    <div className={"donutChart-container"}>
      {innerElem && (
        <div
          className={"donutChart-info"}
          style={{
            alignItems: type === "full" ? "center" : "end",
          }}
        >
          {innerElem}
        </div>
      )}
      <svg
        ref={svgRef}
        width={width}
        height={height}
        viewBox={[-width / 2, -height / 2, width, height].join(" ")}
        style={{ maxWidth: "100%", height: "auto" }}
      ></svg>
    </div>
  );
};

export default DonutsChart;
