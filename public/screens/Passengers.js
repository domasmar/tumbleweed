export const passengers = [{
  userId: 'domas',
  name: 'Domas',
  picture: 'https://api.adorable.io/avatars/250/user200'
} , {
  userId: 'mindaugas',
  name: 'Mindaugas',
  picture: 'https://api.adorable.io/avatars/250/user201'
}, {
  userId: 'edgaras',
  name: 'Edgaras',
  picture: 'https://api.adorable.io/avatars/250/user202'
}];


export const mappedPassengers = passengers.reduce((acc, p) => {
  return {
    ...acc,
    [p.userId]: p
  }
}, {});

export default passengers;
