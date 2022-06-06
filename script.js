'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/*
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
/*

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////



/*
let arr = ["a", "b", "c", "d", "e"];
+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*
      I N M U T A B L E 
        ".S L I C E"
+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*
R E T O R N A   A R R A Y
N O   M O D I F I C A   A R R A Y   O R I G I N A L
console.log(arr.slice(2)); // ["c", "d", "e"]
// El indice cuatro del array, no se toma en cuenta
console.log(arr.slice(2, 4)); // ["c", "d"]
// Los dos ultimos elementos del array
console.log(arr.slice(-2)); // ["d", "e"]
// El ultimo elemento del array
console.log(arr.slice(-1)); // ["e"]
// El indice uno, menos los dos ultimos del array
console.log(arr.slice(1, -2));
// Copiamos todo 
console.log(arr.slice()); // ["a", "b", "c", "d", "e"]
console.log([...arr]); // ["a", "b", "c", "d", "e"]
*/

/*
+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*
         M U T A B L E 
        ".S P L I C E"
+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*
R E T O R N A   A R R A Y
M O D I F I C A  A R R A Y   O R I G I N A L
// console.log(arr.splice(2)); // ["c", "d", "e"]
// console.log(arr); // ["a", "b"] original modificado
arr.splice(-1); // ["a", "b", "c", "d"]
console.log(arr);
arr.splice(1, 2); //  ["a", "d"]
console.log(arr);
*/

/*
+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*
          M U T A B L E 
        ".R E V E R S E"
+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*
R E T O R N A   A R R A Y
M O D I F I C A   A R R A Y   O R I G I N A L
arr = ["a", "b", "c", "d", "e"];
const arr2 = ["j", "i", "h", "g", "f"];
console.log(arr2.reverse()); // ['f', 'g', 'h', 'i', 'j']
console.log(arr2); // ['f', 'g', 'h', 'i', 'j']
*/

/*
+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*
      I N M U T A B L E 
        ".C O N C A T"
+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*
R E T O R N A   A R R A Y
N O   M O D I F I C A   A R R A Y   O R I G I N A L
const letters = arr.concat(arr2);
console.log(letters); // ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
console.log([...arr, ...arr2]); // ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
*/

/*
+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*
          J  O  I  N 
+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*
R E T O R N A   S T R I N G
N O   M O D I F I C A   A R R A Y   O R I G I N A L
console.log(letters.join(" - "));
*/


/*
+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*
             A T 
+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*
D E V U E L V E   U N   P R I M I T I V O.
B U S Q U E D A   D E   E L E M E N T O S 
E N   U N   A R R A Y
const arr = [23, 11, 64];
console.log(arr[0]); // 23
console.log(arr.at(0)); // 23

// Ultimo elemento del array
// metodod traicional
console.log(arr[arr.length - 1]); // 64
console.log(arr.slice(-1)[0]); // 64
console.log(arr.at(-1)); // 64
console.log(arr.at(-2)); // 11
console.log("Imaynallan".at(0)); // I
console.log("Imaynallan".at(5)); // a
console.log("Imaynallan".at(-1)); // n
*/


/*
+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*
      I N M U T A B L E 
        ".F O R E A C H"

NO FUNCIONAN EL "BREAK", "CONTINUE"
+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

console.log("*** METODO FOR-OF ***");
for(const [i, movement] of movements.entries()){
  if(movement > 0){
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
};

console.log("*** METODO FOREACH ***");
movements.forEach(function (movement, index, array) {
  if(movement > 0){
    console.log(`Movement ${index + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`);
  }
});
*/

/*
+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*
            F O R E A C H 
    C O N  "M A P S"  Y  "S E T S"
+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*
*/
// MAP
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function(value, key, map){
  console.log(`${key}: ${value}`); // OBJ: {'USD', 'GBP', 'EUR'}
});

// SET
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);

currenciesUnique.forEach(function(value, key, map){
  console.log(`${key}: ${value}`); // Iteraciones de string
});