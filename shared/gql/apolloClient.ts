import { ENV } from "@/constants";
import { getAccessToken } from "@/storage";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";

const authLink = (token: string | undefined) =>
  new SetContextLink(async (prevContext, _) => {
    const { headers } = prevContext;
    const accessToken = token ? token : await getAccessToken();

    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
  });

const httpUri = ENV.GRAPHQL_URI;

const httpLink = new HttpLink({ uri: httpUri });

export const createApolloClient = (token: string | undefined) =>
  new ApolloClient({
    link: authLink(token).concat(httpLink),
    cache: new InMemoryCache(),
  });
