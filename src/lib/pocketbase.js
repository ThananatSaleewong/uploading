import PocketBase from "pocketbase";

const pb = new PocketBase("https://tinkling-byte.pockethost.io");
pb.autoCancellation(false);
export default pb;
