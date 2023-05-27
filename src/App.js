import logo from './logo.svg';
import './App.css';
import { Weather } from './Weather';
import { socket, SocketContext } from './socket';
function App() {
  return (
    <SocketContext.Provider  value={socket}> 
    <div className="App">
    <Weather />
    </div>
    </SocketContext.Provider> 
  );
}

export default App;
