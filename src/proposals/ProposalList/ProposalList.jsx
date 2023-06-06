import React from "react";
import { Link } from "react-router-dom";

import ProposalRow from "../ProposalRow";

import "./ProposalList.css";

const ProposalList = props => {
    const { proposals, onProposalStatusUpdate } = props;

    return (
        <ul data-testid="proposal-list" className="ProposalList">
            {proposals.map((proposal) => (
              <li
                key={proposal.id}
                className="ProposalList__item"
              >
                  <Link
                    key={proposal.id}
                    className="ProposalList__item__link"
                    to={`/proposals/${proposal.id}`}
                  >
                      <ProposalRow
                        proposal={proposal}
                        onStatusUpdate={onProposalStatusUpdate}
                      />
                  </Link>
              </li>
            ))}
        </ul>
      )
}

export default ProposalList;
