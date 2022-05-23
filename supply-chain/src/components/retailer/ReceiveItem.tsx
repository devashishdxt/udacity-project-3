import { FormEvent, useState } from "react";

import { Web3State } from "../../App";

type Props = {
    web3State: Web3State,
}

const ReceiveItem = ({ web3State }: Props) => {
    const [upc, setUpc] = useState("");

    const clear = () => {
        setUpc("");
    };

    const receiveItem = async () => {
        const upc = getUpc();

        if (upc) {
            const fName = "receiveItem";

            try {
                await web3State.contract?.methods[fName](upc).send({ from: web3State.address });
                clear();
            } catch (e) {
                alert("Failed to receive item (check console for more info)");
                console.error(e);
            }
        } else {
            alert("Invalid UPC");
        }
    };

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (isValidUpc()) {
            receiveItem();
        } else {
            alert("Please fill out all fields");
        }
    };

    const isValidUpc = () => {
        return upc !== "";
    };

    const getUpc = () => {
        return web3State.web3?.utils.toBN(upc);
    }

    return (
        <form className="px-10 py-6" onSubmit={onSubmit}>
            <h2 className="mb-4">Receive Item</h2>
            <input className="mb-4 input" type="text" placeholder="UPC Number" value={upc} onChange={(event) => setUpc(event.target.value)} />
            <button type="submit" className="button">Submit</button>
            <button type="button" className="button ml-4" onClick={clear}>Clear</button>
        </form>
    );
}

export default ReceiveItem;
