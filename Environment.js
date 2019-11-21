// import { SubscriptionClient } from "subscriptions-transport-ws";
// import { Environment, Network, RecordSource, Store, QueryResponseCache } from "relay-runtime";
// import lodash from "lodash";

// import { LocalStorage } from "./src/utils/localstorage";
// // import RelayQueryResponseCache from "relay-runtime/lib/RelayQueryResponseCache";
// import { httpEndPoint, socketEndPoint } from "./src/utils/network";

// const oneMinute = 60 * 1000;
// const cache = new QueryResponseCache({ size: 250, ttl: oneMinute });

// export const store = new Store(new RecordSource());


// const fetchQuery = async (operation, variables, cacheConfig, uploadables) => {
//   const queryID = operation.text;
//   const isMutation = operation.operationKind === "mutation";
//   const isQuery = operation.operationKind === "query";
//   const forceFetch = cacheConfig && cacheConfig.force;

//   const token = await LocalStorage.getToken();

//   if (!token) {
//     cache.clear();
//   }


//   const fromCache = cache.get(queryID, variables);


//   if (isQuery && fromCache !== null && !forceFetch) {
//     return fromCache;
//   } else {
//   }

//   const request = {
//     method: "POST",
//     headers: {
//       ["Authorization"]: token
//     }
//   };
//   if (uploadables) {
//     if (!window.FormData) {
//       throw new Error("Uploading files without `FormData` not supported.");
//     }

//     const formData = new FormData();
//     const opr = {
//       query: operation.text,
//       variables: variables
//     };
//     formData.append("operations", JSON.stringify(opr));

//     let mapVariables = {};
//     lodash.forEach(uploadables, (uploadable, index) => {
//       mapVariables[index] = [`variables.file.${index}`];
//     });
//     formData.append("map", JSON.stringify(mapVariables));

//     Object.keys(uploadables).forEach(key => {
//       if (Object.prototype.hasOwnProperty.call(uploadables, key)) {
//         formData.append(key, uploadables[key]);
//       }
//     });
//     request.body = formData;
//   } else {
//     request.headers["Content-Type"] = "application/json";
//     request.body = JSON.stringify({
//       query: operation.text,
//       variables
//     });
//   }

//   return fetch(`${httpEndPoint}`, request)
//     .then(response => {

//       if (response.status === 200) {
//         return response.json();
//       }

//       return response.json();
//     })
//     .then(json => {
//       if (json.errors) {
//         console.log(json.errors[0].message, "errors");
//         console.log(json.errors[0].code == 1002 || json.errors[0].code == 1001);
//         console.log(json.errors[0].code);
//       }
//       if (isQuery && json) {
//         cache.set(queryID, variables, json);
//       }

//       if (isMutation) {
//         cache.clear();
//       }
//       if (
//         json.errors &&
//         json.errors.length > 0 &&
//         (json.errors[0].code == 1002 || json.errors[0].code == 1001)
//       ) {
//         console.log("clearing token")
//         LocalStorage.clearToken();
//         cache.clear();

//       }
//       return json;
//     })
//     .catch(error => {
//       return error;
//     });
// };

// const setupSubscription = (config, variables, cacheConfig, observer) => {
//   const query = config.text;
//   const { onNext, onError, onCompleted } = observer;
//   const subscriptionClient = new SubscriptionClient(`${socketEndPoint}`, {
//     reconnect: true,
//     connectionParams: {
//       hello: "world"
//     }
//   });
//   const client = subscriptionClient
//     .request({ query, variables })
//     .subscribe(onNext, onError, onCompleted);
//   return {
//     dispose: client.unsubscribe
//   }
// };

// const network = Network.create(fetchQuery, setupSubscription);

// const environment = new Environment({ network, store });

// export default environment;

// export { network }





import {
  Environment,
  Network,
  QueryResponseCache,
  RecordSource,
  Store,
} from 'relay-runtime';
import { httpEndPoint, socketEndPoint } from './src/utils/network';
import { SubscriptionClient } from "subscriptions-transport-ws";
import { LocalStorage } from './src/utils/localstorage';

const oneMinute = 60 * 1000;
const cache = new QueryResponseCache({ size: 250, ttl: oneMinute });

async function fetchQuery(
  operation,
  variables,
  cacheConfig,
) {
  const queryID = operation.text;
  const isMutation = operation.operationKind === 'mutation';
  const isQuery = operation.operationKind === 'query';
  const forceFetch = cacheConfig && cacheConfig.force;

  const token = await LocalStorage.getToken();

  // console.log({ token })

  // Try to get data from cache on queries
  const fromCache = cache.get(queryID, variables);
  if (
    isQuery &&
    fromCache !== null &&
    !forceFetch
  ) {
    return fromCache;
  }

  // Otherwise, fetch data from server
  return fetch(httpEndPoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ["authorization"]: token
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json();
  }).then(json => {
    // Update cache on queries
    if (isQuery && json) {
      cache.set(queryID, variables, json);
    }
    // Clear cache on mutations
    if (isMutation) {
      cache.clear();
    }

    return json;
  });
}

