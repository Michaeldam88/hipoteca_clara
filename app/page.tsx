"use client";

import Link from "next/link";
import "./page.scss";

export default function Home() {
  return (
    <main className="home-container">
      <Link href="/seeComponents">
        <p style={{ color: "white" }}>See components</p>
      </Link>
    </main>
  );
}
