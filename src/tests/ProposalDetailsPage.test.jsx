import React from "react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";

import AxiosMockAdapter from "axios-mock-adapter";
import { render } from '@testing-library/react';

import { mockConferenceTalkDetails } from "../api";

import { flushPromises } from "../testUtils";
import ProposalDetailsPage from "../proposals/ProposalDetailsPage";

const renderProposalDetailsPage = (props) =>
    render(
        <MemoryRouter>
            <ProposalDetailsPage {...props} />
        </MemoryRouter>,
    );

const setupHTTPMocks = (mockData) => {
    const httpMock = new AxiosMockAdapter(axios);
    httpMock.onGet("/talks/1").reply(200, mockConferenceTalkDetails(mockData));
    return httpMock
}

describe("<ProposalDetailsPage>", () => {

    test("renders <Loading> before receiving response from API", async () => {
        // given
        setupHTTPMocks({
            id: "1",
        });

        // when
        const { getByTestId } = renderProposalDetailsPage({ talkId: "1" });
        // and no requests are flushed

        // then
        expect(getByTestId('loading')).toBeInTheDocument();
        await flushPromises();
    });

    test("does not render <ProposalDetails> before receiving response from API", async () => {
        // given
        setupHTTPMocks({
            id: "1",
        });

        // when
        const { queryByTestId } = renderProposalDetailsPage({ talkId: "1" });
        // and no requests are flushed

        // then
        expect(queryByTestId('proposal-details')).not.toBeInTheDocument();
        await flushPromises();
    });

    test("uses proposal title as header", async () => {
        // given
        setupHTTPMocks({
            id: "1",
            title: "Best Title Ever",
        });

        // when
        const { getByText } = renderProposalDetailsPage({ talkId: "1" });
        await flushPromises();

        // then
        expect(getByText("Best Title Ever")).toBeInTheDocument();
    });

    test.each([
        ["category", { category: "testing"}, "testing"],
        ["speaker", { speaker: "Someone Known"}, "Someone Known"],
    ])("uses /talks/:talkId API response to render proposal: %s", async (description, mockData, expected) => {
        // given
        setupHTTPMocks({
            id: "1",
            ...mockData
        });

        // when
        const { getByText } = renderProposalDetailsPage({ talkId: "1" });
        await flushPromises();

        // then
        expect(getByText(expected)).toBeInTheDocument();
    });
});
