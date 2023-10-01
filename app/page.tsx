"use client";

import Link from "next/link";
import "./page.scss";

export default function Home() {
  //const [modal, setModal] = useState(false);
  //const [startClosingModal, setStartClosingModal] = useState(false);

  return (
    <main>
      <Link href="/seeComponents">See components</Link>
    </main>
  );
}
