import { HashRouter as Router, Routes, Route } from "react-router";
import AuthPage from "./Pages/AuthPage";
import BudgetPlanner from "./Pages/BudgetPlanner";

function App() {
  return (
    <Router>
  <Routes>
    <Route path="/" element={<AuthPage />} />
    <Route path="/budget-planner" element={<BudgetPlanner />} />
  </Routes>
</Router>

  );
}

export default App;
