export const drivers = [{
  userId: 'bill',
  name: 'Bill Gates',
  number: 'MCS-111',
  picture: 'https://pickaface.net/gallery/avatar/zazasales53fe6493782a5.png'
} , {
  userId: 'steve',
  name: 'Steve Jobs',
  number: 'OOO-000',
  picture: 'https://cdn.dribbble.com/users/160522/screenshots/1179084/stevejobs-01.jpg'
}, {
  userId: 'wozniak',
  name: 'Steve Wozniak',
  number: 'ABC-123',
  picture: 'https://avatars.schd.ws/7/ef/5433053/avatar.jpg.320x320px.jpg?ca2'
}];


export const mappedDrivers = drivers.reduce((acc, d) => {
  return {
    ...acc,
   [d.userId]: d
  }
}, {});

export default drivers;
