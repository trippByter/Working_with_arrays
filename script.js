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


//==============================================//
//=============DISPLAY MOVEMENTS================//
//==============================================//
// BUENA PR??CTICA TRABAJAR LAS VARIABLES GLOBALES,
// PASADAS COMO DATOS DE UNA FUNCION Y NO 
// DE MANERA DIRECTA
// displayMovements -> Devuelve un DOM Element
const displayMovements = function(movements){
  // .innerHTML no solo devuelve texto sino que
  // devuelve todo el elemento HTML. En este
  // caso, lo devuelve en blanco
  containerMovements.innerHTML = "";

  movements.forEach(function(mov, i){
    // Saber si es un deposito o retiro
    // movements.iteration > 0 ? "deposit" : "withdrawal"
    const type = mov > 0 ? "deposit" : "withdrawal";
    
    // Con template literal se crean
    // plantillas HTML y luego
    // la insertamos con
    // DOM_Element.insertAdjacentHTML('ubicacion', HTML_String)
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__value">${mov}???</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};
//==============================================//
//===========END DISPLAY MOVEMENTS==============//
//==============================================//


//==============================================//
//==============DISPLAY BALANCE=================//
//==============================================//
// Actualizaci??n de balance de "account1".
// We pass the complete account the function.
//  After that,we take the movements.
const calcDisplayBalance = function(acc){
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}???`;
};
//==============================================//
//============END DISPLAY BALANCE===============//
//==============================================//


//==============================================//
//=======UPDATE SUMMARIES IN THE ENDPAGE========//
//==============================================//
const calcDisplaySummary = function(acc){
  // IN
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}???`;  // A??adimos al html

  // OUT
  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}???`;

  // INTERESED - Hipoteticamente el banco paga por cada deposito
  // Una regla indica que se paga inter??s, solo si 
  // ese inter??s es mayor a uno
  const interesed = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100) // 1.2%
    .filter((int, i ,arr) => {
      // console.log(arr); // vemos en el array que hay uno menor a uno
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interesed}???`;
};
//==============================================//
//=====END UPDATE SUMMARIES IN THE ENDPAGE======//
//==============================================//


//==============================================//
//=============CREATE USER NAMES================//
//==============================================//
const createUserNames =  (accs) => {
  accs.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase() 
      .split(" ") 
      .map(name => name[0]) 
      .join(""); 
  });
}; 
createUserNames(accounts);
//==============================================//
//===========END CREATE USER NAMES==============//
//==============================================//


//==============================================//
//=================UPDATE UI====================//
//==============================================//
const updateUI = function(acc){
  // Display movements
  displayMovements(acc.movements);
    
  // Display movement's balance
  calcDisplayBalance(acc);

  // Display movement's summary
  calcDisplaySummary(acc);
}
//==============================================//
//==============END UPDATE UI===================//
//==============================================//


//==============================================//
//=================LOGIN FORM===================//
//==============================================//
// Define this let, outside function to
// later use from other functions
// with current account.
let currentAccount;

btnLogin.addEventListener("click", function(e){
  // Prevent form from submitting
  // and we can see the console.log
  e.preventDefault();
  // console.log("Imaynallan login");
  // Here we check if name is username is correct
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  // console.log(currentAccount);
  // Here we check if name is username is correct
  if(currentAccount?.pin === Number(inputLoginPin.value)){
    // Display UI and change the "Log in to get started"
    // for welcome message with user first name.
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(" ")[0]}`;
    // Show the "user home" -> containerApp
    containerApp.style.opacity = 100;
    
    // Clear inputs fields after login
    inputLoginUsername.value = inputLoginPin.value = "";
    // Quit cursor in inputs
    inputLoginPin.blur();

    // Update UI with user data after login
    updateUI(currentAccount);

    
  };
});
//==============================================//
//===============END LOGIN FORM=================//
//==============================================//


//==============================================//
//=============TRANSFERS FORM===================//
//==============================================//
btnTransfer.addEventListener("click", function(e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  // Find the receiver account by user name
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  // console.log(amount, receiverAcc);
  inputTransferAmount.value = inputTransferTo.value = "";
  // Quit cursor in inputs
  inputTransferAmount.blur();

  if(
    amount > 0 && 
    receiverAcc && 
    currentAccount.balance >= amount && 
    receiverAcc?.username !== currentAccount.username
  ){
    // console.log("Transfer valid")
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    // Update UI with user data after transfer
    updateUI(currentAccount);
  };
});
//==============================================//
//=============END TRANSFERS FORM===============//
//==============================================//


/*
+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*
    T R A B A J A N D O
      C O N    M A P 
+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*
Cuando se anidan funciones, es mejor 
separarlas por parentesis
const username = user.toLowerCase().split(" ").map(name => name[0]).join("");

const user = "Steven Thomas Williams"; 
// Modificamos array original "accounts".
// Usamos m??todos mutables - forEach y 
// a??adimos la key "username"
const createUserNames =  (accs) => {
  // Por eso usamos el m??todo forEach.
  accs.forEach((acc) => {
    // Agregamos la key "username". El
    // value es las iniciales del nombre
    acc.username = acc.owner
      .toLowerCase() // Str minu: "steven thomas williams"
      .split(" ") // Arr: ['steven', 'thomas', 'williams']
      .map(name => name[0]) // Arr: ['s', 't', 'w']
      .join(""); // Str: "stw"
  });
  // Cuando se modifica el array original,
  // no se retorna nada.
}; 
createUserNames(accounts);
console.log(accounts);
*/


/*
+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*
    C H A L L E N G U E  N??1
+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*

const checkDogs = function(dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);
  
  const dogs = dogsJuliaCorrected.concat(dogsKate);
  console.log(dogs);
  
  dogs.forEach(function(dog, i){
    if(dog >= 3){
      console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy`);
    }
  });
};
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
*/

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/*
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
*/

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

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
arr.splice(1, 2); // ??["a", "d"]
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
+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*
NO FUNCIONAN EL "BREAK", "CONTINUE"

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
*/


