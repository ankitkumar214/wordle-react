import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Display from "./components/Display";
import ReactDOM from "react-dom";

const FooterPortal = () => {
  const portalRoot = document.getElementById("footer-root");
  return ReactDOM.createPortal(<Footer />, portalRoot);
};

function App() {
  return (
    <>
      <BrowserRouter basename={import.meta.env.DEV ? '/' : '/reactjs-wordle/'}>
        <h1 className="text-bold text-black text-[72px] mt-12">WORDLE</h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Link to='five'>
                  <button className="transition duration-0 text-3xl bg-green-500 hover:bg-yellow-300 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-yellow-400 active:bg-gray-800 active:border-black rounded mt-20">
                    5 Letters &nbsp;&nbsp; ▶
                  </button>
                </Link>
                <Link to='six'>
                  <button className="transition duration-0 text-3xl bg-green-500 hover:bg-yellow-300 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-yellow-400 active:bg-gray-800 active:border-black rounded mt-8">
                    6 Letters &nbsp;&nbsp; ▶
                  </button>
                </Link>
                <Link to='seven'>
                  <button className="transition duration-0 text-3xl bg-green-500 hover:bg-yellow-300 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-yellow-400 active:bg-gray-800 active:border-black rounded mt-8">
                    7 Letters &nbsp;&nbsp; ▶
                  </button>
                </Link>
              </>
            }
          />
          <Route
            path='/five'
            element={
              <>
                <h2 className="text-black text-[36px]">5 Letters</h2>
                <Display number={5} />
              </>
            }
          />
          <Route
            path='/six'
            element={
              <>
                <h2 className="text-black text-[36px]">6 Letters</h2>
                <Display number={6} />
              </>
            }
          />
          <Route
            exact
            path='/seven'
            element={
              <>
                <h2 className="text-black text-[36px]">7 Letters</h2>
                <Display number={7} />
              </>
            }
          />
        </Routes>
        <FooterPortal />
      </BrowserRouter>
    </>
  );
}

export default App;
