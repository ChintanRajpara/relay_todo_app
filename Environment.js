import { SubscriptionClient } from "subscriptions-transport-ws";
import { Environment, Network, RecordSource, Store, QueryResponseCache } from "relay-runtime";
import lodash from "lodash";

import { LocalStorage } from "./src/utils/localstorage";
// import RelayQueryResponseCache from "relay-runtime/lib/RelayQueryResponseCache";
import { httpEndPoint, socketEndPoint } from "./src/utils/network";

const oneMinute = 60 * 1000;
const cache = new QueryResponseCache({ size: 250, ttl: oneMinute });

export const store = new Store(new RecordSource());


const fetchQuery = async (operation, variables, cacheConfig, uploadables) => {
  const queryID = operation.text;
  const isMutation = operation.operationKind === "mutation";
  const isQuery = operation.operationKind === "query";
  const forceFetch = cacheConfig && cacheConfig.force;

  const token = await LocalStorage.getToken();

  if (!token) {
    cache.clear();
  }


  const fromCache = cache.get(queryID, variables);


  if (isQuery && fromCache !== null && !forceFetch) {
    return fromCache;
  } else {
  }

  const request = {
    method: "POST",
    headers: {
      ["Authorization"]: token
    }
  };
  if (uploadables) {
    if (!window.FormData) {
      throw new Error("Uploading files without `FormData` not supported.");
    }

    const formData = new FormData();
    const opr = {
      query: operation.text,
      variables: variables
    };
    formData.append("operations", JSON.stringify(opr));

    let mapVariables = {};
    lodash.forEach(uploadables, (uploadable, index) => {
      mapVariables[index] = [`variables.file.${index}`];
    });
    formData.append("map", JSON.stringify(mapVariables));

    Object.keys(uploadables).forEach(key => {
      if (Object.prototype.hasOwnProperty.call(uploadables, key)) {
        formData.append(key, uploadables[key]);
      }
    });
    request.body = formData;
  } else {
    request.headers["Content-Type"] = "application/json";
    request.body = JSON.stringify({
      query: operation.text,
      variables
    });
  }

  return fetch(`${httpEndPoint}`, request)
    .then(response => {

      if (response.status === 200) {
        return response.json();
      }

      return response.json();
    })
    .then(json => {
      if (json.errors) {
        console.log(json.errors[0].message, "errors");
        console.log(json.errors[0].code == 1002 || json.errors[0].code == 1001);
        console.log(json.errors[0].code);
      }
      if (isQuery && json) {
        cache.set(queryID, variables, json);
      }

      if (isMutation) {
        cache.clear();
      }
      if (
        json.errors &&
        json.errors.length > 0 &&
        (json.errors[0].code == 1002 || json.errors[0].code == 1001)
      ) {
        console.log("clearing token")
        LocalStorage.clearToken();
        cache.clear();

      }
      return json;
    })
    .catch(error => {
      return error;
    });
};

const setupSubscription = (config, variables, cacheConfig, observer) => {
  const query = config.text;
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
};

const network = Network.create(fetchQuery, setupSubscription);

const environment = new Environment({ network, store });

export default environment;

export { network }