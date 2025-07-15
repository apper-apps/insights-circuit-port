export const globalMetricsService = {
  async getCurrentMetrics() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "totalCMV" } },
          { field: { Name: "totalRevenue" } },
          { field: { Name: "averageMargin" } },
          { field: { Name: "productCount" } },
          { field: { Name: "lastSync" } },
          { field: { Name: "period_start" } },
          { field: { Name: "period_end" } },
          { field: { Name: "period_type" } }
        ],
        orderBy: [
          { fieldName: "lastSync", sorttype: "DESC" }
        ],
        pagingInfo: {
          limit: 1,
          offset: 0
        }
      };
      
      const response = await apperClient.fetchRecords("global_metric", params);
      
      if (!response.success) {
        throw new Error(response.message);
      }
      
      const data = response.data && response.data.length > 0 ? response.data[0] : null;
      
      // Return with consistent structure
      return {
        totalCMV: data?.totalCMV || 0,
        totalRevenue: data?.totalRevenue || 0,
        averageMargin: data?.averageMargin || 0,
        productCount: data?.productCount || 0,
        lastSync: data?.lastSync || new Date().toISOString(),
        period: {
          start: data?.period_start || new Date().toISOString(),
          end: data?.period_end || new Date().toISOString(),
          type: data?.period_type || "month"
        }
      };
    } catch (error) {
      console.error("Error fetching global metrics:", error);
      throw error;
    }
  },

  async getChartData() {
    try {
      // For chart data, we'll simulate historical data since it's not stored in the database
      // In a real application, this would come from historical records
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
    } catch (error) {
      console.error("Error fetching chart data:", error);
      throw error;
    }
  },

  async updateMetrics(newMetrics) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      // First, try to get existing metrics
      const currentMetrics = await this.getCurrentMetrics();
      
      const params = {
        records: [{
          Name: newMetrics.Name || "Global Metrics",
          totalCMV: newMetrics.totalCMV || currentMetrics.totalCMV,
          totalRevenue: newMetrics.totalRevenue || currentMetrics.totalRevenue,
          averageMargin: newMetrics.averageMargin || currentMetrics.averageMargin,
          productCount: newMetrics.productCount || currentMetrics.productCount,
          lastSync: new Date().toISOString(),
          period_start: newMetrics.period_start || currentMetrics.period?.start,
          period_end: newMetrics.period_end || currentMetrics.period?.end,
          period_type: newMetrics.period_type || currentMetrics.period?.type
        }]
      };
      
      const response = await apperClient.createRecord("global_metric", params);
      
      if (!response.success) {
        throw new Error(response.message);
      }
      
      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        if (failedRecords.length > 0) {
          console.error(`Failed to update ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message);
        }
        return response.results[0].data;
      }
      
      return null;
    } catch (error) {
      console.error("Error updating metrics:", error);
      throw error;
    }
  },

  async syncWithGoogleSheets() {
    try {
      // Simulate sync by updating lastSync timestamp
      const currentMetrics = await this.getCurrentMetrics();
      
      const updatedMetrics = {
        ...currentMetrics,
        lastSync: new Date().toISOString()
      };
      
      return await this.updateMetrics(updatedMetrics);
    } catch (error) {
      console.error("Error syncing with Google Sheets:", error);
      throw error;
    }
  }
};