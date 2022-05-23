import { Web3State } from "../App";
import FetchItem from "../components/FetchItem";

type Props = {
    web3State: Web3State;
};

const Home = ({ web3State }: Props) => {
    return (
        <div className="page">
            <div className="page-content text-center">
                <h1 className="text-3xl mx-auto py-10 font-bold text-slate-900">Welcome to Supply Chain DApp</h1>
                <span className="text-sm mx-auto my-8 py-2 px-6 text-slate-700 bg-slate-200 shadow hover:bg-slate-300 transition-all cursor-pointer"><code className="text-green-600">{web3State.address}</code></span>
                <FetchItem web3State={web3State} />
            </div>
        </div>
    )
};

export default Home;
