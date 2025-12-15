 import './App.css'
import { Header } from './common/Header/Header'
import { Body } from './pages/Body/Body'
import { Footer } from './pages/Footer/Footer';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return ( 
      <>
      <div className="main-content">

        <Header />
        <Body />
        <Footer />
      </div>
      </>
  );
}

export default App;