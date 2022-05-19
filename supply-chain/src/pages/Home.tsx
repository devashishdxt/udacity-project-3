import Web3 from "web3";

type Props = {
    address: string;
    setAddress: (address: string) => void;
};

const Home = ({ address, setAddress }: Props) => {
    const connectMetamask = async () => {
        let w = window as any;
    
        if (w.ethereum) {
            const addresses = await w.ethereum.request({ method: 'eth_requestAccounts' });

            if (addresses.length === 0) {
                alert("Unable to connect to metamask");
            }

            w.web3 = new Web3(w.ethereum);
            setAddress(addresses[0]);

            w.ethereum.on('accountsChanged', (addresses: string[]) => {
                if (addresses.length === 0) {
                    setAddress("");
                } else {
                    setAddress(addresses[0]);
                }
            })
        } else {
            alert("Please install MetaMask to use this dApp.");
        }
    };

    if (address.length !== 0) {
        return (
            <div className="page">
                <div className="page-content text-center">
                    <h1 className="text-3xl mx-auto py-10 font-bold text-slate-900">Welcome to Supply Chain DApp</h1>
                    <span className="text-sm mx-auto my-8 py-2 px-6 text-slate-700 bg-slate-200 shadow hover:bg-slate-300 transition-all cursor-pointer">Connected Address: {address}</span>
                </div>
            </div>
        )
    } else {
        return (
            <div className="page-disconnected">
                <div className="page-content text-center">
                    <h1 className="text-3xl mx-auto py-10 font-bold text-slate-900">Welcome to Supply Chain DApp</h1>
                    <button onClick={connectMetamask}>Connect Metamask</button>
                </div>
            </div>
        )
    }
};

export default Home;
