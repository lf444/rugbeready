// users.test.js
import axios from 'axios';
import Users from '@/services/servicesEquipe.js';

jest.mock('axios');

test('should fetch teams', async() => {
  //const users = [{nom: 'A',url: 'img'}];
  //const resp = {data: users};
  //axios.get.mockResolvedValue(resp);

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))
  //Users.addEquipe(,)
  await Users.getEquipes()
  expect(axios.get).toHaveBeenCalledTimes(1)
  return Users.getEquipes().then(data => expect(data).toEqual("users"));
});

/*test('should fetch up teams', async() => {
    const users = [{idEquipe:1, nom: 'A'}];
    const resp = {data: users};
    //axios.get.mockResolvedValue(resp);
    axios.get.mockResolvedValue(resp);
    axios.delete.mockResolvedValue(resp);
    // or you could use the following depending on your use case:
    // axios.get.mockImplementation(() => Promise.resolve(resp))
    //Users.getEquipes().then(data => expect(data).toEqual(users))
    await Users.deleteEquipe(1)
    expect(axios.delete).toHaveBeenCalledTimes(1)
    return Users.getEquipes().then(data => expect(data).toEqual("users"));
  });*/