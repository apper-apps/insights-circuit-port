import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Chart from "react-apexcharts";
import Card from "@/components/atoms/Card";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { categoryService } from "@/services/api/categoryService";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await categoryService.getAll();
      setCategories(data);
      
      toast.success("Dados de categorias carregados com sucesso!");
    } catch (err) {
      setError(err.message);
      toast.error("Erro ao carregar dados das categorias");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const chartOptions = {
    chart: {
      type: "pie",
      height: 350,
    },
    labels: categories.map(cat => cat.name),
    colors: ["#1e40af", "#3730a3", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"],
    legend: {
      position: "bottom",
    },
    tooltip: {
      y: {
        formatter: (value) => {
          return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(value);
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => {
        return `${val.toFixed(1)}%`;
      },
    },
  };

  const chartSeries = categories.map(cat => cat.totalCMV);

  if (isLoading) {
    return <Loading type="dashboard" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadData} />;
  }

  if (!categories || categories.length === 0) {
    return (
      <Empty
        title="Nenhuma categoria encontrada"
        description="Não há categorias disponíveis para análise. Verifique a sincronização com o Google Sheets."
        icon="Grid3X3"
        actionText="Sincronizar Dados"
        onAction={loadData}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold gradient-text font-display">
          Análise por Categoria
        </h1>
        <p className="text-gray-600">
          Distribuição do CMV por categoria de produto
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Distribuição do CMV por Categoria
          </h3>
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="pie"
            height={350}
          />
        </Card>

        {/* Category Summary */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Resumo por Categoria
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {categories.map((category, index) => (
              <motion.div
                key={category.Id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: chartOptions.colors[index % chartOptions.colors.length] }}
                  />
                  <div>
                    <p className="font-medium text-gray-900">{category.name}</p>
                    <p className="text-sm text-gray-600">
                      {category.productCount} produtos
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(category.totalCMV)}
                  </p>
                  <p className="text-sm text-gray-600">
                    {category.percentOfTotal.toFixed(1)}% do total
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 hover:shadow-premium-lg transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {category.name}
                </h3>
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${chartOptions.colors[index % chartOptions.colors.length]}20` }}
                >
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: chartOptions.colors[index % chartOptions.colors.length] }}
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">CMV Total</span>
                  <span className="font-semibold text-gray-900">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(category.totalCMV)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Produtos</span>
                  <span className="font-semibold text-gray-900">
                    {category.productCount}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Margem Média</span>
                  <span className={`font-semibold ${
                    category.averageMargin > 0.3 ? "text-green-600" :
                    category.averageMargin > 0.15 ? "text-yellow-600" :
                    "text-red-600"
                  }`}>
                    {(category.averageMargin * 100).toFixed(1)}%
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">% do Total</span>
                  <span className="font-semibold text-gray-900">
                    {category.percentOfTotal.toFixed(1)}%
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Categories;