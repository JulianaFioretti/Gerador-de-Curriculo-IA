import React from 'react';
import logoCodificai from '../../assets/logo_codificai_b.png';

const Footer: React.FC = () => (
  <footer className="w-full py-4 bg-white text-center text-sm text-gray-500 border-t border-slate-200 mt-0">
    <a
      href="https://julianafioretti.github.io/Gerador-de-Curriculo-IA"
      target="_blank"
      rel="noopener noreferrer"
      className="footer-link flex flex-row items-center justify-center gap-3"
    >
      <img src={logoCodificai} alt="Logo Codificaí" className="h-10" style={{maxWidth: 120}} />
      <span>
        <strong>Equipe Codificaí</strong>
        &nbsp;— Programa Desenvolve do Grupo Boticário
      </span>
    </a>
  </footer>
);

export default Footer;
