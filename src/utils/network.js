const host = "192.168.0.181"
const port = "8080"
const httpEndPointUrl = "graphql";
const wsEndPointUrl = "subscription";

export const serverEndPoint = `http://${host}:${port}`;
export const httpEndPoint = `http://${host}:${port}/${httpEndPointUrl}`;
export const socketEndPoint = `ws://${host}:${port}/${wsEndPointUrl}`;

// export const serverEndPoint = `https://app.zujo.io`;
// export const httpEndPoint = `https://app.zujo.io/${httpEndPointUrl}`;
// export const socketEndPoint = `ws://app.zujo.io/${wsEndPointUrl}`;
