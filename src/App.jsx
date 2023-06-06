import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import "./App.css";
import { ProposalDetailsPage, ProposalListPage } from "./proposals";

const App = () => (
    <BrowserRouter>
        <div className="App">
            <main className="App_content">
                <Switch>
                    <Route path="/proposals/:proposalId">
                        {({ match }) => (
                            <ProposalDetailsPage talkId={match.params.proposalId}/>
                        )}
                    </Route>
                    <Route path="/proposals">
                        {() => (
                            <ProposalListPage/>
                        )}
                    </Route>
                    <Redirect to="/proposals"/>
                </Switch>
            </main>
        </div>
    </BrowserRouter>
);

export default App;



