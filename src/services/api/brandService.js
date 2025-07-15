import brandsData from "@/services/mockData/brands.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const brandService = {
  async getAll() {
    await delay(300);
    return [...brandsData];
  },

  async getById(id) {
    await delay(200);
    const brand = brandsData.find(b => b.Id === parseInt(id));
    if (!brand) {
      throw new Error(`Marca com Id ${id} não encontrada`);
    }
    return { ...brand };
  },

  async getTopBrands(limit = 5) {
    await delay(250);
    return [...brandsData]
      .sort((a, b) => b.totalCMV - a.totalCMV)
      .slice(0, limit);
  },

  async create(brand) {
    await delay(300);
    const newId = Math.max(...brandsData.map(b => b.Id)) + 1;
    const newBrand = {
      ...brand,
      Id: newId
    };
    brandsData.push(newBrand);
    return { ...newBrand };
  },

  async update(id, updates) {
    await delay(300);
    const index = brandsData.findIndex(b => b.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Marca com Id ${id} não encontrada`);
    }
    
    const updatedBrand = {
      ...brandsData[index],
      ...updates,
      Id: parseInt(id)
    };
    
    brandsData[index] = updatedBrand;
    return { ...updatedBrand };
  },

  async delete(id) {
    await delay(300);
    const index = brandsData.findIndex(b => b.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Marca com Id ${id} não encontrada`);
    }
    
    const deletedBrand = brandsData[index];
    brandsData.splice(index, 1);
    return { ...deletedBrand };
  }
};