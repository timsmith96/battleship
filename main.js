"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkbattleship"] = self["webpackChunkbattleship"] || []).push([["main"],{

/***/ "./src/gameboardFactory.js":
/*!*********************************!*\
  !*** ./src/gameboardFactory.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"gameboardFactory\": () => (/* binding */ gameboardFactory)\n/* harmony export */ });\n/* harmony import */ var _shipFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shipFactory */ \"./src/shipFactory.js\");\n\r\n\r\nconst gameboardFactory = () => {\r\n  const gameboard = [\r\n    ['', '', '', '', '', '', '', '', '', ''],\r\n    ['', '', '', '', '', '', '', '', '', ''],\r\n    ['', '', '', '', '', '', '', '', '', ''],\r\n    ['', '', '', '', '', '', '', '', '', ''],\r\n    ['', '', '', '', '', '', '', '', '', ''],\r\n    ['', '', '', '', '', '', '', '', '', ''],\r\n    ['', '', '', '', '', '', '', '', '', ''],\r\n    ['', '', '', '', '', '', '', '', '', ''],\r\n    ['', '', '', '', '', '', '', '', '', ''],\r\n    ['', '', '', '', '', '', '', '', '', ''],\r\n  ];\r\n\r\n  let shipCounter = 0;\r\n\r\n  const ships = [];\r\n\r\n  const missedAttacks = [];\r\n\r\n  const shipLocations = {};\r\n\r\n  const allShipsSunk = () => {\r\n    return ships.every((ship) => {\r\n      return ship.isSunk();\r\n    });\r\n  };\r\n\r\n  const isSquareEmpty = (coordinatesArray) => {\r\n    let [x, y] = coordinatesArray;\r\n    return gameboard[y][x] === '' ? true : false;\r\n  };\r\n\r\n  const isNotOverlap = (shipLength, coordinatesArray) => {\r\n    let [x, y] = coordinatesArray;\r\n    for (let i = 0; i < shipLength; i++) {\r\n      if (gameboard[y][x] !== '') {\r\n        return false;\r\n      }\r\n      x++;\r\n    }\r\n    return true;\r\n  };\r\n\r\n  const isValidLength = (shipLength, coordinatesArray) => {\r\n    let [x, y] = coordinatesArray;\r\n    return shipLength + x <= 10 && y <= 10 ? true : false;\r\n  };\r\n\r\n  const isValidPlacement = (shipLength, coordinatesArray) => {\r\n    return (\r\n      isSquareEmpty(coordinatesArray) &&\r\n      isValidLength(shipLength, coordinatesArray) &&\r\n      isNotOverlap(shipLength, coordinatesArray)\r\n    );\r\n  };\r\n\r\n  const saveLocation = (shipId, shipLength, coordinatesArray) => {\r\n    const [x, y] = coordinatesArray;\r\n    shipLocations[shipId] = { xStart: x, xEnd: x + (shipLength - 1) };\r\n  };\r\n\r\n  const placeShip = (shipLength, coordinatesArray) => {\r\n    let [x, y] = coordinatesArray;\r\n    const ship = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_0__.shipFactory)(shipLength, shipCounter);\r\n    shipCounter++;\r\n    if (isValidPlacement(shipLength, coordinatesArray)) {\r\n      for (let i = 0; i < shipLength; i++) {\r\n        gameboard[y][x] = ship;\r\n        x++;\r\n      }\r\n      saveLocation(ship.id, shipLength, coordinatesArray);\r\n      ships.push(ship);\r\n    }\r\n  };\r\n\r\n  const recieveAttack = (coordinatesArray) => {\r\n    const [x, y] = coordinatesArray;\r\n    let target = gameboard[y][x];\r\n    const id = target.id;\r\n    if (typeof target === 'object') {\r\n      target.hit(x - shipLocations[id].xStart);\r\n    } else {\r\n      missedAttacks.push([x, y]);\r\n    }\r\n    gameboard[y][x] = 'hit';\r\n  };\r\n\r\n  return {\r\n    gameboard,\r\n    placeShip,\r\n    recieveAttack,\r\n    missedAttacks,\r\n    allShipsSunk,\r\n  };\r\n};\r\n\r\n\r\n\n\n//# sourceURL=webpack://battleship/./src/gameboardFactory.js?");

/***/ }),

/***/ "./src/gameloop.js":
/*!*************************!*\
  !*** ./src/gameloop.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _gameboardFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboardFactory */ \"./src/gameboardFactory.js\");\n/* harmony import */ var _players__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./players */ \"./src/players.js\");\n\r\n\r\n\r\nconst human = (0,_players__WEBPACK_IMPORTED_MODULE_1__.humanPlayer)();\r\nconst computer = (0,_players__WEBPACK_IMPORTED_MODULE_1__.cpuPlayer)();\r\n\r\nconst humanGameboard = (0,_gameboardFactory__WEBPACK_IMPORTED_MODULE_0__.gameboardFactory)();\r\nconst cpuGameboard = (0,_gameboardFactory__WEBPACK_IMPORTED_MODULE_0__.gameboardFactory)();\r\n\r\nconsole.log('hello');\r\n\n\n//# sourceURL=webpack://battleship/./src/gameloop.js?");

/***/ }),

/***/ "./src/players.js":
/*!************************!*\
  !*** ./src/players.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"cpuPlayer\": () => (/* binding */ cpuPlayer),\n/* harmony export */   \"humanPlayer\": () => (/* binding */ humanPlayer)\n/* harmony export */ });\nconst humanPlayer = () => {\r\n  const makeMove = (enemyGameboard, coordinatesArray) => {\r\n    enemyGameboard.recieveAttack(coordinatesArray);\r\n  };\r\n\r\n  return { makeMove };\r\n};\r\n\r\nconst cpuPlayer = () => {\r\n  const makeMove = (enemyGameboard) => {\r\n    // const x = Math.floor(Math.random() * 10);\r\n    // const y = Math.floor(Math.random() * 10);\r\n    const x = 7;\r\n    const y = 0;\r\n    enemyGameboard.recieveAttack([x, y]);\r\n  };\r\n  return { makeMove };\r\n};\r\n\r\n\r\n\n\n//# sourceURL=webpack://battleship/./src/players.js?");

/***/ }),

/***/ "./src/shipFactory.js":
/*!****************************!*\
  !*** ./src/shipFactory.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"shipFactory\": () => (/* binding */ shipFactory)\n/* harmony export */ });\nconst shipFactory = (length, id) => {\r\n  const hitArray = [];\r\n  const hit = (num) => {\r\n    hitArray.push(num);\r\n  };\r\n  const isSunk = () => hitArray.length === length;\r\n  return { length, hitArray, hit, isSunk, id };\r\n};\r\n\r\n\r\n\n\n//# sourceURL=webpack://battleship/./src/shipFactory.js?");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/gameloop.js"));
/******/ }
]);