/*
+*+*+*+*+*+*+*+*+*+*+*+*+*
      I N M U T A B L E 
            M A P
+*+*+*+*+*+*+*+*+*+*+*+*+*
Con MAP creamos un array con una sola funci??n
Con FOR, TENEMOS que, antes, crear el array
Son diferentes filosof??as o paradigmas
MAP es m??s de programaci??n funcional

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;

// const movementsUSD = movements.map(function(mov){
  //   return mov * eurToUsd;
  // });
  const movementsUSD = movements.map(mov => mov * eurToUsd);
  console.log(movements);
  console.log(movementsUSD);
  
  // I D E M
  const movementsUSDfor = [];
  for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
  console.log(movementsUSDfor);
  
  const movementsDescriptions = movements.map(
    (mov, i) => 
    // SIN RETURN. SIN " ; "
    `Movement ${i + 1}: You ${mov > 0 ? "deposited" : "withdrew"} ${Math.abs(mov)}`
    );
    // Devuelve array de strings
    console.log(movementsDescriptions);
*/

/*
+*+*+*+*+*+*+*+*+*+*+*+*+*
      I N M U T A B L E 
        F I L T E R
+*+*+*+*+*+*+*+*+*+*+*+*+*

// Filter out the negative values
// return a boolean value
// return iteration if value is greater than zero
const deposits = movements.filter((mov) => mov > 0);
console.log(movements);
console.log(deposits);

// for method
const depositsFor = []
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);


const withdrawals = movements.filter((mov) => mov < 0);
// console.log(movements);
console.log(withdrawals);
*/


// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/*
+*+*+*+*+*+*+*+*+*+*+*+*+*
      I N M U T A B L E
        R E D U C E
+*+*+*+*+*+*+*+*+*+*+*+*+*
Return a value, not array
".reduce(function(acc, i, arr))"
acc = accumulator -> like a SNOWBALL
cur = current ELEMENT
i   = current INDEX
arr = array
...}, 0 = Zero -> accumulator's initial value
console.log("+++ R3DUCE +++");
console.log(movements);
const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance); // Number: 3840

console.log("+++ F0R +++");
let balance2 = 0;
for(const mov of movements) balance2 += mov;
console.log(balance2);

// Maximo valor del movements - 3000
// El acc hace un seguimiento al valor maximo actual
// y lo compara con mov
const max = movements.reduce((acc, mov) => (acc > mov) ? acc : mov, movements[0]); 
console.log(max);
*/

/*
+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*
    C H A L L E N G U E  N??2
+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*
TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

// Pasamos array de edades de perros y las 
// transformamos a edades humanas
const calcAverageHumanAge = function(ages){
  const humanAges = ages.map(age => age <= 2 ? 2* age : 16 + age * 4);
  // Solo mayores de edad
  const adults = humanAges.filter(age => age >= 18);
  console.log(humanAges);
  console.log(adults);
  // Calulamos la media(average)
  const average = adults.reduce((acc, age, i, arr) => acc + age  / arr.length, 0); 
  return average;
};
const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);
*/

/*
+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*
      C H A I N I N G 
       M E T H O D S
+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*
NO ABUSAR DEL CHAINING METHOD
EVITAR USARLOS CON M??TODOS MUTABLES
S??lo podemos encadenar m??todos 
si el anterior devuelve un array


// PIPELINE
// Obtenemos depositos en dolares usando "filter",
// "map", "reduce" en una sola variable
const eurToUsd = 1.1;
console.log(movements);
const totalDepositUSD = movements
// Debugging method only
// .filter(mov => mov > 0) // Resultado negativo
// .map((mov, i, arr) => { 
//   console.log(arr); // Visualizamos array en cada iteraci??n
//   return mov * eurToUsd;
// })
// .reduce((acc, mov) => acc + mov, 0); 
.filter(mov => mov > 0) // depositos - []
.map(mov => mov * eurToUsd) // conv. d??lares - []
.reduce((acc, mov) => acc + mov, 0); // sumar todo - Number
console.log(totalDepositUSD);
*/


/*
+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*
    C H A L L E N G U E  N??3
+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*
Reescribir "calcAverageHumanAge" del challengue N??2,
en una arrow function usando chaining method
TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]
const calcAverageHumanAge = ages =>
ages  
.map(age => age <= 2 ? 2* age : 16 + age * 4)
.filter(age => age >= 18)
.reduce((acc, age, i, arr) => acc + age  / arr.length, 0);

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);
*/

/*
+*+*+*+*+*+*+*+*+*+*+*+*+*
          F I N D
+*+*+*+*+*+*+*+*+*+*+*+*+*
Return the first element of an array 
thats sastisfies a condition.
Accept a condition, and callback function,
which will then be called as the method loops
over the array

const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal); // Num -400

const account = accounts.find(acc => acc.owner === "Jessica Davis");
console.log(accounts);
console.log(account); // Object {owner:"Jessica Davis"...}
*/
