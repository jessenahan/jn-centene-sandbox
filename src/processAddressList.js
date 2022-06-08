import geocoder from './mockGeocoder';

const processAddressList = async (addressList) => {
  const output = [];

  for (let i = 0; i < addressList.length; i++) {
	const coordinates = await geocoder(addressList[i]);
	output.push({ ...addressList[i], ...coordinates });
  }

  return output;
};

export default processAddressList;
