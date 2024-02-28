import Text from "@/ui/text/text";
import Image from "next/image";
import Link from "next/link";
import "./nav.scss";

const Nav = () => {
  return (
    <nav className="nav">
      <Link href="/">
        <div className="nav__home-logo">
          <Image src="/assets/main-logo.png" alt="Main Logo" fill={true}/>
        </div>
      </Link>

      <div className="nav__text">
        <Text preset="small" text="Hipoteca Clara" weight="bold" />
      </div>
      {/* <Link href="/">
        <div className="nav__user-logo">
          <Image src="/assets/user-logo.png" alt="User Logo" fill={true} />
        </div>
      </Link> */}
    </nav>
  );
};

export default Nav;
