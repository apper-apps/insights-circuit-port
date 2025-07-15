import productsData from "@/services/mockData/products.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const productService = {
  async getAll() {
    await delay(300);
    return [...productsData];
  },

  async getById(id) {
    await delay(200);
    const product = productsData.find(p => p.Id === parseInt(id));
    if (!product) {
      throw new Error(`Produto com Id ${id} não encontrado`);
    }
    return { ...product };
  },

  async getTopProducts(limit = 10) {
    await delay(250);
    return [...productsData]
      .sort((a, b) => b.totalCMV - a.totalCMV)
      .slice(0, limit);
  },

  async getByCategory(category) {
    await delay(200);
    return productsData.filter(p => 
      p.category.toLowerCase() === category.toLowerCase()
    );
  },

  async getByBrand(brand) {
    await delay(200);
    return productsData.filter(p => 
      p.brand.toLowerCase() === brand.toLowerCase()
    );
  },

  async create(product) {
    await delay(300);
    const newId = Math.max(...productsData.map(p => p.Id)) + 1;
    const newProduct = {
      ...product,
      Id: newId,
      lastUpdated: new Date().toISOString()
    };
    productsData.push(newProduct);
    return { ...newProduct };
  },

  async update(id, updates) {
    await delay(300);
    const index = productsData.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Produto com Id ${id} não encontrado`);
    }
    
    const updatedProduct = {
      ...productsData[index],
      ...updates,
      Id: parseInt(id),
      lastUpdated: new Date().toISOString()
    };
    
    productsData[index] = updatedProduct;
    return { ...updatedProduct };
  },

  async delete(id) {
    await delay(300);
    const index = productsData.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Produto com Id ${id} não encontrado`);
    }
    
    const deletedProduct = productsData[index];
    productsData.splice(index, 1);
    return { ...deletedProduct };
  }
};