import Nav from "@/components/nav/nav";
import Footer from "@/components/footer/footer";
import Image from "next/image";
import "./page.scss";
import Button from "@/ui/button/button";
import Text from "@/ui/text/text";
import Spacer from "@/ui/spacer/spacer";

export default function Home() {
  return (
    <main className="main-container">
      <Nav />

      <div className="home-container">
        <Spacer size="xhuge" />

        <Image
          src="/assets/home-logo.png"
          alt="User Logo"
          height="151"
          width="151"
        />

        <Spacer size="huge" />

        <Text preset="headline4" text="Calculadora de hipotecas" />

        <Spacer size="medium" />

        <Text
          preset="small"
          align="align-center"
          text="Calcula gratis y rápidamente el costo
total, incluyendo hipoteca y gastos asociados. Toma decisiones informadas y confía en tu futuro. "
        />

        <Spacer size="xhuge" />
        <div>
          <div className="home-detail-box">
            <div className="home-detail-box__left">
              <Image
                src="/assets/money.png"
                alt="Money Logo"
                height="18"
                width="18"
              ></Image>
            </div>
            <div className="home-detail-box__right">
              <Text preset="small" text="Herramienta gratuita" />
              <Text
                preset="smaller"
                color="subtle"
                text="Calcular tu hipoteca es gratis."
              />
            </div>
          </div>
          <div className="home-detail-box">
            <div className="home-detail-box__left">
              <Image
                src="/assets/pen.png"
                alt="Money Logo"
                height="18"
                width="18"
              ></Image>
            </div>
            <div className="home-detail-box__right">
              <Text preset="small" text="En poco pasos." />
              <Text
                preset="smaller"
                color="subtle"
                text="En solo 4 pasos tendrás los resultados."
              />
            </div>
          </div>
          <div className="home-detail-box">
            <div className="home-detail-box__left">
              <Image
                src="/assets/sheet.png"
                alt="Money Logo"
                height="18"
                width="18"
              ></Image>
            </div>
            <div className="home-detail-box__right">
              <Text preset="small" text="Análisis detallado." />
              <Text
                preset="smaller"
                color="subtle"
                text="¡Que no se te escape ni un solo gasto!"
              />
            </div>
          </div>
        </div>
        <Spacer size="xhuge" />
        <Button text="Empezar" preset="primary" size="medium"></Button>
      </div>

      <Footer />
    </main>
  );
}
