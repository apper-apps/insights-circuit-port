import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import SearchBar from "@/components/molecules/SearchBar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const ProductTable = ({ data, isLoading, error, onRetry }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("totalCMV");
  const [sortDirection, setSortDirection] = useState("desc");

  const sortedAndFilteredData = useMemo(() => {
    if (!data) return [];

    let filtered = data.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [data, searchTerm, sortField, sortDirection]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return "ArrowUpDown";
    return sortDirection === "asc" ? "ArrowUp" : "ArrowDown";
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatPercentage = (value) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  if (isLoading) {
    return <Loading type="table" />;
  }

  if (error) {
    return <Error message={error} onRetry={onRetry} />;
  }

  if (!data || data.length === 0) {
    return (
      <Empty
        title="Nenhum produto encontrado"
        description="Não há produtos disponíveis para análise. Verifique a sincronização com o Google Sheets."
        icon="Package"
        actionText="Sincronizar Dados"
        onAction={onRetry}
      />
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Produtos ({sortedAndFilteredData.length})
          </h3>
          <SearchBar
            placeholder="Buscar produtos..."
            onSearch={setSearchTerm}
            className="w-full sm:w-64"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort("name")}
                  className="flex items-center gap-1 hover:text-primary"
                >
                  Produto
                  <ApperIcon name={getSortIcon("name")} className="w-4 h-4" />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort("category")}
                  className="flex items-center gap-1 hover:text-primary"
                >
                  Categoria
                  <ApperIcon name={getSortIcon("category")} className="w-4 h-4" />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort("brand")}
                  className="flex items-center gap-1 hover:text-primary"
                >
                  Marca
                  <ApperIcon name={getSortIcon("brand")} className="w-4 h-4" />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort("unitCost")}
                  className="flex items-center gap-1 hover:text-primary"
                >
                  CMV Unit.
                  <ApperIcon name={getSortIcon("unitCost")} className="w-4 h-4" />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort("quantitySold")}
                  className="flex items-center gap-1 hover:text-primary"
                >
                  Qtd. Vendida
                  <ApperIcon name={getSortIcon("quantitySold")} className="w-4 h-4" />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort("totalCMV")}
                  className="flex items-center gap-1 hover:text-primary"
                >
                  CMV Total
                  <ApperIcon name={getSortIcon("totalCMV")} className="w-4 h-4" />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort("margin")}
                  className="flex items-center gap-1 hover:text-primary"
                >
                  Margem
                  <ApperIcon name={getSortIcon("margin")} className="w-4 h-4" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedAndFilteredData.map((product, index) => (
              <motion.tr
                key={product.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{product.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {product.brand}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(product.unitCost)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.quantitySold.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {formatCurrency(product.totalCMV)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    product.margin > 0.3 ? "bg-green-100 text-green-800" :
                    product.margin > 0.15 ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {formatPercentage(product.margin)}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ProductTable;