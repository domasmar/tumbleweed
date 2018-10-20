export const drivers = [{
  userId: 'bill',
  name: 'Bill Gates',
  number: 'MCS-111',
  picture: 'https://api.adorable.io/avatars/250/user100'
} , {
  userId: 'steve',
  name: 'Steve Jobs',
  number: 'OOO-000',
  picture: 'https://api.adorable.io/avatars/250/user101'
}, {
  userId: 'wozniak',
  name: 'Steve Wozniak',
  number: 'ABC-123',
  picture: 'https://api.adorable.io/avatars/250/user102'
}];


export const mappedDrivers = drivers.reduce((acc, d) => {
  return {
    ...acc,
   [d.userId]: d
  }
}, {});

export default drivers;