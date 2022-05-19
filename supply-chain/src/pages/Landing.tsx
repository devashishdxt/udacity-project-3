import Web3 from "web3";
import { AbiItem } from "web3-utils";

import { Web3State } from "../App";
import SupplyChainArtifact from "../contracts/SupplyChain.json";

type Props = {
    setWeb3State: React.Dispatch<React.SetStateAction<Web3State>>;
};

const Landing = ({ setWeb3State }: Props) => {
    const connectMetamask = async () => {
        let w = window as any;

        if (w.ethereum) {
            const addresses = await w.ethereum.request({ method: 'eth_requestAccounts' });

            if (addresses.length === 0) {
                alert("Unable to connect to metamask");
            }

            let web3 = new Web3(w.ethereum);

            const networkId = await web3.eth.net.getId();
            const networks: { [key: number]: { address: string } } = SupplyChainArtifact.networks;
            const deployedNetwork: { address: string } | undefined = networks[networkId];

            if (!deployedNetwork) {
                alert("SupplyChain contract not deployed to detected network");
            } else {
                let contract = new web3.eth.Contract(SupplyChainArtifact.abi as AbiItem[], deployedNetwork.address);

                setWeb3State({
                    address: addresses[0],
                    web3,
                    contract,
                });

                w.ethereum.on('accountsChanged', (addresses: string[]) => {
                    if (addresses.length === 0) {
                        setWeb3State({
                            address: null,
                            web3: null,
                            contract: null,
                        });
                    } else {
                        setWeb3State((prev) => {
                            return { ...prev, address: addresses[0] };
                        });
                    }
                });
            }
        } else {
            alert("Please install MetaMask to use this dApp.");
        }
    };

    return (
        <div className="page-disconnected">
            <div className="page-content text-center">
                <h1 className="text-3xl mx-auto py-10 font-bold text-slate-900">Welcome to Supply Chain DApp</h1>
                <button onClick={connectMetamask} className="button">Connect Metamask</button>
            </div>
        </div>
    )
};

export default Landing;
