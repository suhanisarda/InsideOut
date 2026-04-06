import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CheckIn from './pages/CheckIn';
import Insights from './pages/Insights';
import VentSpace from './pages/VentSpace';
import TalkFreely from './pages/TalkFreely';
import Tools from './pages/Tools';
import Support from './pages/Support';
import Login from './pages/Login';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/check-in" element={<CheckIn />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/talk-freely" element={<TalkFreely />} />
          <Route path="/vent" element={<VentSpace />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/support" element={<Support />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
