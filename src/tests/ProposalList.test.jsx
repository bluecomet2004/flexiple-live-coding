import React from "react";
import { MemoryRouter } from "react-router-dom";

import { render, getByText as staticGetByText } from '@testing-library/react';

import { mockConferenceTalkProposal } from "../api";
import ProposalList from "../proposals/ProposalList/ProposalList";

const renderProposalList = (props) =>
    render(
        <MemoryRouter>
            <ProposalList
                proposals={[]}
                onProposalStatusUpdate={() => {}}
                {...props}
            />
        </MemoryRouter>,
    );

describe("<ProposalList>", () => {

    test("renders speaker", () => {
        // given
        const proposalsData = [
            mockConferenceTalkProposal({ id: "1", speaker: "Someone Known" }),
            mockConferenceTalkProposal({ id: "2", speaker: "John Smith" }),
        ];

        // when
        const { getByTestId } = renderProposalList({ proposals: proposalsData });

        // then
        const proposalRow1 = getByTestId('proposal-id-1');
        staticGetByText(proposalRow1, "Someone Known");
        const proposalRow2 = getByTestId('proposal-id-2');
        staticGetByText(proposalRow2, "John Smith");
    });

    test("uses proper CSS class for accepted proposal", () => {
        // given
        const proposalsData = [
            mockConferenceTalkProposal({ id: "1", status: "accepted" }),
        ];

        const { getByTestId } = renderProposalList({ proposals: proposalsData });

        // then
        const row = getByTestId('proposal-id-1');
        expect(row).toHaveClass("ProposalRow--accepted");
    });

    test("uses proper CSS class for rejected proposal", () => {
        // given
        const proposalsData = [
            mockConferenceTalkProposal({ id: "1", status: "rejected" }),
        ];

        // when
        const { getByTestId } = renderProposalList({ proposals: proposalsData });

        // then
        const row = getByTestId('proposal-id-1');
        expect(row).toHaveClass("ProposalRow--rejected");
    });

    test("rejects proposal", () => {
        // given
        const proposalsData = [
            mockConferenceTalkProposal({ id: "1", status: "pending" }),
        ];
        const onProposalStatusUpdate = jest.fn();
        const { getByText } = renderProposalList({
            proposals: proposalsData,
            onProposalStatusUpdate: onProposalStatusUpdate,
        });

        // when
        getByText('Reject').click();

        // then
        expect(onProposalStatusUpdate).toHaveBeenCalledTimes(1);
    });
});
