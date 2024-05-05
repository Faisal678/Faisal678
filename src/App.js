import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import OrderSummary from './components/OrderSummary';
import NotFound from './components/NotFound';
import Products from './components/Products';
import FeaturedProducts from './components/FeaturedProducts';
import NewProducts from './components/NewProducts';
import Login from './components/Login';
import Register from './components/Register';
import Goals from './components/Goals';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SetGoal from './components/SetGoal';
import GoalsList from './components/GoalsList';
import Messages from './components/Messages';
import DynamicForm from './components/DynamicForm';

function App() {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="App-header">
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/dynamic-form' element={<DynamicForm />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='goals' element={<Goals />}>
              <Route path='set-goal' element={<SetGoal />} />
              <Route path='goals-list' element={<GoalsList />} />
            </Route>
            <Route path='order-summary' element={<OrderSummary />} />
            <Route path='products' element={<Products />}>
              <Route path='featured-products' element={<FeaturedProducts />} />
              <Route path='new-products' element={<NewProducts />} />
            </Route>
            <Route path='messages' element={<Messages />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </header>
        <ToastContainer />
      </div>
    </QueryClientProvider>
  );
}

export default App;