"use client";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";

export default function DiagramCreator({
  diagram,
  setDiagram,
  loading,
  setLoading,
}: {
  diagram: string | null;
  setDiagram: Dispatch<SetStateAction<string | null>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) {
  const [description, setDescription] = useState("");
  const [selectedDiagram, setSelectedDiagram] = useState("");

  const diagramTypes = [
    "Class",
    "Sequence",
    "Use case",
    "Activity",
    "Component",
    "State",
  ];

  const handleCreate = async () => {
    console.log("Description:", description);
    console.log("Selected Diagram:", selectedDiagram);
    setLoading(true);
    const data = {
      type: selectedDiagram,
      description: description,
    };
    const url = "http://localhost:8080/diagram/generate";
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    axios
      .post(url, data, config)
      .then((response) => {
        setDiagram("http://localhost:8080/" + response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="w-full max-w-lg bg-white rounded-lg p-6">
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Description :
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full h-44 p-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Enter description..."
        />
      </div>

      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-2">
          Choose Diagram type :
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {diagramTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedDiagram(type)}
              className={`py-2 px-4 border rounded-md text-sm font-medium transition-colors ${
                selectedDiagram === type
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleCreate}
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
      >
        Create
      </button>
    </div>
  );
}
