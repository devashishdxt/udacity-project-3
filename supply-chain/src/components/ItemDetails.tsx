import { Item } from "./FetchItem";

type Props = {
    item: Item | null,
}

const ItemDetails = ({ item }: Props) => {
    if (!item) {
        return (
            <div></div>
        );
    } else {
        return (
            <div className="px-10 py-6 text-xs">
                <table className="border-2">
                    <tr>
                        <td className="px-4 py-2 border-2 font-bold">UPC</td>
                        <td className="px-4 py-2 border-2">{item.upc}</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-2 border-2 font-bold">SKU</td>
                        <td className="px-4 py-2 border-2">{item.sku}</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-2 border-2 font-bold">Owner Address</td>
                        <td className="px-4 py-2 border-2"><code>{item.ownerAddress}</code></td>
                    </tr>
                    <tr>
                        <td className="px-4 py-2 border-2 font-bold">Farmer Address</td>
                        <td className="px-4 py-2 border-2"><code>{item.farmerAddress}</code></td>
                    </tr>
                    <tr>
                        <td className="px-4 py-2 border-2 font-bold">Farm Name</td>
                        <td className="px-4 py-2 border-2">{item.farmName}</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-2 border-2 font-bold">Farm Information</td>
                        <td className="px-4 py-2 border-2">{item.farmInfo}</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-2 border-2 font-bold">Farm Latitude</td>
                        <td className="px-4 py-2 border-2">{item.farmLatitude}</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-2 border-2 font-bold">Farm Longitude</td>
                        <td className="px-4 py-2 border-2">{item.farmLongitude}</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-2 border-2 font-bold">Product ID</td>
                        <td className="px-4 py-2 border-2">{item.productID}</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-2 border-2 font-bold">Product Notes</td>
                        <td className="px-4 py-2 border-2">{item.productNotes}</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-2 border-2 font-bold">Price (in Wei)</td>
                        <td className="px-4 py-2 border-2">{item.price}</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-2 border-2 font-bold">Item State</td>
                        <td className="px-4 py-2 border-2">{item.itemState}</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-2 border-2 font-bold">Distributor Address</td>
                        <td className="px-4 py-2 border-2"><code>{item.distributorAddress}</code></td>
                    </tr>
                    <tr>
                        <td className="px-4 py-2 border-2 font-bold">Retailer Address</td>
                        <td className="px-4 py-2 border-2"><code>{item.retailerAddress}</code></td>
                    </tr>
                    <tr>
                        <td className="px-4 py-2 border-2 font-bold">Consumer Address</td>
                        <td className="px-4 py-2 border-2"><code>{item.consumerAddress}</code></td>
                    </tr>
                </table>
            </div>
        );
    }
};

export default ItemDetails;