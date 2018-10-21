import Drivers, {mappedDrivers} from './Drivers';
import Passengers, {mappedPassengers} from './Passengers';

const Users = [...Drivers, ...Passengers];

export default Users;
export const MappedUsers= {...mappedDrivers, ...mappedPassengers};
