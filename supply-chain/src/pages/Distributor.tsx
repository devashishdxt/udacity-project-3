import { Web3State } from "../App";
import BuyItem from "../components/distributor/BuyItem";
import ShipItem from "../components/distributor/ShipItem";
import Page from "./Page";

type Props = {
    web3State: Web3State,
}

const Distributor = ({ web3State }: Props) => {
    return (
        <Page name="Distributor">
            <BuyItem web3State={web3State} />
            <ShipItem web3State={web3State} />
        </Page>
    )
};

export default Distributor;
