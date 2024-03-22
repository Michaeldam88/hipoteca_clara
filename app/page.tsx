/* eslint-disable @next/next/no-img-element */
"use client";
import "./landing.scss";
import Image from "next/image";
import Button from "@/ui/button/button";
import Text from "@/ui/text/text";
import Spacer from "@/ui/spacer/spacer";
import { useRouter } from "next/navigation";

export default function Landing() {
  const router = useRouter();

  return (
    <div className="landing-container">
      <img
        src="/assets/landing-logo.png"
        width="100%"
        alt="Landing Logo"
        className="landing-container__logo"
      />
      <Text preset="headline4" text="Calculadora de hipotecas" />
      <Spacer size="huge" />
      <Text
        preset="small"
        align="align-center"
        text="Calcula gratis y rápidamente el costo total, incluyendo hipoteca y gastos asociados. Toma decisiones informadas y confía en tu futuro. "
      />
      <Spacer size="huge" />
      <div>
        <div className="landing-detail-box">
          <div className="landing-detail-box__left">
            <Image
              src="/assets/money.png"
              alt="Money Logo"
              height="32"
              width="32"
              unoptimized
            />
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
              height="32"
              width="32"
              unoptimized
            />
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
              height="32"
              width="32"
              unoptimized
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

      <div className="button-on-bottom">
        <Button
          onClick={() => router.push("/form")}
          text="Empezar"
          preset="primary"
          size="medium"
        />
      </div>
    </div>
  );
}
