import React, {useReducer, useState} from 'react';
import './App.css';
// import {shallowEqual, useDispatch, useSelector} from "react-redux";
// import {Dispatch} from "redux";
// import {addArticle} from "./store/actionCreators";
// import {AddArticle} from "./components/AddArticle";
// import {BrowserRouter, Route, Routes, Link} from "react-router-dom";
import {ViewState} from "@/types";
// import {NameUI} from "./components/NameUI";
import { CreateOrJoinGame, GameRoom } from "@/components";
import {GameDataProvider} from "@/providers";

// function Index() {
//     return <h2>Home</h2>;
// }


// function Product(props: any) {
//     return <h2>This is a page for product with ID: {props.props} </h2>;
// }

// function App2() {
//     const articles: readonly IArticle[] = useSelector(
//         (state: ArticleState) => state.articles,
//         shallowEqual
//     )
//
//     const dispatch: Dispatch<any> = useDispatch()
//
//     const saveArticle = React.useCallback(
//         (articles: IArticle) => dispatch(addArticle(articles)),
//         [dispatch]
//     )
//     const [showLobby, setShowLobby] = useState(true);
//     const [showPlayerList, setPlayerList] = useState(false);
//
//     return (
//         <div className="App items-center">
//             {/*<AddArticle saveArticle={saveArticle}/>*/}
//             {/*{articles.map((article: IArticle) => (*/}
//             {/*    <p key={article.id}>{article.title}, {article.body}</p>*/}
//             {/*))}*/}
//             {showLobby && (<Lobby setShowLobby={setShowLobby} setPlayerList={setPlayerList}/>)}
//             {showLobby || showPlayerList && (<Hello/>)}
//
//             {/*<BrowserRouter>*/}
//             {/*    <div>*/}
//             {/*        <nav>*/}
//             {/*            <ul>*/}
//             {/*                <li>*/}
//             {/*                    <Link to="/">Home</Link>*/}
//             {/*                </li>*/}
//             {/*                <li>*/}
//             {/*                    <Link to="/products">First Product</Link>*/}
//             {/*                </li>*/}
//             {/*            </ul>*/}
//             {/*        </nav>*/}
//             {/*        <Routes>*/}
//             {/*            <Route path="/" element={<Hello/>}/>*/}
//             {/*            <Route path="/products" element={<Product props={"asdf"}/>}/>*/}
//             {/*        </Routes>*/}
//             {/*    </div>*/}
//             {/*</BrowserRouter>*/}
//         </div>
//     );
// }

// export function Hello() {
//     const [name, setName] = useState("");
//
//     const handleName = (e: React.FormEvent<HTMLInputElement>) => {
//         setName(e.currentTarget.value)
//     }
//
//     return (
//         <div className="App h-screen justify-center items-center flex">
//             <form
//                 className="w-[25vw] p-4 flex flex-col mx-auto border-2 border-black rounded-xl justify-center items-center"
//             >
//                 <p>{name}</p>
//                 <label className={"m-4"}>
//                     <span className="block text-sm font-medium text-slate-700">輸入玩家名稱：</span>
//                     {/*<input type={"text"} className="border-2 border-black" onChange={saveName}/>*/}
//                     <input type={"text"} className="border-2 border-black" onChange={handleName}/>
//                 </label>
//                 <div className="border-2 border-black items-center mx-auto">
//                     <button>送出2</button>
//                 </div>
//             </form>
//         </div>
//     )
// }

// interface Props {
//     setShowLobby: any,
//     setPlayerList: any,
// }

// export function Lobby({setShowLobby, setPlayerList}: Props) {
//     const [name, setName] = useState("");
//
//     const handleName = (e: React.FormEvent<HTMLInputElement>) => {
//         setName(e.currentTarget.value)
//     }
//
//     function goPlayerList() {
//         setShowLobby(false)
//         setPlayerList(true)
//     }
//
//     return (
//         <div className="App h-screen justify-center items-center flex">
//             <form
//                 className="w-[25vw] p-4 flex flex-col mx-auto border-2 border-black rounded-xl justify-center items-center"
//             >
//                 <p>{name}</p>
//                 <label className={"m-4"}>
//                     <span className="block text-sm font-medium text-slate-700">輸入玩家名稱：</span>
//                     {/*<input type={"text"} className="border-2 border-black" onChange={saveName}/>*/}
//                     <input type={"text"} className="border-2 border-black" onChange={handleName}/>
//                 </label>
//                 <div className="border-2 border-black items-center mx-auto">
//                     <button onClick={goPlayerList}>送出
//                     </button>
//                 </div>
//             </form>
//         </div>
//     )
// }

// 透過reducer 來儲存參數，Q: 不需要不一樣的action來操控變數\
// 通常是用來存一個會需要一直改變的參數，像是user status
// const initialState = 0;
// const reducer = (state: any, action: any) => {
//     console.log("Hello reducer: ", state, action)
//     state += 1
//     return state
// }

// export function Hello2() {
//     const [count, dispatch] = useReducer(reducer, initialState);
//     return (
//         <div className="App h-screen justify-center items-center flex">
//             <form
//                 className="w-[25vw] p-4 flex flex-col mx-auto border-2 border-black rounded-xl justify-center items-center"
//             >
//                 <p>{count}</p>
//                 <label className={"m-4"}>
//                     <span className="block text-sm font-medium text-slate-700">輸入玩家名稱：</span>
//                     <input className="border-2 border-black"/>
//                 </label>
//                 <div className="border-2 border-black items-center mx-auto">
//                     <button onClick={() => dispatch('aaa')}>送出</button>
//                 </div>
//             </form>
//         </div>
//     )
// }


// function GameList(props: { visitFunc: (view: ViewState) => void}) {
//     return (
//         <div>123</div>
//     )
// }

function GameUI() {
    const [flow, setFlow] = useState<ViewState>("pick-name");

    return (
        <>
            {flow === "pick-name" && <CreateOrJoinGame visitFunc={setFlow}/>}
            {/*{flow === "pick-name" && <NameUI visitFunc={setFlow}/>}*/}
            {/*{flow === "game-list" && <GameList visitFunc={setFlow}/>}*/}
            {flow === "game-room" && (
                <GameDataProvider>
                    <GameRoom visitFunc={setFlow}/>
                </GameDataProvider>
            )}
        </>
    )
}

function App() {
    return <GameUI/>
}

export default App;
