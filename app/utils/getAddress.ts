import axios from "axios";

const getAddress = async (lat: number, lng: number) => {
  const apiUrl = "https://maps.googleapis.com/maps/api/geocode/json";

  try {
    const response = await axios.get(apiUrl, {
      params: {
        latlng: `${lat},${lng}`,
        key: process.env.GOOGLE_GEOCODING_API_KEY,
      },
    });

    const data = response.data;

    const address = data.results[0].formatted_address;
    return { result: address };
  } catch (error) {
    return { error };
  }
};

export default getAddress;
