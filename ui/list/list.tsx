import { MouseEventHandler } from "react";
import "./list.scss";

const List = ({
  elements,
  color = "normal",
  extraAction,
}: {
  elements: string[];
  color?: "normal" | "subtle";
  extraAction?: (value: string) => void;
}) => {
  const handleChange = (event: any) => {
    const value = event.target.getAttribute("li-value");
    if (extraAction) extraAction(value);
  };

  return (
    <ul>
      {elements.map((element, i) =>
        i === 0 ? (
          <li
            className="list-element list-element--first"
            key={element}
            li-value={element}
            onClick={handleChange}
          >
            {element}
          </li>
        ) : (
          <li
            className={`list-element list-element--${color}`}
            key={element}
            li-value={element}
            onClick={handleChange}
          >
            {element}
          </li>
        )
      )}
    </ul>
  );
};

export default List;
