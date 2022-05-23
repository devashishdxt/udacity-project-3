import { FormEvent, useState } from "react";

import { Web3State } from "../../App";

type Props = {
    web3State: Web3State,
}

const SellItem = ({ web3State }: Props) => {
    const [upc, setUpc] = useState("");
    const [price, setPrice] = useState("");

    const clear = () => {
        setUpc("");
        setPrice("");
    };

    const sellItem = async () => {
        const upc = getUpc();
        const price = getPrice();

        if (upc && price) {
            const fName = "sellItem";

            try {
                await web3State.contract?.methods[fName](upc, price).send({ from: web3State.address });
                clear();
            } catch (e) {
                alert("Failed to sell item (check console for more info)");
                console.error(e);
            }
        } else {
            alert("Invalid UPC or Price");
        }
    };

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (isValidItem()) {
            sellItem();
        } else {
            alert("Please fill out all fields");
        }
    };

    const isValidItem = () => {
        return upc !== "" && price !== "";
    };

    const getUpc = () => {
        return web3State.web3?.utils.toBN(upc);
    }

    const getPrice = () => {
        return web3State.web3?.utils.toBN(price);
    }

    return (
        <form className="px-10 py-6" onSubmit={onSubmit}>
            <h2 className="mb-4">Sell Item</h2>
            <input className="mb-4 input" type="text" placeholder="UPC Number" value={upc} onChange={(event) => setUpc(event.target.value)} />
            <input className="mb-4 input" type="text" placeholder="Price (in Wei)" value={price} onChange={(event) => setPrice(event.target.value)} />
            <button type="submit" className="button">Submit</button>
            <button type="button" className="button ml-4" onClick={clear}>Clear</button>
        </form>
    );
}

export default SellItem;
