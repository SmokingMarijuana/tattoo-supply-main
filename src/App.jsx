import './App.css'
import { Header } from './common/Header/Header'
import { Body } from './pages/Body/Body'
import { Footer } from './pages/Footer/Footer';
import { useLocation } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const location = useLocation();

  // Non mostrare il footer sulla pagina /cart
  const showFooter = location && location.pathname !== '/cart';


  // Non mostrare l'header sulla pagina /cart
  const showHeader = location && location.pathname !== '/cart';

  return (
    <>
      <div className="main-content">
        <Header />
        <Body />
        {showFooter && <Footer />}
      </div>
    </>
  );
}

export default App;