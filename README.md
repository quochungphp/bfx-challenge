# Test
```bash
    $ npm i
    $ node solution1/server.js
    $ node solution1/client.js
```
# Result
```
hungle@Hungs-MacBook-Pro bfx-challenge % node solution1/client.js
Order request at place 1 in the sequence: 8
Order request at place 2 in the sequence: 3
Order request at place 3 in the sequence: 8
Order request at place 4 in the sequence: 2
=================Order list=================

Remained Order list: [
  {
    userId: 2,
    coin: 'BTC',
    orderType: 'BUY',
    amount: 3,
    orderedAt: 1667046797592,
    number: 2,
    sequence: 3
  },
  {
    userId: 4,
    coin: 'BTC',
    orderType: 'BUY',
    amount: 2,
    orderedAt: 1667046799596,
    number: 4,
    sequence: 2
  }
]
=================Transaction list=================

Transaction Order list: [
  {
    userId: 1,
    coin: 'BTC',
    orderType: 'BUY',
    amount: 5,
    orderedAt: 1667046796589,
    number: 1,
    sequence: 8,
    partner: {
      userId: 3,
      coin: 'BTC',
      orderType: 'SALE',
      amount: 5,
      orderedAt: 1667046798593,
      number: 3,
      sequence: 8
    }
  }
]

```
# Explanation with my understanding
``` My understanding
Solution 1:
I have orderBook(orderTable) that contains user's order request. Every order request I will push to orderBook.
After that, I check next incoming order request and compare with previous order in orderBook for example:
- If incoming request adapts with previous order between buyer/seller, I will move both of them to transactionOrder.
- Finally I have a couple order of Seller and Buyer and I remove out previous order from orderBook.
Hint: The transactionOrder, I use transactionOrder to save matched order of buyer and seller and remained orders that saves in orderBook.

Solution 2: 
Base on concept of solution 1, I would like to add a sort orderBook by orderId or createdAt to get prioritize order that comes first.
And then we can check it with incoming order request.
```