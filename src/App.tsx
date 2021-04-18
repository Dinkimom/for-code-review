import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

const Pokedex = lazy(() => import("./pages/Pokedex"));
const Pokemon = lazy(() => import("./pages/Pokemon"));
const Ability = lazy(() => import("./pages/Ability"));

const App = () => (
  <div>
    <Suspense fallback={
      <div>
        Loading...
      </div>
    }>
    <Switch>
      <Route path="/" exact render={() => <Pokedex />} />
      <Route path="/pokemon/:id/" exact render={() => <Pokemon />} />
      <Route path="/ability/:name/" render={() => <Ability />} />
      </Switch>
      </Suspense>
  </div>
);

export default App;
