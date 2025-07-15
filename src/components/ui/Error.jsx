import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Erro ao carregar dados", onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-premium"
    >
      <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mb-4">
        <ApperIcon name="AlertCircle" className="w-8 h-8 text-red-600" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Ops! Algo deu errado</h3>
      <p className="text-gray-600 text-center mb-6 max-w-md">
        {message}. Por favor, tente novamente ou verifique sua conexão.
      </p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
        >
          <ApperIcon name="RefreshCw" className="w-4 h-4" />
          Tentar Novamente
        </button>
      )}
    </motion.div>
  );
};

export default Error;