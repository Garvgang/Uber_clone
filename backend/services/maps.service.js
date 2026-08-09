const axios = require("axios");
const GOOGLE_MAPS_API = process.env.GOOGLE_MAPS_API;

module.exports.getAddressCoordinate = async (address) => {
  if (!address) {
    throw new Error("Address is required to get coordinates.");
  }
  if (!GOOGLE_MAPS_API) {
    throw new Error("Google Maps API key is not configured in process.env.GOOGLE_MAPS_API.");
  }

  const url = "https://maps.googleapis.com/maps/api/geocode/json";

  try {
    const response = await axios.get(url, {
      params: {
        address,
        key: GOOGLE_MAPS_API,
      },
    });

    const data = response.data;

    if (data.status !== "OK" || !data.results || data.results.length === 0) {
      const errorMessage = data.error_message || "No results returned from Google Geocoding API.";
      throw new Error(`Geocoding failed: ${data.status} - ${errorMessage}`);
    }

    const location = data.results[0].geometry.location;
    return {
      latitude: location.lat,
      longitude: location.lng,
    };
  } catch (error) {
    const message = error.response?.data?.error_message || error.message || "Unknown error";
    throw new Error(`Failed to fetch coordinates for address: ${message}`);
  }
}; 

module.exports.getDistanceTime = async (origin, destination) => {

    if (!origin || !destination) {
        throw new Error("Origin and destination are required");
    }

    const originLocation =
        await module.exports.getAddressCoordinate(origin);

    const destinationLocation =
        await module.exports.getAddressCoordinate(destination);

    try {

        const response = await axios.post(
            "https://routes.googleapis.com/directions/v2:computeRoutes",
            {
                origin: {
                    location: {
                        latLng: {
                            latitude: originLocation.latitude,
                            longitude: originLocation.longitude
                        }
                    }
                },
                destination: {
                    location: {
                        latLng: {
                            latitude: destinationLocation.latitude,
                            longitude: destinationLocation.longitude
                        }
                    }
                },

                travelMode: "DRIVE",

                routingPreference: "TRAFFIC_AWARE"
            },

            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-Api-Key": GOOGLE_MAPS_API,
                    "X-Goog-FieldMask":
                        "routes.distanceMeters,routes.duration"
                }
            }

        );

        console.log(response.data);

        if (!response.data.routes ||
            response.data.routes.length === 0) {
            throw new Error("No route found");
        }

        const route = response.data.routes[0];

        return {

            distance: {
                text: `${(route.distanceMeters / 1000).toFixed(1)} km`,
                value: route.distanceMeters
            },

            duration: {
                text: secondsToText(route.duration),
                value: parseDuration(route.duration)
            }

        };

    }
    catch (error) {

        throw new Error(
            error.response?.data?.error?.message ||
            error.message
        );

    }

}

module.exports.getAutoCompleteSuggestions = async (input)=>{

    if(!input){
        throw new Error("Input is required");
    }

    try{

        const response = await axios.post(

            "https://places.googleapis.com/v1/places:autocomplete",

            {
                input:input
            },

            {
                headers:{
                    "Content-Type":"application/json",
                    "X-Goog-Api-Key":GOOGLE_MAPS_API,
                    "X-Goog-FieldMask":"suggestions.placePrediction.text"
                }
            }

        );

        return response.data.suggestions;

    }
    catch(error){

        throw new Error(
            error.response?.data?.error?.message ||
            error.message
        );

    }

}

module.exports.getCaptainsInTheRadius = async (lat, lng, radius) => {
    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [
                    [lng, lat],
                    radius / 6371
                ]
            }
        }
    });

    return captains;
};

function parseDuration(duration){
  return Number(duration.replace("s",""));
}

function secondsToText(duration){
    const seconds=parseDuration(duration);
    const hours=Math.floor(seconds/3600);
    const minutes=Math.floor((seconds%3600)/60);

    if(hours>0){

        return `${hours} hr ${minutes} min`;

    }

    return `${minutes} min`;

}

