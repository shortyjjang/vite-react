const API_KEY = "AIzaSyB0000000000000000000000000000000"; //YOUR_GOOGLE_MAPS_API_KEY
const GEOCODE_URL = "https://maps.googleapis.com/maps/api/geocode/json";
const DIRECTIONS_URL = "https://maps.googleapis.com/maps/api/directions/json";

interface AddressData {
  coords: {
    lat: number;
    lng: number;
  };
  address: string;
}

export const getDistance = async (
  current: {
    lat: number;
    lng: number;
  },
  target: {
    lat: number;
    lng: number;
  }
) => {
  const dirRes = await fetch(
    `${DIRECTIONS_URL}?origin=${current.lat},${current.lng}&destination=${target.lat},${target.lng}&mode=driving&key=${API_KEY}`
  );
  const dirData = await dirRes.json();
  const route = dirData.routes[0].legs[0];

  const deliveryFee = route.distance.value * 0.0001;
  return {
    distance: route.distance.text,
    duration: route.duration.text,
    deliveryFee: deliveryFee,
  };
  // return {
  //   distance: 1000,
  //   duration: 40,
  //   deliveryFee: 3500,
  // };
};

export const coordsToAddress = async (): Promise<AddressData | string> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      return reject("Geolocation not supported");
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const geoRes = await fetch(
            `${GEOCODE_URL}?latlng=${latitude},${longitude}&key=${API_KEY}`
          );
          const geoData = await geoRes.json();
          resolve({
            coords: {
              lat: latitude,
              lng: longitude,
            },
            address: geoData.results[0].formatted_address,
          });
        } catch (error) {
          reject("Failed to fetch address");
        }
      },
      () => {
        alert("위치를 가져오는 데 실패했습니다.");
        reject("Failed to get location");
      },
      { enableHighAccuracy: true }
    );
  });
};
