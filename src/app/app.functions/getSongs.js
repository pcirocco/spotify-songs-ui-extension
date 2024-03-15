const axios = require('axios');
const client_id = '';
const client_secret = ''

exports.main = async (context = {}, sendResponse) => {
    const { firstName, lastName } = context.parameters;
    //const token = process.env['PRIVATE_APP_ACCESS_TOKEN']
    //const message = context.parameters['lastName']
    
   const trackInfo = await getSongs(firstName, lastName)
   console.log(trackInfo)

    return({
      //{alertMessage: `The contact is ${firstName} ${lastName}`}
      trackInfo
})

}

const getArtistID = async (firstName, lastName) => {
  let data = '';
  //let res = ''
  let access_token = '';

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    //url: 'https://api.spotify.com/v1/artists/06HL4z0CvFAxyc27GXpf02/top-tracks?market=ES',
    url: `https://api.spotify.com/v1/search?q=${firstName}+${lastName}&type=artist&market=ES`,
    headers: { 
      'Authorization': 'Bearer ' + access_token
    },
    data : data
  };


  try {
    const response = await axios.request(config);
    const responseData = response.data.artists.items[0].id;
    console.log('serverless function log ' + JSON.stringify(responseData));
    return responseData;
  
    // Now you can use `responseData` as needed.
  } catch (error) {
    console.error(error);
    // Handle errors here
  }

  // const req = await axios.request(config)
  //   .then((response) => {
  //   console.log(JSON.stringify(response.data));
  // })
  // .catch((error) => {
  //   console.log(error);
  // });

  

}


const getSongs = async (firstName, lastName) => {
  let artistID = await getArtistID(firstName,lastName)
  let data = '';
  //let res = ''
  let access_token = '';

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://api.spotify.com/v1/artists/${artistID}/top-tracks?market=ES`,
    //url: `https://api.spotify.com/v1/search?q=${firstName}+${lastName}&type=artist&market=ES`,
    headers: { 
      'Authorization': 'Bearer ' + access_token
    },
    data : data
  };


  try {
    const response = await axios.request(config);
    const responseData = response.data;
    console.log('serverless function log ' + JSON.stringify(responseData));
    return responseData;
  
    // Now you can use `responseData` as needed.
  } catch (error) {
    console.error(error);
    // Handle errors here
  }
}



// async function getToken() {
//   const data = new URLSearchParams({
//     'grant_type': 'client_credentials',
//   });

//   const headers = {
//     'Content-Type': 'application/x-www-form-urlencoded',
//     'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')),
//   };

//   try {
//     const response = await axios.post('https://accounts.spotify.com/api/token', data, { headers });
//     return response.data;
//   } catch (error) {
//     // Handle errors here
//     console.error('Error fetching token:', error.message);
//     throw error;
//   }
// }

// async function getTrackInfo(access_token) {
//   const response = await fetch("https://api.spotify.com/v1/tracks/4cOdK2wGLETKBW3PvgPWqT", {
//     method: 'GET',
//     headers: { 'Authorization': 'Bearer ' + access_token },
//   });

//   return await response.json();
// }


//const getSongs = (firstName, lastName) => {






// async function getSongs(accessToken) {
//   let accessToken = localStorage.getItem('access_token');

//   const response = await fetch('https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/top-tracks?market=ES', {
//     headers: {
//       Authorization: 'Bearer ' + accessToken
//     }
//   });

//   const data = await response.json();
// }


// const getSongs


