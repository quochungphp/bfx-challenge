# Test
```bash
    $ npm i
    $ node solution1/server.js
    $ node solution1/client.js
```
# Result output solution 1:
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
# Result output solution 2:
```
hungle@Hungs-MacBook-Pro bfx-challenge % node solution2/client.js
Order request at place 1 in the sequence: [ 8 ]
Order request at place 2 in the sequence: [ 3 ]
Order request at place 3 in the sequence: [
  {
    userId: 1,
    orderId: 1,
    coin: 'BTC',
    orderType: 'BUY',
    amount: 5,
    orderedAt: 1667056437499,
    number: 1,
    requestId: 'edcd2f0b-ba9d-40fd-bd7f-e0c71e348677',
    listener: 'fibonacci_worker',
    sequence: 8,
    partner: {
      userId: 3,
      orderId: 3,
      coin: 'BTC',
      orderType: 'SALE',
      amount: 5,
      orderedAt: 1667056437704,
      number: 3,
      requestId: 'df0b60a3-5cd9-4077-9c33-d8863d487838',
      listener: 'fibonacci_worker',
      sequence: 8
    }
  }
]
Order request at place 4 in the sequence: [ 2 ]
Order request at place 5 in the sequence: [ 2 ]
Order request at place 6 in the sequence: [ 2 ]
=================Order list=================

Remained Order list: [
  {
    userId: 2,
    orderId: 2,
    coin: 'BTC',
    orderType: 'BUY',
    amount: 3,
    orderedAt: 1667056437602,
    number: 2,
    requestId: 'e79501bc-efa0-42ce-a323-029111277c8d',
    listener: 'fibonacci_worker',
    sequence: 3
  },
  {
    userId: 4,
    orderId: 4,
    coin: 'BTC',
    orderType: 'BUY',
    amount: 2,
    orderedAt: 1667056437805,
    number: 4,
    requestId: 'f8bbffb7-8d7a-4d47-ba85-bd4ae21c6139',
    listener: 'fibonacci_worker',
    sequence: 2
  },
  {
    userId: 6,
    orderId: 8,
    coin: 'BTC',
    orderType: 'BUY',
    amount: 2,
    orderedAt: 1667056438009,
    number: 6,
    requestId: '23ba63c1-6689-4366-9945-46a118d22814',
    listener: 'fibonacci_worker',
    sequence: 2
  },
  {
    userId: 5,
    orderId: 9,
    coin: 'BTC',
    orderType: 'BUY',
    amount: 2,
    orderedAt: 1667056437907,
    number: 5,
    requestId: '57fef023-524f-4623-8c7d-a93ba50ce554',
    listener: 'fibonacci_worker',
    sequence: 2
  }
]
=================Transaction list=================

Transaction Order list: [
  {
    userId: 1,
    orderId: 1,
    coin: 'BTC',
    orderType: 'BUY',
    amount: 5,
    orderedAt: 1667056437499,
    number: 1,
    requestId: 'edcd2f0b-ba9d-40fd-bd7f-e0c71e348677',
    listener: 'fibonacci_worker',
    sequence: 8,
    partner: {
      userId: 3,
      orderId: 3,
      coin: 'BTC',
      orderType: 'SALE',
      amount: 5,
      orderedAt: 1667056437704,
      number: 3,
      requestId: 'df0b60a3-5cd9-4077-9c33-d8863d487838',
      listener: 'fibonacci_worker',
      sequence: 8
    }
  }
]
=================Stop=================
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