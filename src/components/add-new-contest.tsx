import axios from "axios";
import { useState } from "react";
import { addContest } from "../api-client";
const AddNewContest = ({ updateList }) => {
  let [showForm, setShowForm] = useState(false);
  const addNewContest = (event) => {
    event.preventDefault();
    const target = event.target;
    const contestName = target.contestName.value;
    const contestCategory = target.contestCategory.value;
    const contestDescription = target.contestDescription.value;

    addContest({ contestName, contestCategory, contestDescription }).then(({ newContest }) => {
      updateList(newContest);
    });
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };
  return (
    <>
      <button className="btn" onClick={toggleForm}>{!showForm ? 'Add New Contest Form' : 'Close Contest Form'}</button>

      {showForm && <form className="addNewContest-form" onSubmit={addNewContest}>
        <input name="contestName" type="text" placeholder="Contest Name" />
        <input name="contestCategory" type="text" placeholder="Contest Category" />
        <textarea name="contestDescription" placeholder="Contest Description" cols="30" rows="10"></textarea>
        <button type="submit" style={{ width: 'fit-content', display: 'inline-block' }} className="btn mr-0">Submit</button>
      </form>}
    </>
  );
};

export default AddNewContest;