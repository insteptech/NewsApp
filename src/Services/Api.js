import axios from 'axios';

import * as types from '../Types/index';

export async function getHeadlines(country = 'In') {
  try {
    let requests = [];
    types.CATEGORIES.map(category => {
      let url = `${
        types.HEADLINES
      }&country=${country}&category=${category.toLowerCase()}`;
      // console.log(category, 'category', url);

      requests.push(axios.get(url));
    });

    let response = await Promise.all(requests);
    // console.log(response, 'responseresponseresponseresponse', requests);
    response.map((resp, idx) => {
      let {articles, totalResults} = resp.data;

      response[idx] = {articles, totalResults};
    });

    let [
      business,
      entertainment,
      general,
      health,
      science,
      sports,
      technology,
    ] = response;

    return {
      business,
      entertainment,
      general,
      health,
      science,
      sports,
      technology,
    };
  } catch (e) {
    throw new Error(e);
  }
}

export async function getHeadlinesByCategory(
  category,
  page = 1,
  country = 'us',
) {
  try {
    const url = `${types.HEADLINES}&category=${category}&page=${page}&country=${country}`;
    let res = await axios.get(url);

    return res.data;
  } catch (e) {
    throw new Error(e);
  }
}

export async function search(query, cancelToken) {
  try {
    const url = `${types.SEARCH}&q=${query.toLowerCase()}`;
    let res = await axios.get(url, {
      cancelToken: cancelToken.token,
    });

    return res.data;
  } catch (error) {
    let err = new Error(error.message);
    err.isCancel = axios.isCancel(error);

    throw err;
  }
}
