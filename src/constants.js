export let remoteBackendUrl="https://web-app-name-72-dsdqghhmbzbmfdd2.canadacentral-01.azurewebsites.net"
export let localBackendUrl='http://localhost:5007'

let nodeidaccess="user_generate_id_7577777777"
export const NODE_ID_ACCESSOR = nodeidaccess;

export const SAMPLE_CYPHER = `MATCH (n)-[r]->(m) RETURN n,r,m LIMIT 100`;
