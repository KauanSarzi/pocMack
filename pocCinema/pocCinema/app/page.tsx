"use client";
import React, { useState, useEffect } from "react";
import Cabecalho from "./components/Cabecalho/Cabecalho";
import Assento from "./components/Assento/Assento";
import BotaoComprar from "./components/BotaoComprar/BotaoComprar";
import InformacoesFilme from "./components/InformacoesFilme/InformacoesFilme";
import Legendas from "./components/Legenda/Legenda";
import dadosFilme from "./cinema.json";
import "./globals.css";

export default function Home() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    document.body.classList.toggle("dark", prefersDark);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleThemeChange = (e: MediaQueryListEvent) => {
      document.body.classList.toggle("dark", e.matches);
    };

    mediaQuery.addEventListener("change", handleThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange);
    };
  }, []);

  const handleSelect = (isSelected) => {
    setTotal((prev) =>
      isSelected ? prev + dadosFilme.preco : prev - dadosFilme.preco
    );
  };

  return (
    <main className="containerPai">
      <Cabecalho titulo={dadosFilme.titulo} horario={dadosFilme.horario} />

      <article className="containerFilho">
        <section className="grade">
          {dadosFilme.assentos.map((assento) => (
            <Assento
              key={assento.id}
              reservado={assento.reservado}
              onSelect={handleSelect}
            />
          ))}
        </section>

        <InformacoesFilme
          sinopse={dadosFilme.sinopse}
          dataLancamento={dadosFilme.dataLancamento}
          direcao={dadosFilme.direcao}
        />
      </article>

      <div className="tela">
        <h6>tela</h6>
      </div>

      <Legendas />

      <BotaoComprar total={total} />
    </main>
  );
}
