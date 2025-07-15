import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";

const KPICard = ({ title, value, change, icon, trend = "up", isLoading = false }) => {
  const formatValue = (val) => {
    if (typeof val === "number") {
      return val.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    }
    return val;
  };

  const getTrendColor = () => {
    if (trend === "up") return "text-success";
    if (trend === "down") return "text-error";
    return "text-gray-500";
  };

  const getTrendIcon = () => {
    if (trend === "up") return "TrendingUp";
    if (trend === "down") return "TrendingDown";
    return "Minus";
  };

  if (isLoading) {
    return (
      <Card className="p-6 shimmer">
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          <div className="h-3 bg-gray-200 rounded w-full"></div>
        </div>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="p-6 hover:shadow-premium-lg transition-all duration-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <ApperIcon name={icon} className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">{title}</h3>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-2xl font-bold gradient-text font-display">
            {formatValue(value)}
          </div>
          
          {change && (
            <div className="flex items-center gap-1">
              <ApperIcon name={getTrendIcon()} className={`w-4 h-4 ${getTrendColor()}`} />
              <span className={`text-sm font-medium ${getTrendColor()}`}>
                {change}
              </span>
              <span className="text-sm text-gray-500">vs. período anterior</span>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default KPICard;