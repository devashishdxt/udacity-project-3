import { FormEvent, useState } from "react";

import { Web3State } from "../App";
import ItemDetails from "./ItemDetails";

type Props = {
    web3State: Web3State,
}

type Item = {
    upc: string,
    sku: string,
    ownerAddress: string,
    farmerAddress: string,
    farmName: string,
    farmInfo: string,
    farmLatitude: string,
    farmLongitude: string,
    productID: string,
    productNotes: string,
    price: string,
    itemState: string,
    distributorAddress: string,
    retailerAddress: string,
    consumerAddress: string,
}

const FetchItem = ({ web3State }: Props) => {
    const [upc, setUpc] = useState("");
    const [item, setItem] = useState<Item | null>(null);

    const clear = () => {
        setUpc("");
        setItem(null);
    };

    const fetchItem = async () => {
        const upc = getUpc();

        if (upc) {
            const itemBufferOne = await web3State.contract?.methods["fetchItemBufferOne"](upc).call();
            const itemBufferTwo = await web3State.contract?.methods["fetchItemBufferTwo"](upc).call();

            if (itemBufferOne && itemBufferTwo) {
                const item = {
                    upc: itemBufferOne[1].toString(),
                    sku: itemBufferOne[0].toString(),
                    ownerAddress: itemBufferOne[2].toString(),
                    farmerAddress: itemBufferOne[3].toString(),
                    farmName: itemBufferOne[4].toString(),
                    farmInfo: itemBufferOne[5].toString(),
                    farmLatitude: itemBufferOne[6].toString(),
                    farmLongitude: itemBufferOne[7].toString(),
                    productID: itemBufferTwo[2].toString(),
                    productNotes: itemBufferTwo[3].toString(),
                    price: itemBufferTwo[4].toString(),
                    itemState: itemBufferTwo[5].toString(),
                    distributorAddress: itemBufferTwo[6].toString(),
                    retailerAddress: itemBufferTwo[7].toString(),
                    consumerAddress: itemBufferTwo[8].toString(),
                };

                setItem(item);
            }
        } else {
            alert("Invalid UPC");
        }
    };

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (isValidUpc()) {
            fetchItem();
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
        <div className="text-left">
            <form className="px-10 py-6" onSubmit={onSubmit}>
                <h2 className="mb-4">Fetch Item</h2>
                <input className="mb-4 input" type="text" placeholder="UPC Number" value={upc} onChange={(event) => setUpc(event.target.value)} />
                <button type="submit" className="button">Submit</button>
                <button type="button" className="button ml-4" onClick={clear}>Clear</button>
            </form>
            <ItemDetails item={item} />
        </div>
    );
}

export default FetchItem;
export type { Item };
