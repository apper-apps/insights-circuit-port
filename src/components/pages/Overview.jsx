import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import KPICard from "@/components/molecules/KPICard";
import CMVChart from "@/components/organisms/CMVChart";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { globalMetricsService } from "@/services/api/globalMetricsService";

const Overview = () => {
  const [metrics, setMetrics] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [metricsData, chartDataResponse] = await Promise.all([
        globalMetricsService.getCurrentMetrics(),
        globalMetricsService.getChartData()
      ]);

      setMetrics(metricsData);
      setChartData(chartDataResponse);
      
      toast.success("Dados carregados com sucesso!");
    } catch (err) {
      setError(err.message);
      toast.error("Erro ao carregar dados da visão geral");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (isLoading) {
    return <Loading type="dashboard" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadData} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold gradient-text font-display">
          Visão Geral do CMV
        </h1>
        <p className="text-gray-600">
          Análise completa do custo de mercadoria vendida
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="CMV Total"
          value={metrics?.totalCMV || 0}
          change="+12.5%"
          icon="DollarSign"
          trend="up"
        />
        <KPICard
          title="Margem Média"
          value={`${((metrics?.averageMargin || 0) * 100).toFixed(1)}%`}
          change="+2.3%"
          icon="TrendingUp"
          trend="up"
        />
        <KPICard
          title="Produtos Ativos"
          value={metrics?.productCount || 0}
          change="+8"
          icon="Package"
          trend="up"
        />
        <KPICard
          title="Receita Total"
          value={metrics?.totalRevenue || 0}
          change="+15.2%"
          icon="BarChart3"
          trend="up"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CMVChart
          data={chartData}
          title="Evolução do CMV"
          type="area"
        />
        <CMVChart
          data={chartData}
          title="Tendência de Margem"
          type="line"
        />
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-premium p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Desempenho por Período
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Hoje</span>
              <span className="font-semibold">R$ 45.230</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Esta Semana</span>
              <span className="font-semibold">R$ 312.450</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Este Mês</span>
              <span className="font-semibold">R$ 1.245.780</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-premium p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Top Categorias
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Eletrônicos</span>
              <span className="font-semibold">R$ 523.120</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Roupas</span>
              <span className="font-semibold">R$ 312.450</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Casa</span>
              <span className="font-semibold">R$ 245.780</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-premium p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Alertas e Insights
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-600">
                  Margem média aumentou 2.3% este mês
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-600">
                  3 produtos com margem abaixo de 15%
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-600">
                  Categoria Eletrônicos em alta
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Overview;