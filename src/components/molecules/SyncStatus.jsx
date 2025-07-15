import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";

const SyncStatus = ({ lastSync, isOnline = true, onSync }) => {
  const getStatusColor = () => {
    if (!isOnline) return "error";
    if (lastSync) return "success";
    return "warning";
  };

  const getStatusText = () => {
    if (!isOnline) return "Offline";
    if (lastSync) return "Sincronizado";
    return "Não sincronizado";
  };

  const getStatusIcon = () => {
    if (!isOnline) return "WifiOff";
    if (lastSync) return "CheckCircle";
    return "AlertCircle";
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <ApperIcon name={getStatusIcon()} className="w-4 h-4" />
        <Badge variant={getStatusColor()}>
          {getStatusText()}
        </Badge>
      </div>

      {lastSync && (
        <span className="text-sm text-gray-500">
          Última sincronização: {new Date(lastSync).toLocaleString("pt-BR")}
        </span>
      )}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onSync}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-primary hover:bg-blue-50 rounded-lg transition-colors"
      >
        <ApperIcon name="RefreshCw" className="w-4 h-4" />
        Sincronizar
      </motion.button>
    </div>
  );
};

export default SyncStatus;