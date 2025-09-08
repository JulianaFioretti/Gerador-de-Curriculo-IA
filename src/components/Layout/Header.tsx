import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt } from "@fortawesome/free-regular-svg-icons";
import ExportButton from "../Preview/ExportButton";

export default function Header() {
  return (
    <header className="header-absoluto h-22 bg-white/80 backdrop-blur border-b border-slate-100 flex items-center px-10 w-full left-0 top-0 absolute z-50 shadow-md">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-lg bg-slate-600 flex items-center justify-center text-white font-semibold text-4xl">
          <FontAwesomeIcon icon={faFileAlt} />
        </div>
        <div>
          <h1 className="text-4xl font-semibold">CV Builder</h1>
          <p className="text-sm text-slate-500">
            [ Gerador de Currículo • Preview em tempo real ]
          </p>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <ExportButton targetId="cv-preview" fileName="meu-curriculo.pdf" />
      </div>
    </header>
  );
}
