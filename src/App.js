import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';


import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Makepayments from './components/MakePayments';
import GetProducts from './components/GetProducts';
import AddProducts from './components/AddProducts';
import { Carousel } from 'bootstrap';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';
import PaymentSuccess from './components/payment-success';
import ChatBot from './components/ChatBot';
import FAQ from './components/FAQ';


function App() {
  return (
    <div className="App">
      <Router>
      <header className="App-header">
        <h1>Light TimePieces</h1>
      </header>
        <Routes>
          <Route path='/Signin'element={<SignIn/>}/>
          <Route path='/Signup'element={<SignUp/>}/>
          <Route path='/addproducts'element={<AddProducts/>}/>
          <Route path='/'element={<GetProducts/>}/>
          <Route path='/makepayments'element={<Makepayments/>}/>
          <Route path='/NavBar'element={<NavBar/>}/>
          <Route path='/Footer'element={<Footer/>}/>
          <Route path='/Carousel'element={<Carousel/>}/>
          <Route path='/AboutUs'element={<AboutUs/>}/>
          <Route path='/payment-success'element={<PaymentSuccess/>}/>
          <Route path='/ChatBot'element={<ChatBot/>}/>   
          <Route path="/FAQ" element={<FAQ />} />                                                           

          
          
         

        </Routes>
        <ChatBot />
      </Router>
    </div>
  );
}

export default App;
