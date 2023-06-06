import "normalize.css/normalize.css";
import React from "react";
import { createRoot } from 'react-dom/client';

import { setupFakeHTTP } from "./api/fakeHttpApi";
import App from "./App";
import "./index.css";

setupFakeHTTP();

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App/>);
