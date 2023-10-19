import "./stepper.scss";
import Text from "../text/text";
import Spacer from "../spacer/spacer";

function Stepper<T>({
  steps,
  activeStep,
}: {
  steps: {
    id: T;
    title: string;
    subTitle?: string;
  }[];
  activeStep: T;
}) {
  const current = steps.find((s) => s.id === activeStep);

  const currentPosition =
    steps.findIndex((element) => element.id === activeStep) + 1;

  return (
    <div className="stepper">
      <Text preset="smaller" text={`Paso ${currentPosition}`} color="subtle" />
      <Spacer size="tiny" />
      <Text preset="headline5" text={current?.title || ""} />
      <Spacer size="smaller" />
      <Text preset="small" text={current?.subTitle || ""} />
      <Spacer size="large" />

      <div className="stepper__steps-container">
        {steps.map((element, i) =>
          i <= currentPosition - 1 ? (
            <div
              key={i}
              className="stepper__step stepper__step--completed"
            ></div>
          ) : (
            <div key={i} className="stepper__step"></div>
          )
        )}
      </div>
    </div>
  );
}

export default Stepper;
