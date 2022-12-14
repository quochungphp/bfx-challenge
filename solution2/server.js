'use strict'
function fibonacci (n) {
    if (n <= 1) {
      return 1
    }
    return fibonacci(n - 1) + fibonacci(n - 2)
}
const { PeerRPCServer }  = require('grenache-nodejs-ws')
const Link = require('grenache-nodejs-link')
// ex: order table
let orderBook = [];
// ex: transaction table
let transactionOrder = [];

const link = new Link({
  grape: 'http://127.0.0.1:30001'
})
link.start()

const peer = new PeerRPCServer(link, {})
peer.init()

const service = peer.transport('server')
service.listen(1337)

setInterval(() => {
  link.announce('fibonacci_worker', service.port, {})
}, 1000)

service.on('request', (rid, listener, payload, handler) => {
  orderBook.sort(function(a,b) {
      if (a.orderId < b.orderId) {
        return -1;
      }
      if (a.orderId > b.orderId) {
        return 1;
      }
      return 0;
  });

  if(payload === 'getOrderInfo') {
    handler.reply(null, orderBook);
    return;
  }

  if(payload === 'getTransactionInfo') {
    handler.reply(null, transactionOrder);
    return;
  }

  payload = {
    ...payload,
    requestId: rid,
    listener
  }
  const sequence = fibonacci(payload.amount);
  let isMatchedOrder = false;
  let orderStatus = {};
  // check matched order
  if (orderBook.length > 1) {
    const matchedOrderIndex = orderBook.findIndex(orderBook => 
      orderBook.coin === payload.coin 
      && orderBook.orderType !== payload.orderType 
      && orderBook.amount === payload.amount);

    if (matchedOrderIndex > -1) {
      orderStatus = {
        ...orderBook[matchedOrderIndex],
        partner: {...payload , sequence }
      };
      transactionOrder.push(orderStatus)
      isMatchedOrder = true;
      orderBook.splice(matchedOrderIndex, 1);
    }
  }

  if (!isMatchedOrder) {
    orderBook.push({...payload, sequence });
    handler.reply(null, sequence)
  } else {
    isMatchedOrder = false;
    handler.reply(null, orderStatus)
  }
})