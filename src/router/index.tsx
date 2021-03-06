import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { PokemonPage } from '../pages/app/pokemon';


const AppRoutes = (): JSX.Element => (
    <Switch>
        <Route exact path="/" component={PokemonPage} />
        <Route>
            <Redirect to="/" />
        </Route>
    </Switch>
);

export const Router = (): JSX.Element => (
    <BrowserRouter>
        <AppRoutes />
    </BrowserRouter>
);
