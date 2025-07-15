import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import PeriodSelector from "@/components/molecules/PeriodSelector";
import SyncStatus from "@/components/molecules/SyncStatus";

const Header = ({ period, onPeriodChange, lastSync, onSync, onMenuToggle }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow-sm border-b border-gray-200 px-6 py-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ApperIcon name="Menu" className="w-6 h-6" />
          </button>

          <div>
            <h1 className="text-2xl font-bold gradient-text font-display">
              CMV Insights
            </h1>
            <p className="text-sm text-gray-600">
              Dashboard de Análise de Custo de Mercadoria Vendida
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <PeriodSelector
            value={period}
            onChange={onPeriodChange}
          />
          
          <SyncStatus
            lastSync={lastSync}
            onSync={onSync}
          />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;