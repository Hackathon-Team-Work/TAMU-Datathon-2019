function findCategory(id /* '13005032' */, categoryTree) {
  var firstLevel = +id.substring(0, 2);
  var secondLevel = +id.substring(3, 5);
  var thirdLevel = +id.substring(6, 8);
  var result = null;
  if (firstLevel) {
    result = categoryTree[firstLevel - 10];
    if (secondLevel) {
      result = result.children[secondLevel - 1];
      if (thirdLevel) {
        result = result.children[thirdLevel - 1];
      }
    }
  }
  return result;
}
function populateTreeWithValues(transactions, categoryTree) {
  transactions.forEach(transaction => {
    var category = findCategory(transaction.category_id, categoryTree);
    var amount = Math.abs(transaction.amount);
    if (!category.value) {
      category.value = amount;
    } else {
      category.value += amount;
    }
  });
}
function calcSum(root) {
  var sum = root.value;
  if (root.children) {
    root.children.forEach(child => {
      sum += calcSum(child);
    });
  }
  root.value = sum;
}
function updateSums(root) {
  if (!root.children) {
    if (!root.value) {
      root.value = 0;
    }
    return root.value;
  }
  var sum = 0;
  root.children.forEach(child => {
    sum += updateSums(child);
  });
  if (root.value) {
    root.value += sum;
  } else {
    root.value = sum;
  }
  return root.value;
}
function findSubCategories(root, result) {
  result.push(root.id);
  if (!root.children) {
    return;
  } else {
    root.children.forEach(el => {
      findSubCategories(el, result);
    });
  }
}
export default {
  findCategory,
  populateTreeWithValues,
  calcSum,
  updateSums,
  findSubCategories
};

