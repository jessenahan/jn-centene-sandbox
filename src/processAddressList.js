import geocoder from './mockGeocoder';

const city_center_latitide = 39.7589;
const city_center_longitude = -84.1916;

const proximity_to_city_center = (lat2,lon2) => {
	// Return true if distance is within .5 miles
	// -- otherwise return false
	if ((city_center_latitide == lat2) && (city_center_longitude == lon2)) {
		return true;
	} else {
		let radlat1 = Math.PI * city_center_latitide/180;
		let radlat2 = Math.PI * lat2/180;
		let theta = city_center_longitude-lon2;
		let radtheta = Math.PI * theta/180;
		let distance = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (distance > 1) {
			distance = 1;
		}
		distance = Math.acos(distance);
		distance = distance * 180/Math.PI;
		distance = distance * 60 * 1.1515;
		// distance is in miles
		return (distance <= .5) ? true : false;
	}
}

const processAddressList = async (addressList) => {
	// geocoder can handle a maximum of 20 requests at a time.
	// -- The addressList will be processed in groups of 20
	
	let output =[];
    for (let i = 0; i < (addressList.length - 20); i+=20) {
		let sliced = Object.keys(addressList).slice(i, i+20).reduce((result, key) => {
			// sliced keys should start at 0
		  	let newkey = Object.keys(result).length;
		  	result[newkey] = addressList[key];
		  	return result;
		}, {});
				
		let addresses_with_location = await getLocation(sliced);
		output = [...output,...addresses_with_location];
	}
	return output;
};	

const getLocation = async (addressList) => {
	const theCoordinates = [];

	Object.values(addressList).forEach(address => { 	
		// geocoder requires all fields
		const allValuesPresent = !Object.values(address).some(el => el === "");
		
		if (allValuesPresent) {
			theCoordinates.push(geocoder(address));
		} 
	});
	// The order of the promises are maintained.
	// -- the coordinates returned from the promise will be in the same order as the addresses
	// -- this allows the coordinates to be matched to the addresses
	const coordinates = await Promise.all(theCoordinates);
	var addresses_with_location = [];
	
	for (let i = 0; i < coordinates.length; i++) {
		const within_half_mile = proximity_to_city_center(coordinates[i]['lat'],coordinates[i]['long']);
  		addresses_with_location.push({...addressList[i.toString()],...coordinates[i],...{within_half_mile:within_half_mile}});
	}   
	return addresses_with_location;
}

export default processAddressList;
