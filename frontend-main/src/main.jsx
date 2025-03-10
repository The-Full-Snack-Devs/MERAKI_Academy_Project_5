import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { Provider } from "react-redux";
import store from "./Service/redux/store.js";
import  {ThemeProviderWrapper} from "../src/components/MUI/MUITheme.jsx";
import {GoogleOAuthProvider} from "@react-oauth/google"

const clientId="241513460175-mhba52g53npitbm2n5ce8oampsjb70jq.apps.googleusercontent.com"
createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId={clientId} >
    <Provider store={store}>
        <ThemeProviderWrapper>
            <App />
        </ThemeProviderWrapper>
    </Provider>
    </GoogleOAuthProvider>
);
