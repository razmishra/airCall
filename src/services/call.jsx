import axios from 'axios';
import { baseUrl, endPoint } from '../config/urls';

export function getCallList() {
    let _url = baseUrl.baseUrl+endPoint.activities;
    return axios.get(_url)
}

export function archiveCall(id,params) {
  let _url = `${baseUrl.baseUrl}${endPoint.activities}/${id}`;
  return axios.patch(_url,params)
}

export function getCallDetailsById(id) {
  let _url = `${baseUrl.baseUrl}${endPoint.activities}/${id}`;
  return axios.get(_url)
}