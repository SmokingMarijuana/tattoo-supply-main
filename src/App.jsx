 import './App.css'
import { Header } from './common/Header/Header'
import { Body } from './pages/Body/Body'
import { Hero} from './common/Hero/Hero'
import ProductList from './common/ProductList/ProductList';
import { CardUser } from './common/CardUser/CardUser';
function App() {
  return ( 
      <>
        <Header />
        <Hero />
        <ProductList />
      </>
  );
}

export default App;