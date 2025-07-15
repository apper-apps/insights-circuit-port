export const productService = {
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
          { field: { Name: "unitCost" } },
          { field: { Name: "unitPrice" } },
          { field: { Name: "quantitySold" } },
          { field: { Name: "totalCMV" } },
          { field: { Name: "margin" } },
          { field: { Name: "lastUpdated" } },
          { 
            field: { Name: "category" },
            referenceField: { field: { Name: "Name" } }
          },
          { 
            field: { Name: "brand" },
            referenceField: { field: { Name: "Name" } }
          }
        ],
        orderBy: [
          { fieldName: "totalCMV", sorttype: "DESC" }
        ]
      };
      
      const response = await apperClient.fetchRecords("product", params);
      
      if (!response.success) {
        throw new Error(response.message);
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching products:", error);
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
          { field: { Name: "unitCost" } },
          { field: { Name: "unitPrice" } },
          { field: { Name: "quantitySold" } },
          { field: { Name: "totalCMV" } },
          { field: { Name: "margin" } },
          { field: { Name: "lastUpdated" } },
          { 
            field: { Name: "category" },
            referenceField: { field: { Name: "Name" } }
          },
          { 
            field: { Name: "brand" },
            referenceField: { field: { Name: "Name" } }
          }
        ]
      };
      
      const response = await apperClient.getRecordById("product", parseInt(id), params);
      
      if (!response.success) {
        throw new Error(response.message);
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      throw error;
    }
  },

  async getTopProducts(limit = 10) {
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
      
      const response = await apperClient.fetchRecords("product", params);
      
      if (!response.success) {
        throw new Error(response.message);
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching top products:", error);
      throw error;
    }
  },

  async create(product) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        records: [{
          Name: product.Name,
          Tags: product.Tags,
          unitCost: product.unitCost,
          unitPrice: product.unitPrice,
          quantitySold: product.quantitySold,
          totalCMV: product.totalCMV,
          margin: product.margin,
          lastUpdated: new Date().toISOString(),
          category: product.category,
          brand: product.brand
        }]
      };
      
      const response = await apperClient.createRecord("product", params);
      
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
      console.error("Error creating product:", error);
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
          ...updates,
          lastUpdated: new Date().toISOString()
        }]
      };
      
      const response = await apperClient.updateRecord("product", params);
      
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
      console.error(`Error updating product with ID ${id}:`, error);
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
      
      const response = await apperClient.deleteRecord("product", params);
      
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
      console.error(`Error deleting product with ID ${id}:`, error);
      throw error;
    }
  }
};