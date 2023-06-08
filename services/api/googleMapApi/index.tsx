import { LatLng } from 'react-native-maps';
import { GOOGLE_API_KEY } from '../../../constants/ui';

export const reverseGeocoding = async ({ latitude, longitude }: LatLng) => {
  const res = await fetch(
    'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
      latitude +
      ',' +
      longitude +
      '&location_type=ROOFTOP' +
      '&result_type=street_address' +
      '&key=' +
      GOOGLE_API_KEY
  ).then((response) => response.json());
  return res.results[0];
};

export const geocoding = async (formatted_address: string) => {
  const res = await fetch(
    'https://maps.googleapis.com/maps/api/geocode/json?address=' +
      formatted_address +
      '&location_type=ROOFTOP&result_type=street_address&key=' +
      GOOGLE_API_KEY
  ).then((response) => response.json());

  return res.results[0];
};

export const placeAutocomplete = async (address: string) => {
  const res = await fetch(
    'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' +
      address +
      '&language=vi&types=geocode&key=' +
      GOOGLE_API_KEY
  ).then((response) => response.json());

  return res.predictions;
};

export const placeDetailById = async (placeId: string) => {
  const res = await fetch(
    'https://maps.googleapis.com/maps/api/place/details/json?place_id=' +
      placeId +
      '&key=' +
      GOOGLE_API_KEY
  ).then((response) => response.json());

  return res.result;
};