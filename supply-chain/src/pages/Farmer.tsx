import { Web3State } from "../App";
import HarvestItem from "../components/farmer/HarvestItem";
import PackItem from "../components/farmer/PackItem";
import ProcessItem from "../components/farmer/ProcessItem";
import SellItem from "../components/farmer/SellItem";
import Page from "./Page";

type Props = {
    web3State: Web3State,
}

const Farmer = ({ web3State }: Props) => {
    return (
        <Page name="Farmer">
            <HarvestItem web3State={web3State} />
            <ProcessItem web3State={web3State} />
            <PackItem web3State={web3State} />
            <SellItem web3State={web3State} />
        </Page>
    )
};

export default Farmer;
