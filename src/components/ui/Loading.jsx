import { motion } from "framer-motion";

const Loading = ({ type = "dashboard" }) => {
  const SkeletonCard = ({ className = "" }) => (
    <div className={`bg-white rounded-lg shadow-md p-6 shimmer ${className}`}>
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        <div className="h-3 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  );

  const SkeletonChart = ({ className = "" }) => (
    <div className={`bg-white rounded-lg shadow-md p-6 shimmer ${className}`}>
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    </div>
  );

  const SkeletonTable = ({ className = "" }) => (
    <div className={`bg-white rounded-lg shadow-md p-6 shimmer ${className}`}>
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex space-x-4">
              <div className="h-4 bg-gray-200 rounded flex-1"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (type === "dashboard") {
    return (
      <div className="space-y-6 animate-fade-in">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SkeletonChart />
          <SkeletonChart />
        </div>

        {/* Table */}
        <SkeletonTable />
      </div>
    );
  }

  if (type === "chart") {
    return (
      <div className="animate-fade-in">
        <SkeletonChart />
      </div>
    );
  }

  if (type === "table") {
    return (
      <div className="animate-fade-in">
        <SkeletonTable />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-64">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full"
      />
    </div>
  );
};

export default Loading;