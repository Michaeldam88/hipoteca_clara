import Image from "next/image";
import "./landing.scss";
import Button from "@/ui/button/button";
import Text from "@/ui/text/text";
import Spacer from "@/ui/spacer/spacer";
import Link from "next/link";

export default function Landing() {
  return (
    <div className="landing-container">
            
      <Image
        src="/assets/landing-logo.png"
        alt="Landing Logo"
        height="136"
        width="136"
      />

      <Spacer size="huge" />

      <Text preset="headline4" text="Calculadora de hipotecas" />

      <Spacer size="huge" />

      <Text
        preset="small"
        align="align-center"
        text="Calcula gratis y rápidamente el costo
total, incluyendo hipoteca y gastos asociados. Toma decisiones informadas y confía en tu futuro. "
      />

      <Spacer size="huge" />
      <div>
        <div className="landing-detail-box">
          <div className="landing-detail-box__left">
            <Image
              src="/assets/money.png"
              alt="Money Logo"
              height="18"
              width="18"
            ></Image>
          </div>
          <div className="landing-detail-box__right">
            <Text preset="small" text="Herramienta gratuita" />
            <Text
              preset="smaller"
              color="ultra-subtle"
              text="Calcular tu hipoteca es gratis."
            />
          </div>
        </div>
        <div className="landing-detail-box">
          <div className="landing-detail-box__left">
            <Image
              src="/assets/pen.png"
              alt="Money Logo"
              height="18"
              width="18"
            ></Image>
          </div>
          <div className="landing-detail-box__right">
            <Text preset="small" text="En poco pasos." />
            <Text
              preset="smaller"
              color="ultra-subtle"
              text="En solo 4 pasos tendrás los resultados."
            />
          </div>
        </div>
        <div className="landing-detail-box">
          <div className="landing-detail-box__left">
            <Image
              src="/assets/sheet.png"
              alt="Money Logo"
              height="18"
              width="18"
            ></Image>
          </div>
          <div className="landing-detail-box__right">
            <Text preset="small" text="Análisis detallado." />
            <Text
              preset="smaller"
              color="ultra-subtle"
              text="¡Que no se te escape ni un solo gasto!"
            />
          </div>
        </div>
      </div>

      <Spacer size="enormous" />

      <Link className="start-link" href="/form">
        <Button text="Empezar" preset="primary" size="medium" />
      </Link>
    </div>
  );
}
