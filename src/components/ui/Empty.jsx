import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "Nenhum dado encontrado",
  description = "Não há dados disponíveis para exibir no momento.",
  icon = "FileText",
  actionText = "Sincronizar Dados",
  onAction
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-12 bg-white rounded-lg shadow-premium"
    >
      <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name={icon} className="w-10 h-10 text-gray-500" />
      </div>
      
      <h3 className="text-2xl font-semibold text-gray-900 mb-3 text-center">
        {title}
      </h3>
      
      <p className="text-gray-600 text-center mb-8 max-w-md leading-relaxed">
        {description}
      </p>
      
      {onAction && (
        <button
          onClick={onAction}
          className="bg-gradient-to-r from-accent to-green-600 text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
        >
          <ApperIcon name="RefreshCw" className="w-4 h-4" />
          {actionText}
        </button>
      )}
    </motion.div>
  );
};

export default Empty;