import { FormEvent, useState } from "react";

import { Web3State } from "../../App";

type Props = {
    web3State: Web3State,
}

const ButItem = ({ web3State }: Props) => {
    const [upc, setUpc] = useState("");
    const [price, setPrice] = useState("");

    const clear = () => {
        setUpc("");
        setPrice("");
    };

    const buyItem = async () => {
        const upc = getUpc();
        const price = getPrice();

        if (upc && price) {
            const fName = "buyItem";

            try {
                await web3State.contract?.methods[fName](upc).send({ from: web3State.address, value: price });
                clear();
            } catch (e) {
                alert("Failed to buy item (check console for more info)");
                console.error(e);
            }
        } else {
            alert("Invalid UPC");
        }
    };

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (isValidUpc()) {
            buyItem();
        } else {
            alert("Please fill out all fields");
        }
    };

    const isValidUpc = () => {
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
            <h2 className="mb-4">Buy Item</h2>
            <input className="mb-4 input" type="text" placeholder="UPC Number" value={upc} onChange={(event) => setUpc(event.target.value)} />
            <input className="mb-4 input" type="text" placeholder="Price (in Wei)" value={price} onChange={(event) => setPrice(event.target.value)} />
            <button type="submit" className="button">Submit</button>
            <button type="button" className="button ml-4" onClick={clear}>Clear</button>
        </form>
    );
}

export default ButItem;
