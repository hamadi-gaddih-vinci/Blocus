var express = require('express');
var router = express.Router();

const MENU = [
  {
    id: 1,
    title: 'Dragon Ball Z: Fusion',
    duration: 120,
    budget: 100000,
    link: 'https://ibrahim-ayachi-vinci.github.io/covidClicker/',
  },
  {
    id: 2,
    title: 'Dragon Ball Z: Cooler',
    duration: 120,
    budget: 100000,
    link: 'https://ibrahim-ayachi-vinci.github.io/covidClicker/',
  },
  {
    id: 3,
    title: 'Dragon Ball Z: Tapion',
    duration: 120,
    budget: 100000,
    link: 'https://ibrahim-ayachi-vinci.github.io/covidClicker/',
  },
];

// Read all the films from the menu
router.get('/', (req, res, next) => {
  console.log('GET /films');
  res.json(MENU);
});

module.exports = router;
