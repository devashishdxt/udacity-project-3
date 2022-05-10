const SupplyChain = artifacts.require("SupplyChain");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("SupplyChain", function (accounts) {
  var sku = 1;
  var upc = 1;

  const ownerID = accounts[0];
  const originFarmerID = accounts[1];
  const distributorID = accounts[2]
  const retailerID = accounts[3]
  const consumerID = accounts[4]

  const originFarmName = "John Doe";
  const originFarmInformation = "Yarray Valley";
  const originFarmLatitude = "-38.239770";
  const originFarmLongitude = "144.341490";
  const productNotes = "Best beans for Espresso";
  const productID = sku + upc;

  const productPrice = web3.utils.toWei('1', 'ether');

  console.log("account list...");
  console.log("Contract Owner: accounts[0] ", ownerID);
  console.log("Farmer: accounts[1] ", originFarmerID);
  console.log("Distributor: accounts[2] ", distributorID);
  console.log("Retailer: accounts[3] ", retailerID);
  console.log("Consumer: accounts[4] ", consumerID);

  // 1st Test
  it("Testing smart contract function harvestItem() that allows a farmer to harvest coffee", async () => {
    const supplyChain = await SupplyChain.deployed();

    // Add originFarmerID to the list of farmers
    const addFarmer = await supplyChain.addFarmer(originFarmerID);
    assert.equal(addFarmer.logs[0].event, 'FarmerAdded', 'Error: Invalid event');
    assert.equal(addFarmer.logs[0].args.account, originFarmerID, 'Error: Invalid Farmer ID');

    // Mark an item as Harvested by calling function harvestItem()
    const harvestItem = await supplyChain.harvestItem(upc, originFarmerID, originFarmName, originFarmInformation, originFarmLatitude, originFarmLongitude, productNotes);
    assert.equal(harvestItem.logs[0].event, 'Harvested', 'Error: Invalid event');
    assert.equal(harvestItem.logs[0].args.upc, upc, 'Error: Invalid UPC');

    // Retrieve the just now saved item from blockchain by calling function fetchItem()
    const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
    const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

    // Verify the result set
    assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU');
    assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC');
    assert.equal(resultBufferOne[2], originFarmerID, 'Error: Missing or Invalid ownerID');
    assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID');
    assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName');
    assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation');
    assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude');
    assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude');
    assert.equal(resultBufferTwo[5], 0, 'Error: Invalid item State');
  });

  // 2nd Test
  it("Testing smart contract function processItem() that allows a farmer to process coffee", async () => {
    const supplyChain = await SupplyChain.deployed();

    // Mark an item as Processed by calling function processtItem()
    const processItem = await supplyChain.processItem(upc, { from: originFarmerID });
    assert.equal(processItem.logs[0].event, 'Processed', 'Error: Invalid event');
    assert.equal(processItem.logs[0].args.upc, upc, 'Error: Invalid UPC');


    // Retrieve the just now saved item from blockchain by calling function fetchItem()
    const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
    const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

    // Verify the result set
    assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU');
    assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC');
    assert.equal(resultBufferOne[2], originFarmerID, 'Error: Missing or Invalid ownerID');
    assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID');
    assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName');
    assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation');
    assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude');
    assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude');
    assert.equal(resultBufferTwo[5], 1, 'Error: Invalid item State');
  });

  // 3rd Test
  it("Testing smart contract function packItem() that allows a farmer to pack coffee", async () => {
    const supplyChain = await SupplyChain.deployed();

    // Mark an item as Packed by calling function packItem()
    const packItem = await supplyChain.packItem(upc, { from: originFarmerID });
    assert.equal(packItem.logs[0].event, 'Packed', 'Error: Invalid event');
    assert.equal(packItem.logs[0].args.upc, upc, 'Error: Invalid UPC');

    // Retrieve the just now saved item from blockchain by calling function fetchItem()
    const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
    const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

    // Verify the result set
    assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU');
    assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC');
    assert.equal(resultBufferOne[2], originFarmerID, 'Error: Missing or Invalid ownerID');
    assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID');
    assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName');
    assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation');
    assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude');
    assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude');
    assert.equal(resultBufferTwo[5], 2, 'Error: Invalid item State');
  });

  // 4th Test
  it("Testing smart contract function sellItem() that allows a farmer to sell coffee", async () => {
    const supplyChain = await SupplyChain.deployed();

    // Mark an item as ForSale by calling function sellItem()
    const sellItem = await supplyChain.sellItem(upc, productPrice, { from: originFarmerID });
    assert.equal(sellItem.logs[0].event, 'ForSale', 'Error: Invalid event');
    assert.equal(sellItem.logs[0].args.upc, upc, 'Error: Invalid UPC');

    // Retrieve the just now saved item from blockchain by calling function fetchItem()
    const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
    const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

    // Verify the result set
    assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU');
    assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC');
    assert.equal(resultBufferOne[2], originFarmerID, 'Error: Missing or Invalid ownerID');
    assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID');
    assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName');
    assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation');
    assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude');
    assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude');
    assert.equal(resultBufferTwo[4], productPrice, 'Error: Invalid product price');
    assert.equal(resultBufferTwo[5], 3, 'Error: Invalid item State');
  });

  // 5th Test
  it("Testing smart contract function buyItem() that allows a distributor to buy coffee", async () => {
    const supplyChain = await SupplyChain.deployed();

    // Add distributorID to the list of distributors
    const addDistributor = await supplyChain.addDistributor(distributorID);
    assert.equal(addDistributor.logs[0].event, 'DistributorAdded', 'Error: Invalid event');
    assert.equal(addDistributor.logs[0].args.account, distributorID, 'Error: Invalid Distributor ID');

    // Mark an item as Sold by calling function buyItem()
    const buyItem = await supplyChain.buyItem(upc, { from: distributorID, value: productPrice });
    assert.equal(buyItem.logs[0].event, 'Sold', 'Error: Invalid event');
    assert.equal(buyItem.logs[0].args.upc, upc, 'Error: Invalid UPC');

    // Retrieve the just now saved item from blockchain by calling function fetchItem()
    const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
    const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

    // Verify the result set
    assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU');
    assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC');
    assert.equal(resultBufferOne[2], distributorID, 'Error: Missing or Invalid ownerID');
    assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID');
    assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName');
    assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation');
    assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude');
    assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude');
    assert.equal(resultBufferTwo[4], productPrice, 'Error: Invalid product price');
    assert.equal(resultBufferTwo[5], 4, 'Error: Invalid item State');
    assert.equal(resultBufferTwo[6], distributorID, 'Error: Invalid distributor ID');
  });

  // 6th Test
  it("Testing smart contract function shipItem() that allows a distributor to ship coffee", async () => {
    const supplyChain = await SupplyChain.deployed();

    // Mark an item as Shipped by calling function shipItem()
    const shipItem = await supplyChain.shipItem(upc, { from: distributorID });
    assert.equal(shipItem.logs[0].event, 'Shipped', 'Error: Invalid event');
    assert.equal(shipItem.logs[0].args.upc, upc, 'Error: Invalid UPC');

    // Retrieve the just now saved item from blockchain by calling function fetchItem()
    const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
    const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

    // Verify the result set
    assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU');
    assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC');
    assert.equal(resultBufferOne[2], distributorID, 'Error: Missing or Invalid ownerID');
    assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID');
    assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName');
    assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation');
    assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude');
    assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude');
    assert.equal(resultBufferTwo[4], productPrice, 'Error: Invalid product price');
    assert.equal(resultBufferTwo[5], 5, 'Error: Invalid item State');
    assert.equal(resultBufferTwo[6], distributorID, 'Error: Invalid distributor ID');
  });

  // 7th Test
  it("Testing smart contract function receiveItem() that allows a retailer to mark coffee received", async () => {
    const supplyChain = await SupplyChain.deployed();

    // Add retailerID to the list of retailers
    const addRetailer = await supplyChain.addRetailer(retailerID);
    assert.equal(addRetailer.logs[0].event, 'RetailerAdded', 'Error: Invalid event');
    assert.equal(addRetailer.logs[0].args.account, retailerID, 'Error: Invalid Retailer ID');

    // Mark an item as Received by calling function receiveItem()
    const receiveItem = await supplyChain.receiveItem(upc, { from: retailerID });
    assert.equal(receiveItem.logs[0].event, 'Received', 'Error: Invalid event');
    assert.equal(receiveItem.logs[0].args.upc, upc, 'Error: Invalid UPC');

    // Retrieve the just now saved item from blockchain by calling function fetchItem()
    const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
    const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

    // Verify the result set
    assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU');
    assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC');
    assert.equal(resultBufferOne[2], retailerID, 'Error: Missing or Invalid ownerID');
    assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID');
    assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName');
    assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation');
    assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude');
    assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude');
    assert.equal(resultBufferTwo[4], productPrice, 'Error: Invalid product price');
    assert.equal(resultBufferTwo[5], 6, 'Error: Invalid item State');
    assert.equal(resultBufferTwo[6], distributorID, 'Error: Invalid distributor ID');
    assert.equal(resultBufferTwo[7], retailerID, 'Error: Invalid retailer ID');
  });

  // 8th Test
  it("Testing smart contract function purchaseItem() that allows a consumer to purchase coffee", async () => {
    const supplyChain = await SupplyChain.deployed();

    // Add consumerID to the list of consumers
    const addConsumer = await supplyChain.addConsumer(consumerID);
    assert.equal(addConsumer.logs[0].event, 'ConsumerAdded', 'Error: Invalid event');
    assert.equal(addConsumer.logs[0].args.account, consumerID, 'Error: Invalid Consumer ID');

    // Mark an item as Purchased by calling function purchaseItem()
    const purchaseItem = await supplyChain.purchaseItem(upc, { from: consumerID });
    assert.equal(purchaseItem.logs[0].event, 'Purchased', 'Error: Invalid event');
    assert.equal(purchaseItem.logs[0].args.upc, upc, 'Error: Invalid UPC');

    // Retrieve the just now saved item from blockchain by calling function fetchItem()
    const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
    const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

    // Verify the result set
    assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU');
    assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC');
    assert.equal(resultBufferOne[2], consumerID, 'Error: Missing or Invalid ownerID');
    assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID');
    assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName');
    assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation');
    assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude');
    assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude');
    assert.equal(resultBufferTwo[4], productPrice, 'Error: Invalid product price');
    assert.equal(resultBufferTwo[5], 7, 'Error: Invalid item State');
    assert.equal(resultBufferTwo[6], distributorID, 'Error: Invalid distributor ID');
    assert.equal(resultBufferTwo[7], retailerID, 'Error: Invalid retailer ID');
    assert.equal(resultBufferTwo[8], consumerID, 'Error: Invalid consumer ID');
  });

  // 9th Test
  it("Testing smart contract function fetchItemBufferOne() that allows anyone to fetch item details from blockchain", async () => {
    const supplyChain = await SupplyChain.deployed();

    // Retrieve the just now saved item from blockchain by calling function fetchItem()
    const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);

    // Verify the result set:
    assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU');
    assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC');
    assert.equal(resultBufferOne[2], consumerID, 'Error: Missing or Invalid ownerID');
    assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID');
    assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName');
    assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation');
    assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude');
    assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude');
  });

  // 10th Test
  it("Testing smart contract function fetchItemBufferTwo() that allows anyone to fetch item details from blockchain", async () => {
    const supplyChain = await SupplyChain.deployed();

    // Retrieve the just now saved item from blockchain by calling function fetchItem()
    const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

    // Verify the result set:
    assert.equal(resultBufferTwo[0], sku, 'Error: Invalid item SKU');
    assert.equal(resultBufferTwo[1], upc, 'Error: Invalid item UPC');
    assert.equal(resultBufferTwo[2], productID, 'Error: Invalid product ID');
    assert.equal(resultBufferTwo[3], productNotes, 'Error: Invalid product notes');
    assert.equal(resultBufferTwo[4], productPrice, 'Error: Invalid product price');
    assert.equal(resultBufferTwo[5], 7, 'Error: Invalid item State');
    assert.equal(resultBufferTwo[6], distributorID, 'Error: Invalid distributor ID');
    assert.equal(resultBufferTwo[7], retailerID, 'Error: Invalid retailer ID');
    assert.equal(resultBufferTwo[8], consumerID, 'Error: Invalid consumer ID');
  });
});
