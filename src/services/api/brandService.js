export const brandService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "totalCMV" } },
          { field: { Name: "productCount" } },
          { field: { Name: "averageMargin" } },
          { field: { Name: "percentOfTotal" } }
        ],
        orderBy: [
          { fieldName: "totalCMV", sorttype: "DESC" }
        ]
      };
      
      const response = await apperClient.fetchRecords("brand", params);
      
      if (!response.success) {
        throw new Error(response.message);
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching brands:", error);
      throw error;
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "totalCMV" } },
          { field: { Name: "productCount" } },
          { field: { Name: "averageMargin" } },
          { field: { Name: "percentOfTotal" } }
        ]
      };
      
      const response = await apperClient.getRecordById("brand", parseInt(id), params);
      
      if (!response.success) {
        throw new Error(response.message);
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching brand with ID ${id}:`, error);
      throw error;
    }
  },

  async getTopBrands(limit = 5) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "totalCMV" } }
        ],
        orderBy: [
          { fieldName: "totalCMV", sorttype: "DESC" }
        ],
        pagingInfo: {
          limit: limit,
          offset: 0
        }
      };
      
      const response = await apperClient.fetchRecords("brand", params);
      
      if (!response.success) {
        throw new Error(response.message);
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching top brands:", error);
      throw error;
    }
  },

  async create(brand) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        records: [{
          Name: brand.Name,
          Tags: brand.Tags,
          totalCMV: brand.totalCMV,
          productCount: brand.productCount,
          averageMargin: brand.averageMargin,
          percentOfTotal: brand.percentOfTotal
        }]
      };
      
      const response = await apperClient.createRecord("brand", params);
      
      if (!response.success) {
        throw new Error(response.message);
      }
      
      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message);
        }
        return response.results[0].data;
      }
      
      return null;
    } catch (error) {
      console.error("Error creating brand:", error);
      throw error;
    }
  },

  async update(id, updates) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        records: [{
          Id: parseInt(id),
          ...updates
        }]
      };
      
      const response = await apperClient.updateRecord("brand", params);
      
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
      console.error(`Error updating brand with ID ${id}:`, error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        RecordIds: [parseInt(id)]
      };
      
      const response = await apperClient.deleteRecord("brand", params);
      
      if (!response.success) {
        throw new Error(response.message);
      }
      
      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        if (failedRecords.length > 0) {
          console.error(`Failed to delete ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message);
        }
        return response.results[0].data;
      }
      
      return null;
    } catch (error) {
      console.error(`Error deleting brand with ID ${id}:`, error);
      throw error;
    }
  }
};