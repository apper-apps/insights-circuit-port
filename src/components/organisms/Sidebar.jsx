import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { path: "/", icon: "BarChart3", label: "Visão Geral" },
    { path: "/produtos", icon: "Package", label: "Por Produto" },
    { path: "/categorias", icon: "Grid3X3", label: "Por Categoria" },
    { path: "/marcas", icon: "Tag", label: "Por Marca" },
  ];

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: "-100%" },
  };

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <div className="hidden lg:block w-64 bg-white shadow-premium border-r border-gray-200 h-screen">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <ApperIcon name="TrendingUp" className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold gradient-text">CMV Insights</h2>
            <p className="text-xs text-gray-500">Dashboard Analytics</p>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-50 hover:text-primary"
                }`
              }
            >
              <ApperIcon name={item.icon} className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );

  // Mobile Sidebar
  const MobileSidebar = () => (
    <>
      {/* Backdrop */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="lg:hidden fixed left-0 top-0 w-64 h-full bg-white shadow-premium-lg z-50"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <ApperIcon name="TrendingUp" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold gradient-text">CMV Insights</h2>
                <p className="text-xs text-gray-500">Dashboard Analytics</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ApperIcon name="X" className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-50 hover:text-primary"
                  }`
                }
              >
                <ApperIcon name={item.icon} className="w-5 h-5" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </motion.div>
    </>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};

export default Sidebar;