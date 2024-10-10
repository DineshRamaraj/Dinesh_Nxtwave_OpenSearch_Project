import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import MainHeader from "./components/MainHeader";
import RecipesList from "./components/RecipesList";

function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      <MainHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe" element={<RecipesList />} />
      </Routes>
    </div>
  );
}

export default App;
