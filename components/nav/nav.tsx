import Text from "@/ui/text/text";
import Image from "next/image";
import Link from "next/link";
import "./nav.scss";

const Nav = () => {
  return (
    <nav className="nav">
      <Link href="/">
        <Image
          src="/assets/main-logo.png"
          width="32"
          height="29"
          alt="Main Logo"
        />
      </Link>
      
      <div className="nav__text">
        <Text preset="small" text="Hipoteca Clara" weight="bold" />
      </div>

      <Link href="/seeComponents">
        <div className="nav__user-logo">
          <Image
            src="/assets/user-logo.png"
            alt="User Logo"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
      </Link>

    </nav>
  );
};

export default Nav;
