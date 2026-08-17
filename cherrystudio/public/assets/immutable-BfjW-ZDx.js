import { a as withMiddleware, n as useSWR } from "./index-TMMTgJj7.js";
var immutable = (useSWRNext) => (key, fetcher, config) => {
	config.revalidateOnFocus = false;
	config.revalidateIfStale = false;
	config.revalidateOnReconnect = false;
	return useSWRNext(key, fetcher, config);
};
var useSWRImmutable = withMiddleware(useSWR, immutable);
export { useSWRImmutable as t };
