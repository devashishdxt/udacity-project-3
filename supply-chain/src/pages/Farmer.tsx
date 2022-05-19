import { Web3State } from "../App";
import HarvestItem from "../components/farmer/HarvestItem";
import Page from "./Page";

type Props = {
    web3State: Web3State,
}

const Farmer = ({ web3State }: Props) => {
    return (
        <Page name="Farmer">
            <HarvestItem web3State={web3State} />
        </Page>
    )
};

export default Farmer;
