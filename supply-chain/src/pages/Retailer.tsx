import { Web3State } from "../App";
import ReceiveItem from "../components/retailer/ReceiveItem";
import Page from "./Page";

type Props = {
    web3State: Web3State,
}

const Retailer = ({ web3State }: Props) => {
    return (
        <Page name="Retailer">
            <ReceiveItem web3State={web3State} />
        </Page>
    )
};

export default Retailer;
