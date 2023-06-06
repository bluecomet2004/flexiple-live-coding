import axios from "axios";

/**
 * @returns ConferenceTalk[]
 */
export const getTalks = () =>
    axios.get("/talks")
        .then(res => res.data);

/**
 * @returns ConferenceTalkDetails
 */
export const getTalk = (talkId) =>
    axios.get(`/talks/${talkId}`)
        .then(res => res.data);

/**
 * @returns CallForPapers
 */
export const getCallForPapers = () =>
    axios.get("/callForPapers")
        .then(res => res.data);

/**
 * @returns void
 */
export const putCallForPapersEntry = (talkId, status) =>
    axios.put(`/callForPapers/${talkId}`, { status })
        .then(res => res.data);
