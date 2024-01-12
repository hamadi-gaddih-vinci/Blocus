var express = require('express');
var router = express.Router();

const MENU = [
  {
    id: 1,
    title: 'Dragon Ball Z: Fusion',
    duration: 60,
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
    duration: 180,
    budget: 100000,
    link: 'https://ibrahim-ayachi-vinci.github.io/covidClicker/',
  },
  {
    id: 4,
    title: 'tutu',
    duration: 180,
    budget: 100000,
    link: 'https://ibrahim-ayachi-vinci.github.io/covidClicker/',
  },
];

// Read all the films from the menu
router.get('/', (req, res, next) => {

  let orderedMenu;

  const filtredByMinimumFilmDuration = req?.query?.['minimum-duration'] 
  ? Number(req.query['minimum-duration']) : undefined;

  const filtredByCharDebut = req?.query?.charDebut ? req.query.charDebut : undefined;

  const orderByTitle = req?.query?.order?.includes('title') ? req.query.order : undefined;


  //if(!filtredByCharDebut && !filtredByMinimumFilmDuration && !orderByTitle) return res.sendStatus(400);

  if(filtredByMinimumFilmDuration){
    if(typeof filtredByMinimumFilmDuration !== 'number' || filtredByMinimumFilmDuration <= 0)
      return res.sendStatus(400);

  orderedMenu = [...MENU].filter(
    (film) => film.duration >= filtredByMinimumFilmDuration
  );
  };

  if (filtredByCharDebut){
    let nbLettre = req.query.charDebut.length;
    orderedMenu = [...MENU].filter(
      (film) => film.title.substring(0,nbLettre) === req.query.charDebut
    );
  };
  if (orderByTitle)
    orderedMenu = [...MENU].sort((a, b) => a.title.localeCompare(b.title));
  if (orderByTitle === '-title') orderedMenu = orderedMenu.reverse();


  return res.json(orderedMenu ?? MENU);
});

router.get('/:id', (req, res) => {
  console.log(`GET /pizzas/${req.params.id}`);
  
  const indexOfFilmFound = MENU.findIndex((film) => film.id == req.params.id);

  if (indexOfFilmFound < 0) return res.sendStatus(404);

  res.json(MENU[indexOfFilmFound]);
});

// Create a film to be added to the menu.
router.post('/', (req, res) => {
  const id = MENU.length + 1;
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
  if(duration < 0)
    duration = undefined;
  const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
  if(budget < 0)
    duration = undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  console.log('POST /films');

  if (!title || !duration || !budget || !link) return res.sendStatus(400); // error code '400 Bad request'

  const existingfilm = MENU.find(film => film.title.toLowerCase() == title.toLowerCase());
  if(existingfilm) return res.sendStatus(409);

  const newFilm = {
    id: id,
    title: title,
    duration: duration,
    budget: budget,
    link: link,
  };

  MENU.push(newFilm);

  res.json(newFilm);
});


  router.delete('/:id', (req,res) => {
    console.log(`DELETE /films/${req.params.id}`);
    const idDelete = MENU.findIndex(film => film.id == req.params.id);

    if(idDelete < 0) return res.sendStatus(400);

    const filmsRemovedFromMenu = MENU.splice(idDelete, 1);
    const filmRemoved = filmsRemovedFromMenu[0];

    res.json(filmRemoved);
  });

  router.patch('/:id', (req, res) => {
    console.log(`PATCH /films/${req.params.id}`);
    
    const indexOfFilmFound = MENU.findIndex(film => film.id == req.params.id);

    if(indexOfFilmFound < 0) return res.sendStatus(400);

    const title = req?.body?.title;
    const duration = req?.body?.duration;
    const budget = req?.body?.budget;
    const link = req?.body?.link;

    if((!title && !duration && !budget && !link) || title?.length === 0 || duration?.length === 0 || budget?.length === 0 || link?.length === 0) return res.sendStatus(400);

    const updatedFilm = {...MENU[indexOfFilmFound], ...req.body};

    MENU[indexOfFilmFound] = updatedFilm;

    res.json(updatedFilm);
  });

  router.put('/:id', (req, res) => {
    console.log(`PUT /films/${req.params.id}`);

    const title = req?.body?.title;
    const link = req?.body?.link;
    const duration = req?.body?.duration;
    const budget = req?.body?.budget;
    
    if (
      !req.body ||
      !title ||
      !title.trim() ||
      !link ||
      !link.trim() ||
      duration === undefined ||
      typeof req?.body?.duration !== 'number' ||
      duration < 0 ||
      budget === undefined ||
      typeof req?.body?.budget !== 'number' ||
      budget < 0
    ) return res.sendStatus(400);

    const id = req.params.id;
    const indexOfFilmFound = film.findIndex((film) => film.id == id);

    if(indexOfFilmFound < 0){
      const newFilm = {id, title, link, duration, budget};
      MENU.push(newFilm);
      return res.json(newFilm);
    }

    const filmAvantChangement = MENU[indexOfFilmFound];
    const objetContenantLesPropriétésAMettreAJour = req.body;

    const updatedFilm = {
      ...filmAvantChangement,
      ...objetContenantLesPropriétésAMettreAJour,
    };

    MENU[indexOfFilmFound] = updatedFilm;
    
    return res.json(updatedFilm);
  });

module.exports = router;
