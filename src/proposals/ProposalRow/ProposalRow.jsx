import React, {useEffect, useState} from "react";
import classNames from "classnames";

import "./ProposalRow.css";

const withoutEventDefault = (callback) =>
  event => {
    event.preventDefault();
    callback();
  };

const ProposalRow = ({proposal, onStatusUpdate}) => {
  const {id, title, category, status} = proposal;
  const [statusClass, setStatusClass] = useState("");

  useEffect(() => {
    if (status === "accepted") {
      setStatusClass("ProposalRow--accepted");
    } else if (status === "rejected") {
      setStatusClass("ProposalRow--rejected");
    }
  }, [status]);

  return (
    <div data-testid={`proposal-id-${id}`} className={classNames("ProposalRow", statusClass)}>
      <div className="ProposalsRow__status_indicator"/>
      <div className="ProposalsRow__title">
        {title}
      </div>
      <div className="ProposalsRow__speaker">
      </div>
      <div className="ProposalsRow__category">
        category: {category}
      </div>
      <div className="ProposalsRow__status">
        status: {status}
      </div>
      <button
        disabled={status === "accepted"}
        className={status !== "accepted" ? "ProposalsRow__accept_button" : "ProposalsRow__accept_button_placeholder"}
        onClick={withoutEventDefault(() => onStatusUpdate(id, "accepted"))}
      >
        Accept
      </button>
      <button
        disabled={status === "rejected"}
        className={status !== "rejected" ? "ProposalsRow__reject_button" : "ProposalsRow__reject_button_placeholder"}
        onClick={withoutEventDefault(() => onStatusUpdate(id, "rejected"))}
      >
        Reject
      </button>
    </div>
  );
};

export default ProposalRow;
