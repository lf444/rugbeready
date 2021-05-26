// users.test.js
import axios from 'axios';
import Users from '@/services/servicesCalendrier.js';

jest.mock('axios');

test('should fetch events', async() => {
  const users = [{idEvenement:1,nom:"Match",description:"Match contre les Elites monkaS",dateTimeDebut:"2021-05-20T15:30:00.000Z",dateTimeFin:"2021-05-21T17:00:00.000Z"},
  {idEvenement:12,nom:"Test",description:"tTest",dateTimeDebut:"2021-05-10T08:48:00.000Z",dateTimeFin:"2021-05-12T08:48:00.000Z"}]
  const resp = {data: users};
  axios.get.mockResolvedValue(resp);

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))
  //Users.addEquipe(,)
  await Users.getEvenements()
  expect(axios.get).toHaveBeenCalledTimes(1)
  expect(axios.get).toHaveBeenLastCalledWith('http://api.rugbeready.fr:3000/evenements');
  return Users.getEvenements().then(data => expect(data).toEqual(users));
});

test('should add event', async() => {

});