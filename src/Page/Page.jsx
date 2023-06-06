import classNames from "classnames";
import React from "react";

import "./Page.css";

const Page = ({ className, title, children }) => (
        <section className={classNames("Page", className)}>
            <h1 className="Page__title">{title}</h1>
            {children}
        </section>
    );

export default Page;
