import { Web3State } from "../App";
import AddRole from "../components/AddRole";
import Page from "./Page";

type Props = {
    web3State: Web3State,
};

const Admin = ({ web3State }: Props) => {
    return (
        <Page name="Admin">
            <AddRole role="Farmer" web3State={web3State} />
            <AddRole role="Distributor" web3State={web3State} />
            <AddRole role="Retailer" web3State={web3State} />
            <AddRole role="Consumer" web3State={web3State} />
        </Page>
    )
};

export default Admin;