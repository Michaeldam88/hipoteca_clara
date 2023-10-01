import "./text.scss";

export type TextPreset =
  | "headline1"
  | "headline2"
  | "headline3"
  | "headline4"
  | "headline5"
  | "headline6"
  | "link"
  | "lead"
  | "body"
  | "small"
  | "smaller";

interface TextProps {
  preset: TextPreset;
  text: String;
  weight?: "bold";
  color?: "subtle" | "ultra-subtle";
  transform?: "uppercase" | "capitalize" | "lowercase";
  align?: "align-center" | "align-right";
}

const Text = ({ preset, text, weight, color, transform, align }: TextProps) => {
  const textStyle = [preset, weight, color, transform, align].reduce(
    (acc, currentValue) => (currentValue ? acc + ` --${currentValue}` : acc),
    "--text"
  );

  switch (preset) {
    case "headline1":
      return <h1 className={textStyle}>{text}</h1>;
    case "headline2":
      return <h2 className={textStyle}>{text}</h2>;
    case "headline3":
      return <h3 className={textStyle}>{text}</h3>;
    case "headline4":
      return <h4 className={textStyle}>{text}</h4>;
    case "headline5":
      return <h5 className={textStyle}>{text}</h5>;
    case "headline6":
      return <h6 className={textStyle}>{text}</h6>;

    case "body":
    case "lead":
    case "small":
    case "smaller":
      return <p className={textStyle}>{text}</p>;

    default:
      return <p className={textStyle}>{text}</p>;
  }
};

export default Text;
