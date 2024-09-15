const axios = require('axios');
const convex = require('convex');


const DOORDASH_API_URL = process.env.DOORDASH_API_TOKEN;
const SIGNING_SECRET = process.env.DOORDASH_API_TOKEN;
const KEY_ID = process.env.DOORDASH_API_TOKEN;

exports.default = convex.asyncFunc(async ({ input }) => {
  const { external_delivery_id, pickup_address, pickup_business_name, pickup_phone_number, pickup_instructions, dropoff_address, dropoff_business_name, dropoff_phone_number, dropoff_instructions, order_value } = input;

  const body = JSON.stringify({
    external_delivery_id,
    pickup_address,
    pickup_business_name,
    pickup_phone_number,
    pickup_instructions,
    dropoff_address,
    dropoff_business_name,
    dropoff_phone_number,
    dropoff_instructions,
    order_value,
  });

  try {
    // Make the API request
    const response = await axios.post(DOORDASH_API_URL, body, {
      headers: {
        Authorization: `Bearer ${DOORDASH_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    // Log the response data
    console.log('DoorDash API response:', response.data);

    // Return the response data
    return response.data;
  } catch (error) {
    // Log the error
    console.error('Error creating DoorDash delivery:', error);

    // Handle or rethrow the error
    throw new Error('Failed to create DoorDash delivery');
  }
});
