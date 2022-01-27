import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Layout from './layout/Layout';

function App() {
    return (
        <>
            <BrowserRouter>
                <Layout></Layout>
            </BrowserRouter>
        </>
    );
}

export default App;
