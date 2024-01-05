import axios from "axios";



/**
 * @swagger
 * /api/getAddress:
 *   get:
 *     description: Returns the current adress based on location
 *     parameters:
 *       - in: query
 *         name: lat
 *         description: Latitude
 *         required: true
 *         schema:
 *           type: number
 *       - in: query
 *         name: lng
 *         description: Longitude
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *          description: current adress
 */
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
