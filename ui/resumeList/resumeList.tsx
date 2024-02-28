import "./resumeList.scss";

const ResumeList = ({
  data,
}: {
  data: {
    color: string;
    firstValue: number;
    secondValue: string;
  }[];
}) => {
  return (
    <ul className="resume-list">
      {data.map((element, i) => (
        <li
          className={
            i === 0
              ? "list-element__container list-element__container--first"
              : "list-element__container"
          }
          key={element.color}
        >
          <div
            className="list-element__bullet"
            style={{ backgroundColor: element.color }}
          ></div>
          <div>
            <p className="list-element__firstValue">
              {new Intl.NumberFormat("es-ES", {
                maximumFractionDigits: 2,
                style: "currency",
                currency: "EUR",
              }).format(element.firstValue)}
            </p>
            <p className="list-element__secondValue">{element.secondValue}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ResumeList;
