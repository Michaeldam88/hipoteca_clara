import "./list.scss";

const List = ({
  elements,
  color = "normal",
  extraAction,
}: {
  elements: {
    id: number;
    value: string;
  }[];
  color?: "normal" | "subtle";
  extraAction?: (value: string) => void;
}) => {
  return (
    <ul>
      {elements.map((element, i) => (
        <li
          className={
            i === 0
              ? "list-element list-element--first"
              : `list-element list-element--${color}`
          }
          key={element.id}
          onClick={() => {
            if (extraAction) extraAction(element.value);
          }}
        >
          {element.value}
        </li>
      ))}
    </ul>
  );
};

export default List;
