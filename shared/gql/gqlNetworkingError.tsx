import { formatGqlError } from "@/utils";
import { ApolloError } from "@apollo/client/v4-migration";
import * as React from "react";
import { Text } from "react-native";

interface IProps {
  error: ApolloError | undefined;
  message?: string;
}

export const GqlNetworkingError: React.FC<IProps> = ({
  error,
  message,
}: IProps) => {
  return <Text>{message || formatGqlError(error)}</Text>;
};
