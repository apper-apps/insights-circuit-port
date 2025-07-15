import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import Card from "@/components/atoms/Card";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

const CMVChart = ({ data, title = "Evolução do CMV", type = "line" }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const processData = () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!data || data.length === 0) {
          setChartData(null);
          return;
        }

        const options = {
          chart: {
            type: type,
            height: 350,
            toolbar: {
              show: false,
            },
            animations: {
              enabled: true,
              easing: "easeinout",
              speed: 800,
            },
          },
          colors: ["#1e40af", "#3730a3", "#10b981"],
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
            width: 3,
          },
          grid: {
            borderColor: "#f1f5f9",
            strokeDashArray: 5,
          },
          xaxis: {
            categories: data.map(item => item.label),
            labels: {
              style: {
                colors: "#64748b",
                fontSize: "12px",
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                colors: "#64748b",
                fontSize: "12px",
              },
              formatter: (value) => {
                return new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(value);
              },
            },
          },
          tooltip: {
            theme: "light",
            y: {
              formatter: (value) => {
                return new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(value);
              },
            },
          },
          fill: {
            type: type === "area" ? "gradient" : "solid",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.3,
              stops: [0, 90, 100],
            },
          },
        };

        const series = [{
          name: "CMV",
          data: data.map(item => item.value),
        }];

        setChartData({ options, series });
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    processData();
  }, [data, type]);

  if (isLoading) {
    return <Loading type="chart" />;
  }

  if (error) {
    return <Error message={error} onRetry={() => window.location.reload()} />;
  }

  if (!chartData) {
    return (
      <Card className="p-6">
        <div className="text-center text-gray-500">
          Nenhum dado disponível para exibir o gráfico
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type={type}
        height={350}
      />
    </Card>
  );
};

export default CMVChart;