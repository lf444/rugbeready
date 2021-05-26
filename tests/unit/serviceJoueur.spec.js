// users.test.js
import axios from 'axios';
import Users from '@/services/servicesJoueur.js';

jest.mock('axios');

describe('Users', () => {

it('should fetch joueur from equipes', async() => {
  const users = [{nom:"Antwi",
        prenom:"Daniel",
        poste:"Ailier",
        age:21,
        email:"p@gmail.com",
        telephone:'0606060606',
        idEquipe:1,
        idJoueur:9
      },{nom:"Antwi",
      prenom:"Daniel",
      poste:"Ailier",
      age:21,
      email:"p@gmail.com",
      telephone:'0606060606',
      idEquipe:1,
      idJoueur:99
    }];
  const resp = {data: users};
  axios.get.mockResolvedValue(resp);

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))
  //Users.addEquipe(,)
  await Users.getJoueursFromEquipe(1)
  expect(axios.get).toHaveBeenCalledWith('http://api.rugbeready.fr:3000/equipes/1');
  return Users.getJoueursFromEquipe(1).then(data => expect(data).toEqual(users));
});

it('should add joueur', async() => {

})
it('should add blessure to last joueur', async() => {
  
})
it('should delete joueur', async() => {

})
it('should get id joueur', async() => {
  const users = [{nom:"Antwi",
  prenom:"Daniel",
  poste:"Ailier",
  age:21,
  email:"p@gmail.com",
  telephone:"0000000000",
  idEquipe:12,
  idJoueur:1}];
const resp = {data: users};
axios.get.mockResolvedValue(resp);

// or you could use the following depending on your use case:
// axios.get.mockImplementation(() => Promise.resolve(resp))
//Users.addEquipe(,)
await Users.getIdentiteJoueur(1)
expect(axios.get).toHaveBeenLastCalledWith('http://api.rugbeready.fr:3000/joueurs/1',);
return Users.getIdentiteJoueur(1).then(data => expect(data).toEqual(users));
})

it('should get last joueur', async() => {
  const users = [{nom:"Antwi",
  prenom:"Daniel",
  poste:"Ailier",
  age:21,
  email:"p@gmail.com",
  telephone:"0000000000",
  idEquipe:12,
  idJoueur:1}];
const resp = {data: users};
axios.get.mockResolvedValue(resp);

// or you could use the following depending on your use case:
// axios.get.mockImplementation(() => Promise.resolve(resp))
//Users.addEquipe(,)
await Users.getLastJoueur(1)
expect(axios.get).toHaveBeenLastCalledWith('http://api.rugbeready.fr:3000/equipes/last',);
return Users.getLastJoueur(1).then(data => expect(data).toEqual(users));
})

it('should get one taille/poids joueur', async() => {
  const users = [{"idTaillePoids":95,"dateTaillePoids":"2021-05-25T00:00:00.000Z","poids":87,"taille":178,"idJoueur":47}];
const resp = {data: users};
axios.get.mockResolvedValue(resp);

// or you could use the following depending on your use case:
// axios.get.mockImplementation(() => Promise.resolve(resp))
//Users.addEquipe(,)
await Users.getTaillePoidsJoueur(47)
expect(axios.get).toHaveBeenLastCalledWith('http://api.rugbeready.fr:3000/tp/47/one',);
return Users.getTaillePoidsJoueur(47).then(data => expect(data).toEqual(users));
})

it('should get all taille/poids joueur', async() => {
const users = [{"idTaillePoids":94,"dateTaillePoids":"2021-05-25T00:00:00.000Z","poids":85,"taille":177,"idJoueur":47},
{"idTaillePoids":95,"dateTaillePoids":"2021-05-25T00:00:00.000Z","poids":87,"taille":178,"idJoueur":47}];
const resp = {data: users};
axios.get.mockResolvedValue(resp);

// or you could use the following depending on your use case:
// axios.get.mockImplementation(() => Promise.resolve(resp))
//Users.addEquipe(,)
//console.log(await Users.getAllTaillePoidsJoueur(47));
await Users.getAllTaillePoidsJoueur(47)
expect(axios.get).toHaveBeenLastCalledWith('http://api.rugbeready.fr:3000/tp/47/all');
return Users.getAllTaillePoidsJoueur(47).then(data => expect(data).toEqual(users));
})
it('should update taille/poids joueur', async() => {

})
})
