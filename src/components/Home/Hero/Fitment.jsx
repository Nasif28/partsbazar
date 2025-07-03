"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const vehicleData = {
  makes: [
    { id: "1", name: "Toyota" },
    { id: "2", name: "Honda" },
    { id: "3", name: "Nissan" },
  ],
  models: {
    1: [
      { id: "101", name: "Corolla" },
      { id: "102", name: "Camry" },
      { id: "103", name: "Prius" },
    ],
    2: [
      { id: "201", name: "Civic" },
      { id: "202", name: "Accord" },
    ],
    3: [
      { id: "301", name: "Sunny" },
      { id: "302", name: "X-Trail" },
    ],
  },
  years: {
    101: ["2020", "2021", "2022"],
    102: ["2019", "2020", "2021"],
    103: ["2018", "2019", "2020"],
    201: ["2021", "2022"],
    202: ["2020", "2021"],
    301: ["2019", "2020"],
    302: ["2021", "2022"],
  },
  parts: {
    "1-101": ["Brakes", "Filters", "Spark Plugs"],
    "1-102": ["Oil Filter", "Air Filter", "Battery"],
    "2-201": ["Wiper Blades", "Headlights", "Alternator"],
  },
};

export default function Fitment() {
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedPart, setSelectedPart] = useState("");

  const handleMakeChange = (value) => {
    setSelectedMake(value);
    setSelectedModel("");
    setSelectedYear("");
    setSelectedPart("");
  };

  const handleModelChange = (value) => {
    setSelectedModel(value);
    setSelectedYear("");
    setSelectedPart("");
  };

  const handleYearChange = (value) => {
    setSelectedYear(value);
    setSelectedPart("");
  };

  const getModels = () => {
    return selectedMake ? vehicleData.models[selectedMake] || [] : [];
  };

  const getYears = () => {
    return selectedModel ? vehicleData.years[selectedModel] || [] : [];
  };

  const getParts = () => {
    if (selectedMake && selectedModel) {
      const key = `${selectedMake}-${selectedModel}`;
      return vehicleData.parts[key] || [];
    }
    return [];
  };

  return (
    <div className="bg-secondary p-5 rounded-xl shadow-md">
      <h2 className="text-xl text-primary font-bold mb-4">
        SELECT VEHICLE TO FIND EXACT FIT PARTS
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Make Selector */}
        <div>
          <Select value={selectedMake} onValueChange={handleMakeChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Make" />
            </SelectTrigger>
            <SelectContent>
              {vehicleData.makes.map((make) => (
                <SelectItem key={make.id} value={make.id}>
                  {make.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Model Selector */}
        <div>
          <Select
            value={selectedModel}
            disabled={!selectedMake}
            onValueChange={handleModelChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Model" />
            </SelectTrigger>
            <SelectContent>
              {getModels().map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  {model.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Year Selector */}
        <div>
          <Select
            value={selectedYear}
            disabled={!selectedModel || getYears().length === 0}
            onValueChange={handleYearChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              {getYears().map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Part Selector */}
        <div>
          <Select
            value={selectedPart}
            disabled={!selectedYear || getParts().length === 0}
            onValueChange={setSelectedPart}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Part" />
            </SelectTrigger>
            <SelectContent>
              {getParts().map((part) => (
                <SelectItem key={part} value={part}>
                  {part}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <Button
          disabled={!selectedPart}
          className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Search
        </Button>
      </div>
    </div>
  );
}
