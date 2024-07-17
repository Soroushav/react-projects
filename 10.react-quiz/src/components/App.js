import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextQuestion from "./NextQuestion";
import Progress from "./Progress";
import FinishedStatus from "./FinishedStatus";
import Footer from "./Footer";
import Timer from "./Timer";
import { AppProvider, useAppContext } from "../contexts/AppContext";
function App() {
  const { status } = useAppContext();
  return (
    <div className="app">
      <Header />
        <Main>
          {status === "loading" && <Loader />}
          {status === "failed" && <Error />}
          {status === "ready" && <StartScreen />}
          {status === "active" && (
            <>
              <Progress />
              <Question />
              <Footer>
                <NextQuestion />
                <Timer />
              </Footer>
            </>
          )}
          {status === "finished" && (
            <>
              <FinishedStatus />
            </>
          )}
        </Main>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
}