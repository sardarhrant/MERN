import { useEffect, useState } from "react";

import { fetchContestList } from "../api-client";

import ContestPreview from "./contest-preview";
import Header from "./header";
import AddNewContest from "./add-new-contest";

const ContestList = ({ initialContests, onContestClick }) => {
    const [contests, setContests] = useState(initialContests);

    useEffect(() => {
        if (!initialContests) {
            fetchContestList().then((contests) => {
                setContests(contests);
            });
        }
    }, [initialContests]);

    return (
        <>
            <Header message="Naming Contests" />
            <AddNewContest updateList={(newContest) => {
                setContests([...contests, newContest]);
            }} />

            <div className="contest-list">
                {contests?.map((contest, idx) => {
                    return (
                        <ContestPreview
                            key={idx}
                            contest={contest}
                            onClick={onContestClick}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default ContestList;