// users.test.js
import axios from 'axios';
import Users from '@/services/servicesEquipe.js';

jest.mock('axios');

describe('Users', () => {
it('should fetch teams', async() => {
  const users = [{idEquipe:204,nom:'Elite Crabos',image:'https://static.lpnt.fr/images/2018/12/13/17747713lpw-17748036-article-rugby-ballon-jpg_5803326_1250x625.jpg'}];
  const resp = {data: users};
  axios.get.mockResolvedValue(resp);

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))
  //Users.addEquipe(,)
  await Users.getEquipes()
  expect(axios.get).toHaveBeenLastCalledWith("http://api.rugbeready.fr:3000/equipes")
  //await expect(Users.getEquipes()).resolves.toEqual(axios.get.mockResolvedValue(resp))
  return Users.getEquipes().then(data => expect(data).toEqual(users));
});

it('should delete teams', async() => {
    const users = [{idEquipe:1, nom: 'A',image:'soldat'},
    {idEquipe:204,nom:'Elite Crabos',image:'https://static.lpnt.fr/images/2018/12/13/17747713lpw-17748036-article-rugby-ballon-jpg_5803326_1250x625.jpg'}];
    const resp = {data: users};
    //axios.get.mockResolvedValue(resp);
    axios.get.mockResolvedValue(resp);
    // or you could use the following depending on your use case:
    // axios.get.mockImplementation(() => Promise.resolve(resp))
    //Users.getEquipes().then(data => expect(data).toEqual(users))
    await Users.deleteEquipe(1)
    expect(axios.delete).toHaveBeenLastCalledWith("http://api.rugbeready.fr:3000/equipes/1")
    return Users.deleteEquipe(1).then(data => expect(data).toEqual("users"));
  });
  it('should add team', async() => {

  })

})