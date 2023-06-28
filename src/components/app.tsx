import ContestList from "./contest-list";
import Header from "./header";

const App = ({ initialData }) => {
    console.log(initialData);

    return (
        <div className="container">
            <Header message="Naming Contest" />
            <ContestList initialContestsList={initialData.contests} />
        </div>
    );
};

export default App;