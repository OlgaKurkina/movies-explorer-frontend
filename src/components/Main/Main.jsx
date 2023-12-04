import React from "react";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProjeсt";
import AboutMe from "../AboutMe/AboutMe";
import Techs from "../Techs/Techs";

export default function Main() {
  return (
    <main className="landing">
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
    </main>
  );
}
