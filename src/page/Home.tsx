import Entries from "../component/Entries";
import NewEntry from "../component/SaveNewEntry";

const Home: React.FC = () => {

return(
<div className="App">
<header className="App-header">
  <Entries />
  <NewEntry />
</header>
</div>
);

}
export default Home;