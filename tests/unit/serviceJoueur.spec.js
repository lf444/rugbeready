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
})
