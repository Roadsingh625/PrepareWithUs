import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import LoginScreen from "./Screen/Login";
import RegisterScreen from "./Screen/Register";
import HomeScreen from "./Screen/Home";
import TestScreen from "./Screen/Test";
import QuizScreen from "./Screen/Quiz";
import CreateTestScreen from "./Screen/CreateTest";
import DashboardScreen from "./Screen/Dashboard";
import CreateQuizScreen from "./Screen/CreateQuiz";
import ExamScreen from "./Screen/Exam";
import SeeQuestionScren from "./Screen/SeeQuestion";
import ForgetPasswordScreen from "./Screen/ForgetPassword";
import RestPasswordScreen from "./Screen/RestPassword";
import NotAllow from "./Screen/NotAllow";
const userData = JSON.parse(localStorage.getItem("userData"));
function App() {
  console.log(userData);
  const token = localStorage.getItem("token");

  const AuthStack = () => {
    return (
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/forgetPassword" element={<ForgetPasswordScreen/>}/>
        <Route path="/reset-password/:id/:token" element={<RestPasswordScreen/>}/>
        <Route path="*" element={<NotAllow/>}/>
      </Routes>
    );
  };
  const Stack = () => {
    return (
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/dashboard" element={<DashboardScreen />} />
        <Route path="/test" element={<TestScreen />} />
        <Route path="/quiz" element={<QuizScreen />} />
        <Route path="/create-test" element={<CreateTestScreen />} />
        <Route path="/create-quiz" element={<CreateQuizScreen />} />
        <Route path="/exam" element={<ExamScreen/>}/>
        <Route path="/questions" element={<SeeQuestionScren/>}/>
      </Routes>
    );  
  };
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x-diamond-fill"
              viewBox="0 0 16 16"
              style={{ marginBottom: "5px", marginRight: "5px" }}
            >
              <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L4.047 3.339 8 7.293l3.954-3.954L9.049.435zm3.61 3.611L8.708 8l3.954 3.954 2.904-2.905c.58-.58.58-1.519 0-2.098l-2.904-2.905zm-.706 8.614L8 8.708l-3.954 3.954 2.905 2.904c.58.58 1.519.58 2.098 0l2.905-2.904zm-8.614-.706L7.292 8 3.339 4.046.435 6.951c-.58.58-.58 1.519 0 2.098l2.904 2.905z" />
            </svg>
            Prepare With Us
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/test">
                  Test
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/quiz">
                  Quiz
                </a>
              </li>
            </ul>
            <form className="d-flex">
              {token ? (
                <div className="dropdown">
                  <button
                    className="btn btn-primary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-person-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                      <path
                        fill-rule="evenodd"
                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                      />
                    </svg>
                  </button>
                  <ul
                    className="dropdown-menu "
                    aria-labelledby="dropdownMenuButton1"
                    style={{ marginLeft: "-6.5rem" }}
                  >
                    <li>
                      <a className="dropdown-item" href="/dashboard">
                        Dashboard
                      </a>
                    </li>
                    {console.log(userData.profession && userData.isAdmin)}
                    {(userData.profession && userData.isAdmin) ? (
                      <>
                        <li>
                          <a className="dropdown-item" href="/create-test">
                            Create Test
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/create-quiz">
                            Create Quiz
                          </a>
                        </li>
                      </>
                    ) : userData.profession ? (
                      <li>
                        <a className="dropdown-item" href="/create-test">
                          Create Test
                        </a>
                      </li>
                    ) : null}
                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={(e) => {
                          e.preventDefault();
                          localStorage.removeItem("token");
                          window.location.href = "/login";
                        }}
                      >
                        Log Out
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link
                  className="link"
                  to="/login"
                  style={{ marginRight: "5px" }}
                >
                  Login
                </Link>
              )}
            </form>
          </div>
        </div>
      </nav>
      {token ? <Stack /> : <AuthStack />}
    </BrowserRouter>
  );
}

export default App;
