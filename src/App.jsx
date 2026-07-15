import { HashRouter as Router, Routes, Route } from "react-router";
import AuthPage from "./Pages/AuthPage";
import BudgetPlanner from "./Pages/BudgetPlanner";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route → AuthPage */}
        <Route path="/" element={<AuthPage />} />

        {/* Budget Planner route */}
        <Route path="/budget-planner" element={<BudgetPlanner />} />
      </Routes>
    </Router>
  );
}

export default App;
