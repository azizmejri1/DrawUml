"use client";
import { useEffect, useState } from "react";
import DiagramCreator from "./components/diagramCreator";
import DiagramPlaceholder from "./components/diagramPlaceHolder";

export default function Home() {
  const [diagram, setDiagram] = useState<string | null>(null);
  const [width, setWidth] = useState<string>("w-1/2");
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (diagram == null) {
      setWidth("w-2/3");
    }
  }, [diagram]);
  return (
    <div className="flex flex-row h-[90vh] m-4">
      <div className="w-1/3 flex justify-center">
        <DiagramCreator
          diagram={diagram}
          setDiagram={setDiagram}
          loading={loading}
          setLoading={setLoading}
        />
      </div>

      <div className="w-2/3 flex justify-center items-center">
        <DiagramPlaceholder diagram={diagram} loading={loading} />
      </div>
    </div>
  );
}
