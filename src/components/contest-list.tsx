import ContestPreview from "./contest-preview";
import { useEffect, useState } from "react";
import { fetchContests } from "../api-client";

const ContestList = ({ initialContestsList }) => {
    let [contestList, setContestList] = useState(initialContestsList);
    useEffect(() => {
        // fetchContests().then(contests => {
        //     setContestList(contestList = contests);
        // });
    }, []);
    return (
        <div className="contest-list">
            {contestList.map(contest => {
                return (
                    <ContestPreview key={contest.id} contest={contest} />
                );
            })}
        </div>
    );
};

export default ContestList;