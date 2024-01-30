import "./footer.scss";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="footer">
      <Image
        src="/assets/publi.png"
        alt="Publicidad"
        fill
        sizes="100vw"
        style={{
          objectPosition: "center"
        }} />
    </footer>
  );
};

export default Footer;