// const setupSubscription = (config, variables, cacheConfig, observer) => {
//   const query = config.text;
//   const { onNext, onError, onCompleted } = observer;
//   const subscriptionClient = new SubscriptionClient(`${socketEndPoint}`, {
//     reconnect: true,
//     connectionParams: {
//       hello: "world"
//     }
//   });
//   const client = subscriptionClient
//     .request({ query, variables })
//     .subscribe(onNext, onError, onCompleted);
//   return {
//     dispose: client.unsubscribe
//   }
// };


export const network = Network.create(
  fetchQuery,
  (config, variables, cacheConfig, observer) => {
    const query = config.text;
    console.log({ observer })
    const { onNext, onError, onCompleted } = observer;
    const subscriptionClient = new SubscriptionClient(`${socketEndPoint}`, {
      reconnect: true,
      connectionParams: {
        hello: "world"
      }
    });
    const client = subscriptionClient
      .request({ query, variables })
      .subscribe(onNext, onError, onCompleted);
    return {
      dispose: client.unsubscribe
    }
  }
)

const environment = new Environment({
  network,
  store: new Store(new RecordSource()),
});

export default environment;






// import { Environment, RecordSource, Store } from 'relay-runtime';
// import 'regenerator-runtime/runtime';

// import {
//   RelayNetworkLayer,
//   urlMiddleware,
//   batchMiddleware,
//   // legacyBatchMiddleware,
//   loggerMiddleware,
//   errorMiddleware,
//   perfMiddleware,
//   retryMiddleware,
//   authMiddleware,
//   cacheMiddleware,
//   progressMiddleware,
// } from 'react-relay-network-modern';
// import { httpEndPoint } from './src/utils/network';

// export const network = new RelayNetworkLayer(
//   [
//     cacheMiddleware({
//       size: 100, // max 100 requests
//       ttl: 900000, // 15 minutes
//     }),
//     urlMiddleware({
//       url: (req) => Promise.resolve(httpEndPoint),
//     }),
//     // Deprecated batch middleware
//     // legacyBatchMiddleware({
//     //   batchUrl: (requestMap) => Promise.resolve('/graphql/batch'),
//     //   batchTimeout: 10,
//     // }),
//     batchMiddleware({
//       batchUrl: (requestList) => Promise.resolve('/graphql/batch'),
//       batchTimeout: 10,
//     }),
//     __DEV__ ? loggerMiddleware() : null,
//     __DEV__ ? errorMiddleware() : null,
//     __DEV__ ? perfMiddleware() : null,
//     retryMiddleware({
//       fetchTimeout: 15000,
//       retryDelays: (attempt) => Math.pow(2, attempt + 4) * 100, // or simple array [3200, 6400, 12800, 25600, 51200, 102400, 204800, 409600],
//       beforeRetry: ({ forceRetry, abort, delay, attempt, lastError, req }) => {
//         if (attempt > 10) abort();
//         window.forceRelayRetry = forceRetry;
//         console.log('call `forceRelayRetry()` for immediately retry! Or wait ' + delay + ' ms.');
//       },
//       statusCodes: [500, 503, 504],
//     }),
//     authMiddleware({
//       token: () => store.get('jwt'),
//       tokenRefreshPromise: (req) => {
//         console.log('[client.js] resolve token refresh', req);
//         return fetch('/jwt/refresh')
//           .then((res) => res.json())
//           .then((json) => {
//             const token = json.token;
//             store.set('jwt', token);
//             return token;
//           })
//           .catch((err) => console.log('[client.js] ERROR can not refresh token', err));
//       },
//     }),
//     progressMiddleware({
//       onProgress: (current, total) => {
//         console.log('Downloaded: ' + current + ' B, total: ' + total + ' B');
//       },
//     }),

//     // example of the custom inline middleware
//     (next) => async (req) => {
//       req.fetchOpts.method = 'GET'; // change default POST request method to GET
//       req.fetchOpts.headers['X-Request-ID'] = uuid.v4(); // add `X-Request-ID` to request headers
//       req.fetchOpts.credentials = 'same-origin'; // allow to send cookies (sending credentials to same domains)
//       // req.fetchOpts.credentials = 'include'; // allow to send cookies for CORS (sending credentials to other domains)

//       console.log('RelayRequest', req);

//       const res = await next(req);
//       console.log('RelayResponse', res);

//       return res;
//     },
//   ],

// ); // as second arg you may pass advanced options for RRNL

// const source = new RecordSource();
// const store = new Store(source);
// const environment = new Environment({ network, store });

// export default environment