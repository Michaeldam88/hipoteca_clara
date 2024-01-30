import "./footer.scss";
import Image from "next/legacy/image";

const Footer = () => {
  return (
    <footer className="footer">
      <Image
        src="/assets/publi.png"
        alt="Publicidad"
        layout="fill"
        objectPosition="center"
      />
    </footer>
  );
};

export default Footer;
