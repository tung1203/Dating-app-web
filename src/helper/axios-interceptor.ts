import axios from 'axios';
import { getCookie } from './utils';

interface PromType {
  reject: Function;
  resolve: Function;
}

type Options = {
  expires?: Date | number | string;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: string;
};

let isRefreshing = false;
let failedQueue: PromType[];

const AxiosInstance = axios.create({
  timeout: 300000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

function refreshToken() {
  var bodyFormData = new FormData();
  bodyFormData.set('grant_type', 'refresh_token');
  // bodyFormData.set('client_id', process.env.REACT_APP_OIDC_CLIENT_ID);
  // bodyFormData.set('refresh_token', getCookie('refresh_token'));

  return axios({
    method: 'POST',
    url: process.env.REACT_APP_AUTHORIZATION_ISSUER + '/connect/token',
    data: bodyFormData,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

function setCookie(name, value, options: Options) {
  options = {
    path: '/',
    // add other defaults here if necessary
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie =
    encodeURIComponent(name) + '=' + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += '; ' + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += '=' + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

export function refreshTokenFunc(error) {
  // const { response, config } = error;
  return refreshToken()
    .then(response => {
      const { data } = response;
      // if (!data)
      //     return Promise.reject(error)
      const accessToken = data.access_token;
      const refreshToken = data.refresh_token;
      const expireIn = data.expires_in || 3600;
      //const config = response.config;
      if (accessToken && refreshToken) {
        //save token
        setCookie('access_token', accessToken, {
          path: '/',
          expires: new Date(new Date().getTime() + expireIn * 1000),
          sameSite: 'lax',
        });

        setCookie('refresh_token', refreshToken, {
          path: '/',
          sameSite: 'lax',
        });

        // if (config) {
        //     config.headers['Authorization'] = 'Bearer ' + accessToken;
        //     return AxiosInstance(config)
        // }
      }
      // else
      //     return Promise.reject(error)
      return response;
    })
    .catch(() => {
      return 0;
    });
}

AxiosInstance.interceptors.response.use(
  response => {
    console.log(`response`, response);
    return response;
  },
  error => {
    console.log(`error`, error);
    const { response, config } = error;
    if (response) {
      console.log(`response`, response, config, failedQueue, isRefreshing);
      const { status } = response;
      if (status === 401 && getCookie('refresh_token') && !config._retry) {
        // 401
        // get new token
        console.log(`isRefreshing`, isRefreshing);
        if (isRefreshing) {
          console.log(`failedQueue`, failedQueue);
          return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then(token => {
              config.headers['Authorization'] = 'Bearer ' + token;
              return axios(config);
            })
            .catch(err => {
              return Promise.reject(err);
            });
        }

        config._retry = true;
        isRefreshing = true;

        return refreshToken()
          .then(response => {
            const { data } = response;
            if (!data) return Promise.reject(error);
            const accessToken = data.access_token;
            const refreshToken = data.refresh_token;
            const expireIn = data.expires_in || 3600;
            //const config = response.config;
            if (accessToken && refreshToken) {
              //save token
              setCookie('access_token', accessToken, {
                path: '/',
                expires: new Date(new Date().getTime() + expireIn * 1000),
                sameSite: 'lax',
              });

              setCookie('refresh_token', refreshToken, {
                path: '/',
                sameSite: 'lax',
              });

              processQueue(null, accessToken);

              if (config) {
                config.headers['Authorization'] = 'Bearer ' + accessToken;
                return AxiosInstance(config);
              }
            } else return Promise.reject(error);
          })
          .catch(err => {
            processQueue(err, null);
            return Promise.reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      } else {
        return response;
      }
    } else return Promise.reject(error);
  },
);

export default AxiosInstance;
