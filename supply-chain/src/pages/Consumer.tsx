import { Web3State } from "../App";
import PurchaseItem from "../components/consumer/PurchaseItem";
import Page from "./Page";

type Props = {
    web3State: Web3State,
}

const Consumer = ({ web3State }: Props) => {
    return (
        <Page name="Consumer">
            <PurchaseItem web3State={web3State} />
        </Page>
    )
};

export default Consumer;
