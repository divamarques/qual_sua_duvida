// Uses for creatin routes and incapsulate more than 1 component
//"Switch" prevents the app from requesting two paths at the same time
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { AuthContextProvider } from './contexts/AuthContext'
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';



function App() {

  return (

    <BrowserRouter>
     <AuthContextProvider>
       <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/rooms/new" component={NewRoom}/>
          <Route path="/rooms/:id" component={Room}/>
          <Route path="/admin/rooms/:id" component={AdminRoom}/>
        </Switch>
      </AuthContextProvider>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </BrowserRouter>
  );
}

export default App;
