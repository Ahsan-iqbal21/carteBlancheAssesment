import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import MainScreen from './Components/mainScreen/mainScreen';
import SignUp from "./Components/SignUp/SignUp";
import TaskScreen from "./Components/TaskScreen/TaskScreen";
import { useHistory } from "react-router-dom";
import EditTask from "./Components/EditTask/EditTask";

function App() {
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route exact path="/signIn" element={MainScreen}></Route>
            <Route exact path="/" element={SignUp}></Route>
            <Route exact path="/mainPage" element={TaskScreen}></Route>\
            <Route exact path="/addTask" element={EditTask}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
