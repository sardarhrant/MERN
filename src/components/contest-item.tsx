import { useEffect, useState } from "react";

import { addNewName, fetchSingleContest } from "../api-client";

import Header from "./header";

const ContestItem = ({ initialContest, onContestListClick }) => {
  const [contest, setContest] = useState(initialContest);

  useEffect(() => {
    if (!contest.names) {
      fetchSingleContest(contest.id).then((contest) => {
        setContest(contest);
      });
    }
  }, [contest.id, contest.names]);

  const handleClickContestList = (event) => {
    event.preventDefault();
    onContestListClick();
  };

  const submitNewNameHandler = async (event) => {
    event.preventDefault();
    const newNameValue = event.target.newName.value;
    const response = await addNewName({ contestId: contest.id, newNameValue });
    setContest(response);
  };


  return (
    <>
      <Header message={contest.contestName} />
      <div className="contest">
        <div className="title">Contest Description</div>
        <div className="description">{contest.description}</div>
        <div className="title">Names</div>
        <div className="body">
          {contest.names?.length > 0
            ? (<div className="list">
              {contest.names.map((data, idx) => (
                <div key={idx} className="item">{data?.name}</div>
              ))}
            </div>)
            : (<div>No Names</div>)
          }
        </div>

        <div className="New Name"></div>
        <div className="body">
          <form onSubmit={submitNewNameHandler}>
            <input type="text" name="newName" placeholder="New Name Here..." />
            <button type="submit">Add New Name</button>
          </form>
        </div>
        <a href="/" className="" onClick={handleClickContestList}>
          Contest List
        </a>
      </div >
    </>
  );
};

export default ContestItem;