import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ProductTable from "@/components/organisms/ProductTable";
import CMVChart from "@/components/organisms/CMVChart";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { productService } from "@/services/api/productService";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [productsData, topProducts] = await Promise.all([
        productService.getAll(),
        productService.getTopProducts(10)
      ]);

      setProducts(productsData);
      
      // Preparar dados para o gráfico de top produtos
      const chartDataFormatted = topProducts.map(product => ({
        label: product.name,
        value: product.totalCMV
      }));
      
      setChartData(chartDataFormatted);
      
      toast.success("Dados de produtos carregados com sucesso!");
    } catch (err) {
      setError(err.message);
      toast.error("Erro ao carregar dados dos produtos");
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
          Análise por Produto
        </h1>
        <p className="text-gray-600">
          CMV detalhado de cada produto
        </p>
      </div>

      {/* Top Products Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CMVChart
          data={chartData}
          title="Top 10 Produtos por CMV"
          type="bar"
        />
        
        <div className="bg-white rounded-lg shadow-premium p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Resumo dos Produtos
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Total de Produtos</p>
                <p className="text-2xl font-bold text-primary">
                  {products.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-2xl"
                >
                  📦
                </motion.span>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">CMV Total</p>
                <p className="text-2xl font-bold text-green-600">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(
                    products.reduce((sum, product) => sum + product.totalCMV, 0)
                  )}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-2xl"
                >
                  💰
                </motion.span>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Margem Média</p>
                <p className="text-2xl font-bold text-purple-600">
                  {(
                    (products.reduce((sum, product) => sum + product.margin, 0) /
                      products.length) *
                    100
                  ).toFixed(1)}%
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-2xl"
                >
                  📊
                </motion.span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <ProductTable
        data={products}
        isLoading={isLoading}
        error={error}
        onRetry={loadData}
      />
    </motion.div>
  );
};

export default Products;