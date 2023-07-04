import axios from "axios";

import { API_SERVER_URL } from "./public-config";

export const fetchContestList = async () => {
    const resp = await axios.get(`${API_SERVER_URL}/contests`);

    return resp.data.contests;
};

export const fetchSingleContest = async (contestId) => {
    const resp = await axios.get(
        `${API_SERVER_URL}/contest/${contestId}`,
    );

    return resp.data.contest;
};

export const addNewName = async ({ contestId, newNameValue }) => {
    const response = await axios.post(`${API_SERVER_URL}/contest/${contestId}`, { newNameValue });

    return response.data.newContest;
};


export const addContest = async ({ contestName, contestCategory, contestDescription }) => {
    const response = await axios.post(`${API_SERVER_URL}/contest`, { contestName, contestCategory, contestDescription });

    return response.data;
};