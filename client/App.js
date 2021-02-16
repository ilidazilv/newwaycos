import './style/app.css';
import {BrowserRouter} from "react-router-dom";
import MainComponent from "./src/components/MainComponent";
import {ConfigureStore} from "./src/redux/configureStore";
import {Provider} from 'react-redux';

const store = ConfigureStore();

function App() {
  return (
      <Provider store={store}>
          <BrowserRouter>
              <MainComponent/>
          </BrowserRouter>
      </Provider>
  );
}

export default App;
