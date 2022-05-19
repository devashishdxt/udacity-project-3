import { FormEvent, useState } from "react";
import { Web3State } from "../App";

type Props = {
    role: string,
    web3State: Web3State,
}

const AddRole = ({ role, web3State }: Props) => {
    let [address, setAddress] = useState("");

    const addRole = async () => {
        const fName = `add${role}`;

        try {
            await web3State.contract?.methods[fName](address).send({ from: web3State.address });
            setAddress("");
        } catch (e) {
            alert("Failed to add role (check console for more info)");
            console.error(e);
        }
    };

    const checkRole = async () => {
        const fName = `is${role}`;

        try {
            let isRole = await web3State.contract?.methods[fName](address).call();

            if (isRole) {
                alert(`${address} is already a ${role}`);
            } else {
                alert(`${address} is not a ${role}`);
            }
        } catch (e) {
            alert("Failed to check role (check console for more info)");
            console.error(e);
        }
    };

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (address === "") {
            alert("Please enter an address");
        } else {
            addRole();
        }
    }

    const onCheck = () => {
        if (address === "") {
            alert("Please enter an address");
        } else {
            checkRole();
        }
    }

    return (
        <form className="px-10 py-6" onSubmit={onSubmit}>
            <h2 className="mb-4">Add {role}</h2>
            <input className="mb-4 input" type="text" placeholder={`${role} Address (0x...)`} value={address} onChange={(e) => setAddress(e.target.value)} />
            <button type="submit" className="button">Submit</button>
            <button type="button" className="button ml-4" onClick={onCheck}>Check</button>
            <button type="button" className="button ml-4" onClick={() => setAddress("")}>Clear</button>
        </form>
    );
}

export default AddRole;