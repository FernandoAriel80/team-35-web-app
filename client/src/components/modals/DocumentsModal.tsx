interface DocumentItem {
  name: string;
  url: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  documents: DocumentItem[];
}

export const DocumentsModal = ({ isOpen, onClose, documents }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-xs bg-black/50 transition-opacity px-2 sm:px-0">

      {/* Overlay click to close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 transform animate-fade-in-up">
        {/* Header */}
        <h3 className="text-2xl font-bold mb-2 text-slate-900">
          Documentos Subidos
        </h3>

        <p className="text-gray-600 text-center mb-6">
          Aquí puedes revisar los documentos enviados en tu solicitud.
        </p>

        {/* Lista de Documentos */}
        <ul className="space-y-3">
          {documents.map((doc, idx) => (
            <li key={idx}>
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-500 transition"
              >
                <span className="font-medium text-gray-800 truncate">{doc.name}</span>
                <span className="text-blue-500 font-semibold text-sm">Ver →</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="w-full mt-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition hover:cursor-pointer"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};