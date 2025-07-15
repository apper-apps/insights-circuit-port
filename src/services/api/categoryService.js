import categoriesData from "@/services/mockData/categories.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const categoryService = {
  async getAll() {
    await delay(300);
    return [...categoriesData];
  },

  async getById(id) {
    await delay(200);
    const category = categoriesData.find(c => c.Id === parseInt(id));
    if (!category) {
      throw new Error(`Categoria com Id ${id} não encontrada`);
    }
    return { ...category };
  },

  async getTopCategories(limit = 5) {
    await delay(250);
    return [...categoriesData]
      .sort((a, b) => b.totalCMV - a.totalCMV)
      .slice(0, limit);
  },

  async create(category) {
    await delay(300);
    const newId = Math.max(...categoriesData.map(c => c.Id)) + 1;
    const newCategory = {
      ...category,
      Id: newId
    };
    categoriesData.push(newCategory);
    return { ...newCategory };
  },

  async update(id, updates) {
    await delay(300);
    const index = categoriesData.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Categoria com Id ${id} não encontrada`);
    }
    
    const updatedCategory = {
      ...categoriesData[index],
      ...updates,
      Id: parseInt(id)
    };
    
    categoriesData[index] = updatedCategory;
    return { ...updatedCategory };
  },

  async delete(id) {
    await delay(300);
    const index = categoriesData.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Categoria com Id ${id} não encontrada`);
    }
    
    const deletedCategory = categoriesData[index];
    categoriesData.splice(index, 1);
    return { ...deletedCategory };
  }
};