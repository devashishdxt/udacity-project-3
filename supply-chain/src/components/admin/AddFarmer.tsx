import { Web3State } from "../../App";
import AddRole from "./AddRole";

type Props = {
    web3State: Web3State,
};

const AddFarmer = ({ web3State }: Props) => {
    return (
        <AddRole role="Farmer" web3State={web3State} />
    );
}

export default AddFarmer;