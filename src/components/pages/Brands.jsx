import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Chart from "react-apexcharts";
import Card from "@/components/atoms/Card";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { brandService } from "@/services/api/brandService";

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await brandService.getAll();
      setBrands(data);
      
      toast.success("Dados de marcas carregados com sucesso!");
    } catch (err) {
      setError(err.message);
      toast.error("Erro ao carregar dados das marcas");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const chartOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: brands.map(brand => brand.name),
      labels: {
        formatter: (value) => {
          return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
            notation: "compact",
          }).format(value);
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
    colors: ["#1e40af"],
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
    grid: {
      borderColor: "#f1f5f9",
    },
  };

  const chartSeries = [{
    name: "CMV Total",
    data: brands.map(brand => brand.totalCMV),
  }];

  if (isLoading) {
    return <Loading type="dashboard" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadData} />;
  }

  if (!brands || brands.length === 0) {
    return (
      <Empty
        title="Nenhuma marca encontrada"
        description="Não há marcas disponíveis para análise. Verifique a sincronização com o Google Sheets."
        icon="Tag"
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
          Análise por Marca
        </h1>
        <p className="text-gray-600">
          Comparativo de CMV entre marcas
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            CMV por Marca
          </h3>
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={350}
          />
        </Card>

        {/* Brand Rankings */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Ranking de Marcas
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {brands
              .sort((a, b) => b.totalCMV - a.totalCMV)
              .map((brand, index) => (
                <motion.div
                  key={brand.Id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{brand.name}</p>
                      <p className="text-sm text-gray-600">
                        {brand.productCount} produtos
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(brand.totalCMV)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {brand.percentOfTotal.toFixed(1)}% do total
                    </p>
                  </div>
                </motion.div>
              ))}
          </div>
        </Card>
      </div>

      {/* Brand Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map((brand, index) => (
          <motion.div
            key={brand.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 hover:shadow-premium-lg transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {brand.name}
                </h3>
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {brand.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">CMV Total</span>
                  <span className="font-semibold text-gray-900">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(brand.totalCMV)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Produtos</span>
                  <span className="font-semibold text-gray-900">
                    {brand.productCount}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Margem Média</span>
                  <span className={`font-semibold ${
                    brand.averageMargin > 0.3 ? "text-green-600" :
                    brand.averageMargin > 0.15 ? "text-yellow-600" :
                    "text-red-600"
                  }`}>
                    {(brand.averageMargin * 100).toFixed(1)}%
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">% do Total</span>
                  <span className="font-semibold text-gray-900">
                    {brand.percentOfTotal.toFixed(1)}%
                  </span>
                </div>
                
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Posição no Ranking</span>
                    <span className="font-medium text-primary">
                      #{brands.sort((a, b) => b.totalCMV - a.totalCMV).findIndex(b => b.Id === brand.Id) + 1}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Brands;