"use strict";

const { PeerRPCClient } = require("grenache-nodejs-ws");
const Link = require("grenache-nodejs-link");
function waitTime (ms = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


const link = new Link({
  grape: "http://127.0.0.1:30001",
  requestTimeout: 10000,
});
link.start();

const peer = new PeerRPCClient(link, {});
peer.init();

const requestOrders = [
  {
    userId: 1,
    coin: "BTC",
    orderType: "BUY",
    amount: 5,
  },
  {
    userId: 2,
    coin: "BTC",
    orderType: "BUY",
    amount: 3,
  },
  {
    userId: 3,
    coin: "BTC",
    orderType: "SALE",
    amount: 5,
  },
  {
    userId: 4,
    coin: "BTC",
    orderType: "BUY",
    amount: 2,
  },
];
const requestOrderInfo = () => {
  peer.request(
    "fibonacci_worker",
    "getOrderInfo",
    { timeout: 100000 },
    (err, result) => {
      console.log("Order list:", result);
    }
  );
};
let i = 1;
(async function () {
  for await (const order of requestOrders) {
    const payload = {
      ...order,
      orderedAt: Date.now(),
      number: i,
    };
    peer.request(
      "fibonacci_worker",
      payload,
      { timeout: 100000 },
      (err, result) => {
        // if (err) throw err
        console.log(
          "Order request at place",
          payload.number,
          "in the sequence:",
          result.sequence || result
        );
      }
    );
    if (i === requestOrders.length) {
      requestOrderInfo();
    }
    i++;
    await waitTime(1000)
  }
})();
