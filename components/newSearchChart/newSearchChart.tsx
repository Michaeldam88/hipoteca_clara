"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
const NewSearchChart = () => {
  const router = useRouter();

  return (
    <div className="data-container">
      <ul className="newSearch-listContainer">
        <li className="newSearch-listElement newSearch-listElement--first">
          <>
            <p>Nuevo cálculo</p>
            <Image
              src="/assets/newSearch.png"
              alt="Nuevo cálculo Logo"
              height="30"
              width="30"
            ></Image>
          </>
        </li>
        <li
          className="newSearch-listElement"
          onClick={() => router.push("/form")}
        >
          <p>Editar datos</p>
          <Image
            src="/assets/editSearch.png"
            alt="Editar datos Logo"
            height="24"
            width="24"
          ></Image>
        </li>
        <li className="newSearch-listElement">
          <p>Guardar</p>
          <Image
            src="/assets/saveSearch.png"
            alt="Guardar Logo"
            height="30"
            width="30"
          ></Image>
        </li>
      </ul>
    </div>
  );
};

export default NewSearchChart;
