import { Routes, Route } from "react-router-dom";
import Layout from "@/components/organisms/Layout";
import Overview from "@/components/pages/Overview";
import Products from "@/components/pages/Products";
import Categories from "@/components/pages/Categories";
import Brands from "@/components/pages/Brands";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Overview />} />
        <Route path="produtos" element={<Products />} />
        <Route path="categorias" element={<Categories />} />
        <Route path="marcas" element={<Brands />} />
      </Route>
    </Routes>
  );
}

export default App;