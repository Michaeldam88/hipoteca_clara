import './nav.scss';
import Text from '@/ui/text/text';
import Link from 'next/link';
import { Logo } from '../logo/logo';

const Nav = () => {
  return (
    <>
      <nav className='nav'>
        <div className='nav__content'>
          <Link href='/'>
            <div className='nav__home-logo'>
              {/* <Image src='/assets/main-logo.png' alt='Main Logo' fill={true} /> */}
              <Logo />
            </div>
          </Link>
          <div className='nav__text'>
            <Text preset='headline5' text='Hipoteca Clara' weight='bold' />
          </div>
          {/* <Link href="/">
        <div className="nav__user-logo">
          <Image src="/assets/user-logo.png" alt="User Logo" fill={true} />
        </div>
      </Link> */}
        </div>
      </nav>
      <div className='nav-ghost'></div>
    </>
  );
};

export default Nav;
