// import Axios from 'axios';
import Axios, { AxiosRequestConfig, Method } from 'axios';
import { ErrorObject } from 'webpack/node_modules/schema-utils/declarations/validate';
// import Axios from './axios-interceptor';

function getCookie(name = 'access_token') {
  const v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? v[2] : null;
}

export async function postFormAsync(
  url: string,
  body?: any,
  config?: AxiosRequestConfig,
) {
  // let method: Method;
  // method = 'POST';
  const defaultConfig = {
    method: 'POST',
    url,
    headers: {
      Authorization: 'Bearer ' + getCookie(),
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: body,
    // config,
  };
  const finalConfig = Object.assign({}, defaultConfig, config);
  let response;
  try {
    response = await Axios(finalConfig);
    const { status, data } = response;
    return Promise.resolve({ status, data });
  } catch (ex: any) {
    const { status = 400, data = {} } = ex?.response || {};
    return Promise.resolve({ status, data });
  }
}

export async function getAsync(url, param) {
  try {
    const response = await Axios.get(url, {
      headers: {
        Authorization: 'Bearer ' + getCookie(),
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      params: param,
    });

    return response;
  } catch (ex: any) {
    const { status = 400, data = {} } = ex?.response || {};
    const error = data?.errors || [];
    return {
      status,
      data: {},
      message: error[0]?.message || '',
      code: error[0]?.code || 0,
    };
  }
}

export async function patchAsync(url, data) {
  try {
    let formData = new FormData();
    for (const i in data) {
      formData.append(i, data[i]);
    }
    const response = await Axios.patch(url, data, {
      headers: {
        Authorization: 'Bearer ' + getCookie(),
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (ex: any) {
    const { status = 400, data = {}, errors = [] } = ex?.response || {};
    const error = data?.errors || [];
    return {
      status,
      data: ex?.response?.data || {},
      errors,
      message: error[0]?.message || '',
    };
  }
}

export async function patchNormalAsync(url, data) {
  try {
    const response = await Axios.patch(url, data, {
      headers: {
        Authorization: 'Bearer ' + getCookie(),
      },
    });
    return response;
  } catch (ex: any) {
    const { status = 400, data = {}, errors = [] } = ex.response || {};
    const error = data?.errors || [];
    return {
      status,
      data: ex?.response?.data || {},
      errors,
      message: error[0]?.message || '',
    };
  }
}

export async function patchFormAsync(url, data) {
  try {
    let formData = new FormData();
    for (const i in data) {
      formData.append(i, data[i]);
    }
    const response = await Axios.patch(url, formData, {
      headers: {
        Authorization: 'Bearer ' + getCookie(),
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (ex: any) {
    const { status = 400, data = {}, errors = [] } = ex.response || {};
    const error = data?.errors || [];
    return {
      status,
      data: ex?.response?.data || {},
      errors,
      message: error[0]?.message || '',
    };
  }
}

export async function deleteAsync(url) {
  try {
    const response = await Axios.delete(url, {
      headers: {
        Authorization: 'Bearer ' + getCookie(),
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (ex: any) {
    const { status = 400, data = {}, errors = [] } = ex.response || {};
    const error = data?.errors || [];
    return {
      status,
      data: ex?.response?.data || {},
      errors,
      message: error[0]?.message || '',
    };
  }
}

export async function postAsync(url, data) {
  try {
    const response = await Axios.post(url, data, {
      headers: {
        Authorization: 'Bearer ' + getCookie(),
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (ex: any) {
    const { status = 400, data = {}, errors = [] } = ex.response || {};
    const error = data?.errors || [];
    return {
      status,
      data: ex?.response?.data || {},
      errors,
      message: error[0]?.message || '',
    };
  }
}

export async function putAsync(url, data) {
  try {
    const response = await Axios.put(url, data, {
      headers: {
        Authorization: 'Bearer ' + getCookie(),
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (ex: any) {
    const { status = 400, data = {}, errors = [] } = ex.response || {};
    const error = data?.errors || [];
    return {
      status,
      data: ex?.response?.data || {},
      errors,
      message: error[0]?.message || '',
    };
  }
}
