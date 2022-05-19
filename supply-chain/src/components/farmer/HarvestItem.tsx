import { FormEvent, useState } from "react";

import { Web3State } from "../../App";

type Item = {
    upc: string,
    farmerAddress: string,
    farmName: string,
    farmInfo: string,
    farmLatitude: string,
    farmLongitude: string,
    productNotes: string,
};

type Props = {
    web3State: Web3State,
}

const HarvestItem = ({ web3State }: Props) => {
    const [item, setItem] = useState<Item>({
        upc: "",
        farmerAddress: "",
        farmName: "",
        farmInfo: "",
        farmLatitude: "",
        farmLongitude: "",
        productNotes: "",
    });

    const clear = () => {
        setItem({
            upc: "",
            farmerAddress: "",
            farmName: "",
            farmInfo: "",
            farmLatitude: "",
            farmLongitude: "",
            productNotes: "",
        });
    };

    const setUpc = (upc: string) => {
        setItem(prev => ({ ...prev, upc }));
    };

    const setFarmerAddress = (farmerAddress: string) => {
        setItem(prev => ({ ...prev, farmerAddress: farmerAddress }));
    };

    const setFarmName = (farmName: string) => {
        setItem(prev => ({ ...prev, farmName: farmName }));
    };

    const setFarmInfo = (farmerInfo: string) => {
        setItem(prev => ({ ...prev, farmInfo: farmerInfo }));
    };

    const setFarmLatitude = (farmerLatitude: string) => {
        setItem(prev => ({ ...prev, farmLatitude: farmerLatitude }));
    };

    const setFarmLongitude = (farmerLongitude: string) => {
        setItem(prev => ({ ...prev, farmLongitude: farmerLongitude }));
    };

    const setProductNotes = (productNotes: string) => {
        setItem(prev => ({ ...prev, productNotes }));
    };

    const harvestItem = async () => {
        const upc = getUpc();

        if (upc) {
            const fName = "harvestItem";

            try {
                await web3State.contract?.methods[fName](upc, item.farmerAddress, item.farmName, item.farmInfo, item.farmLatitude, item.farmLongitude, item.productNotes).send({ from: web3State.address });
                clear();
            } catch (e) {
                alert("Failed to harvest item (check console for more info)");
                console.error(e);
            }
        } else {
            alert("Invalid UPC");
        }
    };

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (isValidItem()) {
            harvestItem();
        } else {
            alert("Please fill out all fields");
        }
    };

    const isValidItem = () => {
        return item.upc !== "" && item.farmerAddress !== "" && item.farmInfo !== "" && item.farmLatitude !== "" && item.farmLongitude !== "" && item.productNotes !== "";
    };

    const getUpc = () => {
        return web3State.web3?.utils.toBN(item.upc);
    }

    return (
        <form className="px-10 py-6" onSubmit={onSubmit}>
            <h2 className="mb-4">Harvest Item</h2>
            <input className="mb-4 input" type="text" placeholder="UPC Number" value={item.upc} onChange={(event) => setUpc(event.target.value)} />
            <input className="mb-4 input" type="text" placeholder="Farmer Address (0x...)" value={item.farmerAddress} onChange={(event) => setFarmerAddress(event.target.value)} />
            <input className="mb-4 input" type="text" placeholder="Farm Name" value={item.farmName} onChange={(event) => setFarmName(event.target.value)} />
            <input className="mb-4 input" type="text" placeholder="Farm Information" value={item.farmInfo} onChange={(event) => setFarmInfo(event.target.value)} />
            <input className="mb-4 input" type="text" placeholder="Farm Latitude" value={item.farmLatitude} onChange={(event) => setFarmLatitude(event.target.value)} />
            <input className="mb-4 input" type="text" placeholder="Farm Longitude" value={item.farmLongitude} onChange={(event) => setFarmLongitude(event.target.value)} />
            <input className="mb-4 input" type="text" placeholder="Product Notes" value={item.productNotes} onChange={(event) => setProductNotes(event.target.value)} />
            <button type="submit" className="button">Submit</button>
            <button type="button" className="button ml-4" onClick={clear}>Clear</button>
        </form>
    );
};

export default HarvestItem;