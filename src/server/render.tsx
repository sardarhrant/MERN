import ReactDOMServer from "react-dom/server";
import { fetchSingleContest, fetchContestList } from "../api-client";
import App from "../components/app";

const serverRender = async (req) => {
    const { contestId } = req.params;

    const initialData = contestId
        ? { currentContest: await fetchSingleContest(contestId) }
        : { contests: await fetchContestList() };

    const initialMarkup = ReactDOMServer.renderToString(
        <App initialData={initialData} />,
    );

    return { initialMarkup, initialData };
};

export default serverRender;