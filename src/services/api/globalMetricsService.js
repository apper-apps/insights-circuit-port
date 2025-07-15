import globalMetricsData from "@/services/mockData/globalMetrics.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const globalMetricsService = {
  async getCurrentMetrics() {
    await delay(300);
    return { ...globalMetricsData };
  },

  async getChartData() {
    await delay(350);
    
    // Simular dados históricos para gráficos
    const mockChartData = [
      { label: "Jan", value: 580000 },
      { label: "Fev", value: 620000 },
      { label: "Mar", value: 650000 },
      { label: "Abr", value: 580000 },
      { label: "Mai", value: 720000 },
      { label: "Jun", value: 680000 },
      { label: "Jul", value: 750000 },
      { label: "Ago", value: 680000 },
      { label: "Set", value: 820000 },
      { label: "Out", value: 780000 },
      { label: "Nov", value: 850000 },
      { label: "Dez", value: 680000 }
    ];
    
    return mockChartData;
  },

  async updateMetrics(newMetrics) {
    await delay(400);
    
    const updatedMetrics = {
      ...globalMetricsData,
      ...newMetrics,
      lastSync: new Date().toISOString()
    };
    
    // Em uma aplicação real, isso seria persistido
    Object.assign(globalMetricsData, updatedMetrics);
    
    return { ...updatedMetrics };
  },

  async syncWithGoogleSheets() {
    await delay(500);
    
    // Simular sincronização com Google Sheets
    const updatedMetrics = {
      ...globalMetricsData,
      lastSync: new Date().toISOString()
    };
    
    Object.assign(globalMetricsData, updatedMetrics);
    
    return { ...updatedMetrics };
  }
};