// var categories = require("../data/CategoryTree.json");
// var transactions = [
//   {
//     account_id: "bOwYxeA3rvTa1b7Q8YzqfRANOQ6MVqtqznxKV",
//     account_owner: null,
//     amount: 8.88,
//     category: ["Food and Drink", "Restaurants", "Fast Food"],
//     category_id: "13005032",
//     date: "2019-07-11",
//     iso_currency_code: "USD",
//     location: {
//       address: "3000 W 7th St",
//       city: "Fort Worth",
//       country: null,
//       lat: 32.75172,
//       lon: -97.360626,
//       postal_code: "76107",
//       region: "TX",
//       store_number: null
//     },
//     name: "Chipotle Mexican Grill",
//     payment_meta: {
//       by_order_of: null,
//       payee: null,
//       payer: null,
//       payment_method: null,
//       payment_processor: null,
//       ppd_id: null,
//       reason: null,
//       reference_number: null
//     },
//     pending: true,
//     pending_transaction_id: null,
//     transaction_id: "Y8XYKVDd4xhy0kgrPVD8ujMvekOpkNIQX5Nkn",
//     transaction_type: "place",
//     unofficial_currency_code: null
//   },
//   {
//     account_id: "bOwYxeA3rvTa1b7Q8YzqfRANOQ6MVqtqznxKV",
//     account_owner: null,
//     amount: 31.95,
//     category: ["Shops", "Warehouses and Wholesale Stores"],
//     category_id: "19051000",
//     date: "2019-07-10",
//     iso_currency_code: "USD",
//     location: {
//       address: null,
//       city: "Plano",
//       country: null,
//       lat: null,
//       lon: null,
//       postal_code: null,
//       region: "TX",
//       store_number: null
//     },
//     name: "SAMSCLUB #6255 PLANO TX 07/10",
//     payment_meta: {
//       by_order_of: null,
//       payee: null,
//       payer: null,
//       payment_method: null,
//       payment_processor: null,
//       ppd_id: null,
//       reason: null,
//       reference_number: null
//     },
//     pending: false,
//     pending_transaction_id: "04nw3P9J65cZRQnMbJDquRBeYnRBb9trqzb3O",
//     transaction_id: "9gxy401VQzc8PxOnbzowF3Qb8xX8zwudqZJrB",
//     transaction_type: "place",
//     unofficial_currency_code: null
//   },
//   {
//     account_id: "bOwYxeA3rvTa1b7Q8YzqfRANOQ6MVqtqznxKV",
//     account_owner: null,
//     amount: 14.03,
//     category: ["Shops", "Department Stores"],
//     category_id: "19018000",
//     date: "2019-07-10",
//     iso_currency_code: "USD",
//     location: {
//       address: null,
//       city: null,
//       country: null,
//       lat: null,
//       lon: null,
//       postal_code: null,
//       region: null,
//       store_number: null
//     },
//     name: "Walmart",
//     payment_meta: {
//       by_order_of: null,
//       payee: null,
//       payer: null,
//       payment_method: null,
//       payment_processor: null,
//       ppd_id: null,
//       reason: null,
//       reference_number: null
//     },
//     pending: false,
//     pending_transaction_id: null,
//     transaction_id: "7oxBjAL73nt3ga6PORXbhkMOBbwB15hQJ6Zze",
//     transaction_type: "place",
//     unofficial_currency_code: null
//   },
//   {
//     account_id: "bOwYxeA3rvTa1b7Q8YzqfRANOQ6MVqtqznxKV",
//     account_owner: null,
//     amount: 3.41,
//     category: ["Food and Drink", "Restaurants", "Coffee Shop"],
//     category_id: "13005043",
//     date: "2019-07-09",
//     iso_currency_code: "USD",
//     location: {
//       address: "6405 N Beach St",
//       city: "Fort Worth",
//       country: null,
//       lat: 32.85985,
//       lon: -97.290221,
//       postal_code: "76137",
//       region: "TX",
//       store_number: null
//     },
//     name: "Starbucks",
//     payment_meta: {
//       by_order_of: null,
//       payee: null,
//       payer: null,
//       payment_method: null,
//       payment_processor: null,
//       ppd_id: null,
//       reason: null,
//       reference_number: null
//     },
//     pending: false,
//     pending_transaction_id: "AQ84bZAenBc0aKekyNDAUmoR5dvxVOI64wdKp",
//     transaction_id: "nPAYMeoJ5xsO475z3PEDhwgJg871vJFAkYPZz",
//     transaction_type: "place",
//     unofficial_currency_code: null
//   },
//   {
//     account_id: "bOwYxeA3rvTa1b7Q8YzqfRANOQ6MVqtqznxKV",
//     account_owner: null,
//     amount: 8.52,
//     category: ["Shops", "Department Stores"],
//     category_id: "19018000",
//     date: "2019-07-09",
//     iso_currency_code: "USD",
//     location: {
//       address: null,
//       city: null,
//       country: null,
//       lat: null,
//       lon: null,
//       postal_code: null,
//       region: null,
//       store_number: null
//     },
//     name: "Walmart",
//     payment_meta: {
//       by_order_of: null,
//       payee: null,
//       payer: null,
//       payment_method: null,
//       payment_processor: null,
//       ppd_id: null,
//       reason: null,
//       reference_number: null
//     },
//     pending: false,
//     pending_transaction_id: "bOwYxeA3rvTa1b7Q8YzNiKmd49mQaKfqzypLn",
//     transaction_id: "QvkYLV9ey1u6qn5PDApac3NQNPKZmQiEx5B1X",
//     transaction_type: "place",
//     unofficial_currency_code: null
//   },
//   {
//     account_id: "bOwYxeA3rvTa1b7Q8YzqfRANOQ6MVqtqznxKV",
//     account_owner: null,
//     amount: 11.02,
//     category: ["Food and Drink", "Restaurants"],
//     category_id: "13005000",
//     date: "2019-07-08",
//     iso_currency_code: "USD",
//     location: {
//       address: null,
//       city: "Frisco",
//       country: null,
//       lat: null,
//       lon: null,
//       postal_code: null,
//       region: "TX",
//       store_number: null
//     },
//     name: "BIG EASY CAJUN FRISCO TX 07/05",
//     payment_meta: {
//       by_order_of: null,
//       payee: null,
//       payer: null,
//       payment_method: null,
//       payment_processor: null,
//       ppd_id: null,
//       reason: null,
//       reference_number: null
//     },
//     pending: false,
//     pending_transaction_id: "ryrLne9o5Khx3bg9oyLVI7Rkb0Nb0zhBReoxB",
//     transaction_id: "9gxy401VQzc8PxOnbzo5ixLnDyogyNfdqJ6Mo",
//     transaction_type: "place",
//     unofficial_currency_code: null
//   },
//   {
//     account_id: "bOwYxeA3rvTa1b7Q8YzqfRANOQ6MVqtqznxKV",
//     account_owner: null,
//     amount: 46.44,
//     category: ["Service", "Business Services", "Printing and Publishing"],
//     category_id: "18008001",
//     date: "2019-07-08",
//     iso_currency_code: "USD",
//     location: {
//       address: null,
//       city: null,
//       country: null,
//       lat: null,
//       lon: null,
//       postal_code: null,
//       region: null,
//       store_number: null
//     },
//     name: "Bestcanvas Inc FL 07/07",
//     payment_meta: {
//       by_order_of: null,
//       payee: null,
//       payer: null,
//       payment_method: null,
//       payment_processor: null,
//       ppd_id: null,
//       reason: null,
//       reference_number: null
//     },
//     pending: false,
//     pending_transaction_id: "65eq0k6gZNsNEmazdLwksYvMyZOXLLCazBA1p",
//     transaction_id: "7oxBjAL73nt3ga6PORXqHbazjrnDrdUQJZ89k",
//     transaction_type: "place",
//     unofficial_currency_code: null
//   },
//   {
//     account_id: "bOwYxeA3rvTa1b7Q8YzqfRANOQ6MVqtqznxKV",
//     account_owner: null,
//     amount: 32.03,
//     category: ["Transfer", "Debit"],
//     category_id: "21006000",
//     date: "2019-07-08",
//     iso_currency_code: "USD",
//     location: {
//       address: null,
//       city: null,
//       country: null,
//       lat: null,
//       lon: null,
//       postal_code: null,
//       region: null,
//       store_number: null
//     },
//     name: "HAWAIIAN FALLS - CORP TX 07/06",
//     payment_meta: {
//       by_order_of: null,
//       payee: null,
//       payer: null,
//       payment_method: null,
//       payment_processor: null,
//       ppd_id: null,
//       reason: null,
//       reference_number: null
//     },
//     pending: false,
//     pending_transaction_id: "w0RB6YwVm9imob84P0BzsB1LjZ6Y54fLNOgQL",
//     transaction_id: "gnPYoe4vm9i5mDpjJZ49Ug3RZENwE4iqkE6pa",
//     transaction_type: "special",
//     unofficial_currency_code: null
//   },
//   {
//     account_id: "bOwYxeA3rvTa1b7Q8YzqfRANOQ6MVqtqznxKV",
//     account_owner: null,
//     amount: 3,
//     category: ["Food and Drink"],
//     category_id: "13000000",
//     date: "2019-07-05",
//     iso_currency_code: "USD",
//     location: {
//       address: null,
//       city: "Dallas",
//       country: null,
//       lat: null,
//       lon: null,
//       postal_code: null,
//       region: "TX",
//       store_number: null
//     },
//     name: "DART TICKET VENDING DALLAS TX 07/03",
//     payment_meta: {
//       by_order_of: null,
//       payee: null,
//       payer: null,
//       payment_method: null,
//       payment_processor: null,
//       ppd_id: null,
//       reason: null,
//       reference_number: null
//     },
//     pending: false,
//     pending_transaction_id: "1an6yqV8LNuzP91MgrRqFoVob7Nzn1cmNokzq",
//     transaction_id: "65eq0k6gZNsNEmazdLwVSJ7jXbm6VjtaRK4On",
//     transaction_type: "place",
//     unofficial_currency_code: null
//   },
//   {
//     account_id: "bOwYxeA3rvTa1b7Q8YzqfRANOQ6MVqtqznxKV",
//     account_owner: null,
//     amount: -485.6,
//     category: ["Transfer", "Deposit"],
//     category_id: "21007000",
//     date: "2019-07-05",
//     iso_currency_code: "USD",
//     location: {
//       address: null,
//       city: null,
//       country: null,
//       lat: null,
//       lon: null,
//       postal_code: null,
//       region: null,
//       store_number: null
//     },
//     name: "LOCKHEED MARTIN DIR DEP PPD ID: 4521893632",
//     payment_meta: {
//       by_order_of: null,
//       payee: null,
//       payer: null,
//       payment_method: null,
//       payment_processor: null,
//       ppd_id: null,
//       reason: null,
//       reference_number: null
//     },
//     pending: false,
//     pending_transaction_id: "DwxJ9bje5vh0Y5DqodXNimbv94adqYUZbXn3w",
//     transaction_id: "dELY8e0KX4IJyqYwPnErtOKAQaMjpAhbOpx5m",
//     transaction_type: "special",
//     unofficial_currency_code: null
//   },
//   {
//     account_id: "bOwYxeA3rvTa1b7Q8YzqfRANOQ6MVqtqznxKV",
//     account_owner: null,
//     amount: 7.92,
//     category: ["Travel", "Car Service", "Ride Share"],
//     category_id: "22006001",
//     date: "2019-07-05",
//     iso_currency_code: "USD",
//     location: {
//       address: null,
//       city: null,
//       country: null,
//       lat: null,
//       lon: null,
//       postal_code: null,
//       region: null,
//       store_number: null
//     },
//     name: "Lyft",
//     payment_meta: {
//       by_order_of: null,
//       payee: null,
//       payer: null,
//       payment_method: null,
//       payment_processor: null,
//       ppd_id: null,
//       reason: null,
//       reference_number: null
//     },
//     pending: false,
//     pending_transaction_id: "9gxy401VQzc8PxOnbzonsz9DOLeLyBCdj0gb5",
//     transaction_id: "w0RB6YwVm9imob84P0BZHA16QgVXq6iLNXj5m",
//     transaction_type: "special",
//     unofficial_currency_code: null
//   },
//   {
//     account_id: "bOwYxeA3rvTa1b7Q8YzqfRANOQ6MVqtqznxKV",
//     account_owner: null,
//     amount: 2.59,
//     category: ["Food and Drink", "Restaurants", "Fast Food"],
//     category_id: "13005032",
//     date: "2019-07-03",
//     iso_currency_code: "USD",
//     location: {
//       address: "5000 W Slaughter Ln Ste 400",
//       city: "Austin",
//       country: null,
//       lat: 30.200486,
//       lon: -97.864015,
//       postal_code: "78749",
//       region: "TX",
//       store_number: null
//     },
//     name: "Wendy's",
//     payment_meta: {
//       by_order_of: null,
//       payee: null,
//       payer: null,
//       payment_method: null,
//       payment_processor: null,
//       ppd_id: null,
//       reason: null,
//       reference_number: null
//     },
//     pending: false,
//     pending_transaction_id: "ZZXYkV1w43SKjAOe3p1eIXaw5E97ypCRDZzLE",
//     transaction_id: "1an6yqV8LNuzP91MgrRqFZwBXjYBdBfmNeejL",
//     transaction_type: "place",
//     unofficial_currency_code: null
//   },
//   {
//     account_id: "bOwYxeA3rvTa1b7Q8YzqfRANOQ6MVqtqznxKV",
//     account_owner: null,
//     amount: 3.88,
//     category: ["Shops", "Food and Beverage Store"],
//     category_id: "19025000",
//     date: "2019-07-02",
//     iso_currency_code: "USD",
//     location: {
//       address: null,
//       city: "Richardson",
//       country: null,
//       lat: null,
//       lon: null,
//       postal_code: null,
//       region: "TX",
//       store_number: null
//     },
//     name: "FENG CHA TEAHOUSE RICHARDSON TX 06/30",
//     payment_meta: {
//       by_order_of: null,
//       payee: null,
//       payer: null,
//       payment_method: null,
//       payment_processor: null,
//       ppd_id: null,
//       reason: null,
//       reference_number: null
//     },
//     pending: false,
//     pending_transaction_id: "R0AYDEVe7PiLB1Ae0vo4SXrPk8xBYkIyZKQzP",
//     transaction_id: "65eq0k6gZNsNEmazdLwzi0Jv6kaKZ9taBZ04Z",
//     transaction_type: "place",
//     unofficial_currency_code: null
//   },
//   {
//     account_id: "bOwYxeA3rvTa1b7Q8YzqfRANOQ6MVqtqznxKV",
//     account_owner: null,
//     amount: 5,
//     category: ["Food and Drink", "Restaurants"],
//     category_id: "13005000",
//     date: "2019-07-01",
//     iso_currency_code: "USD",
//     location: {
//       address: null,
//       city: null,
//       country: null,
//       lat: null,
//       lon: null,
//       postal_code: null,
//       region: null,
//       store_number: null
//     },
//     name: "LIME US WWW.LIMEBIKE. CA 06/30",
//     payment_meta: {
//       by_order_of: null,
//       payee: null,
//       payer: null,
//       payment_method: null,
//       payment_processor: null,
//       ppd_id: null,
//       reason: null,
//       reference_number: null
//     },
//     pending: false,
//     pending_transaction_id: "m1kYOe5xRrFVk4rzE15XhZrzXe3DLntM16oMJ",
//     transaction_id: "eRDYZejkrvu8Bvj6a9RdUJwYg5y83gId3LJEQ",
//     transaction_type: "place",
//     unofficial_currency_code: null
//   },
//   {
//     account_id: "bOwYxeA3rvTa1b7Q8YzqfRANOQ6MVqtqznxKV",
//     account_owner: null,
//     amount: 6.8,
//     category: ["Food and Drink", "Restaurants"],
//     category_id: "13005000",
//     date: "2019-07-01",
//     iso_currency_code: "USD",
//     location: {
//       address: null,
//       city: null,
//       country: null,
//       lat: null,
//       lon: null,
//       postal_code: null,
//       region: null,
//       store_number: null
//     },
//     name: "LIME US WWW.LIMEBIKE. CA 06/30",
//     payment_meta: {
//       by_order_of: null,
//       payee: null,
//       payer: null,
//       payment_method: null,
//       payment_processor: null,
//       ppd_id: null,
//       reason: null,
//       reference_number: null
//     },
//     pending: false,
//     pending_transaction_id: "AQ84bZAenBc0aKekyND8CNpr79KZdOH6ovmyN",
//     transaction_id: "XJXYyOLe70S3vKARrQL7cmRYVM4JpVc4NOwmw",
//     transaction_type: "place",
//     unofficial_currency_code: null
//   },
//   {
//     account_id: "bOwYxeA3rvTa1b7Q8YzqfRANOQ6MVqtqznxKV",
//     account_owner: null,
//     amount: 10,
//     category: ["Food and Drink", "Restaurants"],
//     category_id: "13005000",
//     date: "2019-07-01",
//     iso_currency_code: "USD",
//     location: {
//       address: null,
//       city: null,
//       country: null,
//       lat: null,
//       lon: null,
//       postal_code: null,
//       region: null,
//       store_number: null
//     },
//     name: "LIME US WWW.LIMEBIKE. CA 06/30",
//     payment_meta: {
//       by_order_of: null,
//       payee: null,
//       payer: null,
//       payment_method: null,
//       payment_processor: null,
//       ppd_id: null,
//       reason: null,
//       reference_number: null
//     },
//     pending: false,
//     pending_transaction_id: "kLyY9e84R0s7Kxg9JL8ATeqn4brXy5fRgrkY4",
//     transaction_id: "NK3OdVbY46FYgwXOby8numMP4Jxgz4cR6pJaz",
//     transaction_type: "place",
//     unofficial_currency_code: null
//   },
//   {
//     account_id: "bOwYxeA3rvTa1b7Q8YzqfRANOQ6MVqtqznxKV",
//     account_owner: null,
//     amount: 10,
//     category: ["Food and Drink", "Restaurants"],
//     category_id: "13005000",
//     date: "2019-07-01",
//     iso_currency_code: "USD",
//     location: {
//       address: null,
//       city: null,
//       country: null,
//       lat: null,
//       lon: null,
//       postal_code: null,
//       region: null,
//       store_number: null
//     },
//     name: "PHO THAISON GUADALUPE AUSTIN TX 06/30",
//     payment_meta: {
//       by_order_of: null,
//       payee: null,
//       payer: null,
//       payment_method: null,
//       payment_processor: null,
//       ppd_id: null,
//       reason: null,
//       reference_number: null
//     },
//     pending: false,
//     pending_transaction_id: "KBP7nXZeM5sXwm5d1n3xUV5Dk4p67atQkeObe",
//     transaction_id: "Y8XYKVDd4xhy0kgrPVDNhBENZ5jeXZFQMnxBR",
//     transaction_type: "place",
//     unofficial_currency_code: null
//   },
//   {
//     account_id: "bOwYxeA3rvTa1b7Q8YzqfRANOQ6MVqtqznxKV",
//     account_owner: null,
//     amount: 20.2,
//     category: ["Shops", "Clothing and Accessories"],
//     category_id: "19012000",
//     date: "2019-07-01",
//     iso_currency_code: "USD",
//     location: {
//       address: null,
//       city: null,
//       country: null,
//       lat: null,
//       lon: null,
//       postal_code: null,
//       region: null,
//       store_number: null
//     },
//     name: "SP * PETE & PEDRO HTTPSPETEPEDR GA 06/29",
//     payment_meta: {
//       by_order_of: null,
//       payee: null,
//       payer: null,
//       payment_method: null,
//       payment_processor: null,
//       ppd_id: null,
//       reason: null,
//       reference_number: null
//     },
//     pending: false,
//     pending_transaction_id: "w0RB6YwVm9imob84P0BYimyrVzLEwJcLB8mLo",
//     transaction_id: "pBxwRegZoYsP8bVqzBw4udRXx40BgxFJw71Vy",
//     transaction_type: "place",
//     unofficial_currency_code: null
//   },
//   {
//     account_id: "bOwYxeA3rvTa1b7Q8YzqfRANOQ6MVqtqznxKV",
//     account_owner: null,
//     amount: -50,
//     category: ["Transfer", "Third Party", "Venmo"],
//     category_id: "21010001",
//     date: "2019-07-01",
//     iso_currency_code: "USD",
//     location: {
//       address: null,
//       city: null,
//       country: null,
//       lat: null,
//       lon: null,
//       postal_code: null,
//       region: null,
//       store_number: null
//     },
//     name: "Venmo",
//     payment_meta: {
//       by_order_of: null,
//       payee: null,
//       payer: null,
//       payment_method: null,
//       payment_processor: "Braintree",
//       ppd_id: null,
//       reason: null,
//       reference_number: null
//     },
//     pending: false,
//     pending_transaction_id: "yr4yDeLY5ohERbj6VrygT6XXpvM8dzIOywpQQ",
//     transaction_id: "QvkYLV9ey1u6qn5PDApOTAN8mRoqymCExwDnj",
//     transaction_type: "special",
//     unofficial_currency_code: null
//   },
//   {
//     account_id: "bOwYxeA3rvTa1b7Q8YzqfRANOQ6MVqtqznxKV",
//     account_owner: null,
//     amount: 22.46,
//     category: ["Shops", "Department Stores"],
//     category_id: "19018000",
//     date: "2019-07-01",
//     iso_currency_code: "USD",
//     location: {
//       address: null,
//       city: "Plano",
//       country: null,
//       lat: null,
//       lon: null,
//       postal_code: null,
//       region: "TX",
//       store_number: null
//     },
//     name: "Walmart",
//     payment_meta: {
//       by_order_of: null,
//       payee: null,
//       payer: null,
//       payment_method: null,
//       payment_processor: null,
//       ppd_id: null,
//       reason: null,
//       reference_number: null
//     },
//     pending: false,
//     pending_transaction_id: "dELY8e0KX4IJyqYwPnEXs0P5Mmy6LgHbavzbp",
//     transaction_id: "nPAYMeoJ5xsO475z3PEBhMgxvm4PnvTAkMny5",
//     transaction_type: "place",
//     unofficial_currency_code: null
//   },
//   {
//     account_id: "bOwYxeA3rvTa1b7Q8YzqfRANOQ6MVqtqznxKV",
//     account_owner: null,
//     amount: -485.59,
//     category: ["Transfer", "Deposit"],
//     category_id: "21007000",
//     date: "2019-06-28",
//     iso_currency_code: "USD",
//     location: {
//       address: null,
//       city: null,
//       country: null,
//       lat: null,
//       lon: null,
//       postal_code: null,
//       region: null,
//       store_number: null
//     },
//     name: "LOCKHEED MARTIN DIR DEP PPD ID: 4521893632",
//     payment_meta: {
//       by_order_of: null,
//       payee: null,
//       payer: null,
//       payment_method: null,
//       payment_processor: null,
//       ppd_id: null,
//       reason: null,
//       reference_number: null
//     },
//     pending: false,
//     pending_transaction_id: null,
//     transaction_id: "AQ84bZAenBc0aKekyNDjuw974KDVaYS6AVBgE",
//     transaction_type: "special",
//     unofficial_currency_code: null
//   },
//   {
//     account_id: "bOwYxeA3rvTa1b7Q8YzqfRANOQ6MVqtqznxKV",
//     account_owner: null,
//     amount: 33.79,
//     category: ["Shops", "Warehouses and Wholesale Stores"],
//     category_id: "19051000",
//     date: "2019-06-27",
//     iso_currency_code: "USD",
//     location: {
//       address: null,
//       city: "Plano",
//       country: null,
//       lat: null,
//       lon: null,
//       postal_code: null,
//       region: "TX",
//       store_number: null
//     },
//     name: "Sam's Club",
//     payment_meta: {
//       by_order_of: null,
//       payee: null,
//       payer: null,
//       payment_method: null,
//       payment_processor: null,
//       ppd_id: null,
//       reason: null,
//       reference_number: null
//     },
//     pending: false,
//     pending_transaction_id: null,
//     transaction_id: "vvgqwed9k5u5obD74vq3UOv3REjweYTmqZ7N6",
//     transaction_type: "place",
//     unofficial_currency_code: null
//   },
//   {
//     account_id: "bOwYxeA3rvTa1b7Q8YzqfRANOQ6MVqtqznxKV",
//     account_owner: null,
//     amount: 39,
//     category: ["Travel", "Charter Buses"],
//     category_id: "22007000",
//     date: "2019-06-24",
//     iso_currency_code: "USD",
//     location: {
//       address: null,
//       city: null,
//       country: null,
//       lat: null,
//       lon: null,
//       postal_code: null,
//       region: null,
//       store_number: null
//     },
//     name: "GREYHOUND LINES CNP TX 06/22",
//     payment_meta: {
//       by_order_of: null,
//       payee: null,
//       payer: null,
//       payment_method: null,
//       payment_processor: null,
//       ppd_id: null,
//       reason: null,
//       reference_number: null
//     },
//     pending: false,
//     pending_transaction_id: null,
//     transaction_id: "04nw3P9J65cZRQnMbJD3uyOPk38XwKhr4p58n",
//     transaction_type: "place",
//     unofficial_currency_code: null
//   },
//   {
//     account_id: "bOwYxeA3rvTa1b7Q8YzqfRANOQ6MVqtqznxKV",
//     account_owner: null,
//     amount: 1,
//     category: ["Food and Drink"],
//     category_id: "13000000",
//     date: "2019-06-18",
//     iso_currency_code: "USD",
//     location: {
//       address: null,
//       city: null,
//       country: null,
//       lat: null,
//       lon: null,
//       postal_code: null,
//       region: null,
//       store_number: null
//     },
//     name: "CANTEEN DALLAS 972-392- GRAPEVINE TX 06/17",
//     payment_meta: {
//       by_order_of: null,
//       payee: null,
//       payer: null,
//       payment_method: null,
//       payment_processor: null,
//       ppd_id: null,
//       reason: null,
//       reference_number: null
//     },
//     pending: false,
//     pending_transaction_id: null,
//     transaction_id: "j63z7mJrR0iYVyMz56JwU6vVAOeoY8FRnxYOy",
//     transaction_type: "place",
//     unofficial_currency_code: null
//   },
//   {
//     account_id: "bOwYxeA3rvTa1b7Q8YzqfRANOQ6MVqtqznxKV",
//     account_owner: null,
//     amount: 28,
//     category: ["Food and Drink", "Restaurants"],
//     category_id: "13005000",
//     date: "2019-06-17",
//     iso_currency_code: "USD",
//     location: {
//       address: null,
//       city: null,
//       country: null,
//       lat: null,
//       lon: null,
//       postal_code: null,
//       region: null,
//       store_number: null
//     },
//     name: "GEN KOREAN BBQ HOUSE CARROLLTON TX 06/15",
//     payment_meta: {
//       by_order_of: null,
//       payee: null,
//       payer: null,
//       payment_method: null,
//       payment_processor: null,
//       ppd_id: null,
//       reason: null,
//       reference_number: null
//     },
//     pending: false,
//     pending_transaction_id: null,
//     transaction_id: "aVdYapkBrXs4b1end9kziXYP9VpvxMFZA6aYv",
//     transaction_type: "place",
//     unofficial_currency_code: null
//   },
//   {
//     account_id: "bOwYxeA3rvTa1b7Q8YzqfRANOQ6MVqtqznxKV",
//     account_owner: null,
//     amount: 5.9,
//     category: ["Food and Drink", "Restaurants"],
//     category_id: "13005000",
//     date: "2019-06-17",
//     iso_currency_code: "USD",
//     location: {
//       address: null,
//       city: null,
//       country: null,
//       lat: null,
//       lon: null,
//       postal_code: null,
//       region: null,
//       store_number: null
//     },
//     name: "MECCHA MATCHA Plano TX 06/15",
//     payment_meta: {
//       by_order_of: null,
//       payee: null,
//       payer: null,
//       payment_method: null,
//       payment_processor: "Square",
//       ppd_id: null,
//       reason: null,
//       reference_number: null
//     },
//     pending: false,
//     pending_transaction_id: null,
//     transaction_id: "48n1AydoP7hNr5407EDMhnXMK0xoB1Fko3ENv",
//     transaction_type: "place",
//     unofficial_currency_code: null
//   },
//   {
//     account_id: "bOwYxeA3rvTa1b7Q8YzqfRANOQ6MVqtqznxKV",
//     account_owner: null,
//     amount: 24.57,
//     category: ["Shops", "Department Stores"],
//     category_id: "19018000",
//     date: "2019-06-17",
//     iso_currency_code: "USD",
//     location: {
//       address: null,
//       city: null,
//       country: null,
//       lat: null,
//       lon: null,
//       postal_code: null,
//       region: null,
//       store_number: null
//     },
//     name: "Walmart",
//     payment_meta: {
//       by_order_of: null,
//       payee: null,
//       payer: null,
//       payment_method: null,
//       payment_processor: null,
//       ppd_id: null,
//       reason: null,
//       reference_number: null
//     },
//     pending: false,
//     pending_transaction_id: null,
//     transaction_id: "ryrLne9o5Khx3bg9oyL5Sw8qr46pzDSBLXAEo",
//     transaction_type: "place",
//     unofficial_currency_code: null
//   },
//   {
//     account_id: "bOwYxeA3rvTa1b7Q8YzqfRANOQ6MVqtqznxKV",
//     account_owner: null,
//     amount: 3.73,
//     category: ["Food and Drink", "Restaurants", "Coffee Shop"],
//     category_id: "13005043",
//     date: "2019-06-13",
//     iso_currency_code: "USD",
//     location: {
//       address: null,
//       city: null,
//       country: null,
//       lat: null,
//       lon: null,
//       postal_code: null,
//       region: null,
//       store_number: null
//     },
//     name: "Starbucks",
//     payment_meta: {
//       by_order_of: null,
//       payee: null,
//       payer: null,
//       payment_method: null,
//       payment_processor: null,
//       ppd_id: null,
//       reason: null,
//       reference_number: null
//     },
//     pending: false,
//     pending_transaction_id: null,
//     transaction_id: "Jq1gQV8e7Ahdg1wboPJXUm5q8E3609Ib4yQo9",
//     transaction_type: "place",
//     unofficial_currency_code: null
//   },
//   {
//     account_id: "bOwYxeA3rvTa1b7Q8YzqfRANOQ6MVqtqznxKV",
//     account_owner: null,
//     amount: 5.41,
//     category: ["Food and Drink", "Restaurants", "Coffee Shop"],
//     category_id: "13005043",
//     date: "2019-06-13",
//     iso_currency_code: "USD",
//     location: {
//       address: null,
//       city: null,
//       country: null,
//       lat: null,
//       lon: null,
//       postal_code: null,
//       region: null,
//       store_number: null
//     },
//     name: "Starbucks",
//     payment_meta: {
//       by_order_of: null,
//       payee: null,
//       payer: null,
//       payment_method: null,
//       payment_processor: null,
//       ppd_id: null,
//       reason: null,
//       reference_number: null
//     },
//     pending: false,
//     pending_transaction_id: null,
//     transaction_id: "xjr3Le6Y5BsNgeXajp3KhBmzKRDJ0vUMbdjrL",
//     transaction_type: "place",
//     unofficial_currency_code: null
//   },
//   {
//     account_id: "bOwYxeA3rvTa1b7Q8YzqfRANOQ6MVqtqznxKV",
//     account_owner: null,
//     amount: 20.52,
//     category: ["Shops", "Food and Beverage Store"],
//     category_id: "19025000",
//     date: "2019-06-11",
//     iso_currency_code: "USD",
//     location: {
//       address: null,
//       city: null,
//       country: null,
//       lat: null,
//       lon: null,
//       postal_code: null,
//       region: null,
//       store_number: null
//     },
//     name: "DOTDOTBANG STORE Frisco TX 06/10",
//     payment_meta: {
//       by_order_of: null,
//       payee: null,
//       payer: null,
//       payment_method: null,
//       payment_processor: "Square",
//       ppd_id: null,
//       reason: null,
//       reference_number: null
//     },
//     pending: false,
//     pending_transaction_id: null,
//     transaction_id: "8mx3rvD9g7t6RdepNOVEtPbpOMdJmDCyEDKQy",
//     transaction_type: "place",
//     unofficial_currency_code: null
//   }
// ];
// populateTreeWithValues(transactions, categories);
// categories.forEach(element => {
//   updateSums(element);
// });
