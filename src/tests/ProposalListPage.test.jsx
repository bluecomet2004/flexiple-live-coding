import React from "react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";

import AxiosMockAdapter from "axios-mock-adapter";
import { render, getByText as staticGetByText, waitFor } from '@testing-library/react';

import { mockCallForPapers, mockConferenceTalk } from "../api";
import { flushPromises } from "../testUtils";
import ProposalListPage from "../proposals/ProposalListPage";

const renderProposalListPage = () =>
    render(
        <MemoryRouter>
            <ProposalListPage/>
        </MemoryRouter>,
    );

const setupHTTPMocks = () => {
    const httpMock = new AxiosMockAdapter(axios);
    httpMock.onGet("/talks").reply(200, [
        mockConferenceTalk({ id: "1" }),
    ]);
    httpMock.onGet("/callForPapers").reply(200, mockCallForPapers({
        byTalkId: {
            "1": { status: "pending" },
        },
    }));
    return httpMock
}

describe("<ProposalListPage>", () => {

    test("updates changed proposal status locally", async () => {
        // given
        const httpMock = setupHTTPMocks()
        httpMock.onPut(/^\/callForPapers\/.+/).reply(204);
        // and given
        const { getByTestId } = renderProposalListPage();
        await flushPromises();

        // then
        const proposalRow = getByTestId('proposal-id-1');
        expect(proposalRow).not.toHaveClass("ProposalRow--accepted");

        // and when
        await waitFor(() => {
            staticGetByText(proposalRow, 'Accept').click();
        })

        // then
        expect(proposalRow).toHaveClass("ProposalRow--accepted");
    });

});
