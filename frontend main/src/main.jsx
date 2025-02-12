import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { Provider } from "react-redux";
import store from "./Service/redux/store.js";
import  {ThemeProviderWrapper} from "../src/components/MUI/MUITheme.jsx";

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <ThemeProviderWrapper>
            <App />
        </ThemeProviderWrapper>
    </Provider>
);
