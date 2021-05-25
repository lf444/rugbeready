// users.test.js
import axios from 'axios';
import Users from '@/services/servicesPerf.js';

jest.mock('axios');

test('should fetch one perf', async() => {
  const users = [{"idPerf":41,"datePerf":"2021-05-24T00:00:00.000Z","squat":160,"dcouche":120,"tirage":115,"detenteVerticale":20,"tempsSprint":"09:45:00","idJoueur":47}];
  const resp = {data: users};
  axios.get.mockResolvedValue(resp);

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  await Users.getPerfsJoueur(47)
  expect(axios.get).toHaveBeenLastCalledWith("http://api.rugbeready.fr:3000/perfomances/47/one")
  return Users.getPerfsJoueur(47).then(data => expect(data).toEqual(users));
});
test('should fetch all perfs', async() => {
  const users = [{"idPerf":39,"datePerf":"2021-05-18T00:00:00.000Z","squat":150,"dcouche":110,"tirage":105,"detenteVerticale":20,"tempsSprint":"09:45:00","idJoueur":47},
  {"idPerf":41,"datePerf":"2021-05-24T00:00:00.000Z","squat":160,"dcouche":120,"tirage":115,"detenteVerticale":20,"tempsSprint":"09:45:00","idJoueur":47}]
  const resp = {data: users};
  axios.get.mockResolvedValue(resp);

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  await Users.getAllPerfsJoueur(47)
  expect(axios.get).toHaveBeenLastCalledWith("http://api.rugbeready.fr:3000/perfomances/47/all")
  return Users.getAllPerfsJoueur(47).then(data => expect(data).toEqual(users));  
});
test('should update perf', async() => {
    
  });