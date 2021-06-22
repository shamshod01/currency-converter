import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Layout} from "antd";
import 'antd/dist/antd.css';
import './App.css'
import CurrencyConverter from "./components/converter";
import CurrencyTable from "./components/table";


function App() {

    return (
        <Router>
            <Layout className={'siteLayout'}>
                <Layout.Content className={'layoutShadow'}>
                    <Switch>
                        <Route path="/list">
                            <CurrencyTable/>
                        </Route>
                        <Route path="/">
                            <CurrencyConverter/>
                        </Route>
                    </Switch>
                </Layout.Content>
            </Layout>
        </Router>
    );
}

export default App;
