import seedrandom from 'seedrandom';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let running = 0;

const mockGeocoder = async (address) => {
  const { street, city, state, zip } = address;
  if (!street || !city || !state || !zip) {
	throw new Error('Street, City, State, and ZIP all required');
  }
  if (running > 20) {
	throw new Error(
	  'Quota exceeded; only 20 geocoding operations can be running',
	);
  }
  running++;
  await sleep(100); // Don't modify this line; that would be cheating ;)
  const rng = seedrandom(`${street}${city}${state}${zip}`.toLowerCase());
  running--;
  return { lat: 39.7589 + 0.1 * rng(), long: -84.1916 + 0.1 * rng() };
};

export default mockGeocoder;
