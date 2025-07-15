import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const PeriodSelector = ({ value, onChange, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const quickPeriods = [
    { label: "Hoje", value: "today" },
    { label: "Esta Semana", value: "week" },
    { label: "Este Mês", value: "month" },
    { label: "Este Trimestre", value: "quarter" },
    { label: "Este Ano", value: "year" },
  ];

  const handlePeriodSelect = (period) => {
    onChange(period);
    setIsOpen(false);
  };

  const getDisplayText = () => {
    const period = quickPeriods.find(p => p.value === value);
    return period?.label || "Selecionar Período";
  };

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <ApperIcon name="Calendar" className="w-4 h-4" />
        {getDisplayText()}
        <ApperIcon name="ChevronDown" className="w-4 h-4" />
      </Button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-48 bg-white rounded-lg shadow-premium-lg border border-gray-200 py-2 z-50">
          {quickPeriods.map((period) => (
            <button
              key={period.value}
              onClick={() => handlePeriodSelect(period.value)}
              className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors ${
                value === period.value ? "bg-blue-50 text-primary" : ""
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PeriodSelector;