import { useState } from "react";

export default function DiagramPlaceholder({
  diagram,
  loading,
}: {
  diagram: string | null;
  loading: boolean;
}) {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleDownload = () => {
    if (diagram) {
      const link = document.createElement("a");
      link.href = diagram;
      link.download = "diagram.svg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="w-4/5 max-w-5xl h-[80vh] bg-gradient-to-br from-white to-gray-50 border-2 border-blue-500 rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden transition-all duration-500 hover:shadow-3xl p-6 sm:p-8 md:p-10">
      {loading ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-1.5 border-4 border-blue-300 border-t-transparent rounded-full animate-spin animate-reverse"></div>
          </div>
          <p className="text-gray-600 text-lg font-medium animate-pulse">
            Generating Diagram...
          </p>
        </div>
      ) : diagram ? (
        <div className="relative w-full h-full flex flex-col items-center justify-center gap-4">
          <img
            src={diagram}
            className="max-h-full max-w-full object-contain cursor-pointer transition-transform duration-300 hover:scale-105 rounded-lg"
            alt="Diagram"
            onClick={() => setIsZoomed(true)}
          />
          <button
            onClick={handleDownload}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all duration-200 active:scale-95"
          >
            Download Diagram
          </button>
          {isZoomed && (
            <div
              className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 transition-opacity duration-300"
              onClick={() => setIsZoomed(false)}
            >
              <div className="relative max-w-[90vw] max-h-[90vh] p-6 bg-white rounded-xl shadow-2xl">
                <img
                  src={diagram}
                  className="max-h-[85vh] max-w-full object-contain rounded-lg"
                  alt="Zoomed Diagram"
                />
                <button
                  onClick={() => setIsZoomed(false)}
                  className="absolute top-4 right-4 text-white bg-gray-900 rounded-full p-3 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-200"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <h1 className="text-gray-500 text-xl sm:text-2xl font-semibold tracking-wide">
          Your diagram will appear here
        </h1>
      )}
    </div>
  );
}
