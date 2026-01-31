/* THIS IS A GENERATED FILE - DO NOT MODIFY */

/* eslint-disable */

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client/react';
import * as ApolloReactHooks from '@apollo/client/react';
export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {"errorPolicy":"all"} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Address = {
  __typename?: 'Address';
  address: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['ID']>;
  isDefault: Scalars['Boolean'];
  label?: Maybe<Scalars['String']>;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  userId?: Maybe<Scalars['String']>;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
  user: User;
};

export enum AuthProvider {
  Apple = 'APPLE',
  EmailPassword = 'EMAIL_PASSWORD',
  Google = 'GOOGLE'
}

export type CompleteSalonOnboardingInput = {
  businessName: Scalars['String'];
  location: SalonLocationInput;
  profileImageUrl?: InputMaybe<Scalars['String']>;
  serviceRadiusKm?: InputMaybe<Scalars['Int']>;
};

export type CreateRevampOrderInput = {
  hairItems: Array<HairItemInput>;
  notes?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  pickupAddress: PickupAddressInput;
  requestedReturnDate?: InputMaybe<Scalars['DateTime']>;
  requestedReturnDays?: InputMaybe<Scalars['Int']>;
};

export type CreateRevampOrderPayload = {
  __typename?: 'CreateRevampOrderPayload';
  order: Order;
};

export type HairItemInput = {
  description?: InputMaybe<Scalars['String']>;
  hairLength: Scalars['String'];
  hairType: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  orderItemUrl?: InputMaybe<Scalars['String']>;
  serviceId: Scalars['ID'];
};

export type LoginWithEmailInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  completeSalonOnboarding: Salon;
  createRevampOrder: CreateRevampOrderPayload;
  loginWithEmail: AuthPayload;
  loginWithOAuth: AuthPayload;
  registerWithEmail: AuthPayload;
  setSalonOnline: Salon;
  updateProfile: User;
};


export type MutationCompleteSalonOnboardingArgs = {
  input: CompleteSalonOnboardingInput;
};


export type MutationCreateRevampOrderArgs = {
  input: CreateRevampOrderInput;
};


export type MutationLoginWithEmailArgs = {
  input: LoginWithEmailInput;
};


export type MutationLoginWithOAuthArgs = {
  input: OAuthInput;
};


export type MutationRegisterWithEmailArgs = {
  input: RegisterWithEmailInput;
};


export type MutationSetSalonOnlineArgs = {
  isOnline: Scalars['Boolean'];
};


export type MutationUpdateProfileArgs = {
  input: UpdateProfileInput;
};

export type OAuthInput = {
  email?: InputMaybe<Scalars['String']>;
  fullName: Scalars['String'];
  profileImage?: InputMaybe<Scalars['String']>;
  provider: AuthProvider;
  providerId: Scalars['String'];
  role?: InputMaybe<UserRole>;
};

export type OfficeAddressInput = {
  address: Scalars['String'];
  label?: InputMaybe<Scalars['String']>;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type Order = {
  __typename?: 'Order';
  createdAt: Scalars['DateTime'];
  customer: User;
  customerId: Scalars['String'];
  id: Scalars['ID'];
  items: Array<OrderItem>;
  payments: Array<Payment>;
  phoneNumber?: Maybe<Scalars['String']>;
  pickupAddress: Address;
  pickupAddressId: Scalars['String'];
  requestedReturnDate?: Maybe<Scalars['DateTime']>;
  requestedReturnDays?: Maybe<Scalars['Int']>;
  salon?: Maybe<Salon>;
  salonId?: Maybe<Scalars['String']>;
  status: OrderStatus;
  statusEvents: Array<OrderStatusEvent>;
  totalAmount: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type OrderItem = {
  __typename?: 'OrderItem';
  createdAt: Scalars['DateTime'];
  hairLength?: Maybe<Scalars['String']>;
  hairType?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  itemType: OrderItemType;
  nameSnapshot: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  orderId: Scalars['String'];
  orderItemUrl?: Maybe<Scalars['String']>;
  priceSnapshot: Scalars['Float'];
  quantity: Scalars['Int'];
  referenceId: Scalars['String'];
  service?: Maybe<Service>;
  serviceId?: Maybe<Scalars['String']>;
};

export enum OrderItemType {
  Product = 'PRODUCT',
  Service = 'SERVICE'
}

export enum OrderStatus {
  AtSalon = 'AT_SALON',
  Cancelled = 'CANCELLED',
  Created = 'CREATED',
  Delivered = 'DELIVERED',
  OutForDelivery = 'OUT_FOR_DELIVERY',
  PickedUp = 'PICKED_UP',
  PickupAssigned = 'PICKUP_ASSIGNED',
  ReadyForDelivery = 'READY_FOR_DELIVERY',
  Revamping = 'REVAMPING'
}

export type OrderStatusEvent = {
  __typename?: 'OrderStatusEvent';
  actor: StatusActor;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  message?: Maybe<Scalars['String']>;
  orderId: Scalars['String'];
  status: OrderStatus;
};

export type Payment = {
  __typename?: 'Payment';
  amount: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  customerId: Scalars['String'];
  id: Scalars['ID'];
  orderId: Scalars['String'];
  paidAt?: Maybe<Scalars['DateTime']>;
  provider: Scalars['String'];
  reference: Scalars['String'];
  status: Scalars['String'];
};

export type PickupAddressInput = {
  address: Scalars['String'];
  label?: InputMaybe<Scalars['String']>;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  me: User;
  mySalon?: Maybe<Salon>;
  order: Order;
  orderHistory: RecentOrdersConnection;
  recentOrdersInProgress: RecentOrdersConnection;
  salons: Array<Salon>;
  salonsNearLocation: Array<Salon>;
  services: Array<Service>;
};


export type QueryOrderArgs = {
  id: Scalars['ID'];
};


export type QueryOrderHistoryArgs = {
  input?: InputMaybe<RecentOrdersInput>;
};


export type QueryRecentOrdersInProgressArgs = {
  input?: InputMaybe<RecentOrdersInput>;
};


export type QuerySalonsNearLocationArgs = {
  input: SalonsNearLocationInput;
};

export type RecentOrdersConnection = {
  __typename?: 'RecentOrdersConnection';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  orders: Array<Order>;
};

export type RecentOrdersInput = {
  cursor?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
};

export type RegisterWithEmailInput = {
  email: Scalars['String'];
  fullName: Scalars['String'];
  password: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  role: UserRole;
};

export type Salon = {
  __typename?: 'Salon';
  address: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  imageUrl?: Maybe<Scalars['String']>;
  isOnline: Scalars['Boolean'];
  isVerified: Scalars['Boolean'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  name: Scalars['String'];
  onboardingComplete: Scalars['Boolean'];
  rating?: Maybe<Scalars['Float']>;
  serviceRadiusKm: Scalars['Int'];
  userId: Scalars['String'];
};

export type SalonLocationInput = {
  address: Scalars['String'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type SalonsNearLocationInput = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  radiusInMiles?: InputMaybe<Scalars['Float']>;
};

export type Service = {
  __typename?: 'Service';
  basePrice: Scalars['Float'];
  category: Scalars['String'];
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  estimatedDays: Scalars['Int'];
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  isBestValue: Scalars['Boolean'];
  isPopular: Scalars['Boolean'];
  name: Scalars['String'];
};

export enum StatusActor {
  Rider = 'RIDER',
  Salon = 'SALON',
  System = 'SYSTEM'
}

export type UpdateProfileInput = {
  defaultAddress?: InputMaybe<OfficeAddressInput>;
  defaultAddressId?: InputMaybe<Scalars['ID']>;
  fullName?: InputMaybe<Scalars['String']>;
  notificationsEnabled?: InputMaybe<Scalars['Boolean']>;
  officeAddress?: InputMaybe<OfficeAddressInput>;
  phone?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  authProvider: AuthProvider;
  createdAt: Scalars['DateTime'];
  defaultAddress?: Maybe<Address>;
  email?: Maybe<Scalars['String']>;
  fullName: Scalars['String'];
  id: Scalars['ID'];
  notificationsEnabled: Scalars['Boolean'];
  officeAddress?: Maybe<Address>;
  phone?: Maybe<Scalars['String']>;
  profileImage?: Maybe<Scalars['String']>;
  providerId: Scalars['String'];
  role: UserRole;
  updatedAt: Scalars['DateTime'];
};

export enum UserRole {
  Admin = 'ADMIN',
  Customer = 'CUSTOMER',
  Delivery = 'DELIVERY',
  Salon = 'SALON'
}

export type LoginWithOAuthMutationVariables = Exact<{
  input: OAuthInput;
}>;


export type LoginWithOAuthMutation = { __typename?: 'Mutation', loginWithOAuth: { __typename?: 'AuthPayload', token: string, user: { __typename?: 'User', id: string, fullName: string, email?: string | undefined, role: UserRole, profileImage?: string | undefined, authProvider: AuthProvider, providerId: string, createdAt: any, updatedAt: any } } };

export type RegisterWithEmailMutationVariables = Exact<{
  input: RegisterWithEmailInput;
}>;


export type RegisterWithEmailMutation = { __typename?: 'Mutation', registerWithEmail: { __typename?: 'AuthPayload', token: string, user: { __typename?: 'User', id: string, fullName: string, email?: string | undefined, role: UserRole, profileImage?: string | undefined, authProvider: AuthProvider, providerId: string, createdAt: any, updatedAt: any } } };

export type LoginWithEmailMutationVariables = Exact<{
  input: LoginWithEmailInput;
}>;


export type LoginWithEmailMutation = { __typename?: 'Mutation', loginWithEmail: { __typename?: 'AuthPayload', token: string, user: { __typename?: 'User', id: string, fullName: string, email?: string | undefined, role: UserRole, profileImage?: string | undefined, authProvider: AuthProvider, providerId: string, createdAt: any, updatedAt: any } } };

export type ServicesQueryVariables = Exact<{ [key: string]: never; }>;


export type ServicesQuery = { __typename?: 'Query', services: Array<{ __typename?: 'Service', id: string, name: string, description?: string | undefined, basePrice: number, estimatedDays: number, category: string, isActive: boolean, createdAt: any, isPopular: boolean, isBestValue: boolean }> };

export type RecentOrdersInProgressQueryVariables = Exact<{
  input?: InputMaybe<RecentOrdersInput>;
}>;


export type RecentOrdersInProgressQuery = { __typename?: 'Query', recentOrdersInProgress: { __typename?: 'RecentOrdersConnection', hasNextPage: boolean, orders: Array<{ __typename?: 'Order', id: string, customerId: string, salonId?: string | undefined, pickupAddressId: string, status: OrderStatus, totalAmount: number, createdAt: any, updatedAt: any, items: Array<{ __typename?: 'OrderItem', id: string, nameSnapshot: string, priceSnapshot: number, quantity: number, hairType?: string | undefined, hairLength?: string | undefined, notes?: string | undefined, orderItemUrl?: string | undefined, service?: { __typename?: 'Service', id: string, name: string, description?: string | undefined, basePrice: number, estimatedDays: number, category: string, isActive: boolean } | undefined }> }> } };

export type OrderHistoryQueryVariables = Exact<{
  input?: InputMaybe<RecentOrdersInput>;
}>;


export type OrderHistoryQuery = { __typename?: 'Query', orderHistory: { __typename?: 'RecentOrdersConnection', hasNextPage: boolean, endCursor?: string | undefined, orders: Array<{ __typename?: 'Order', id: string, customerId: string, salonId?: string | undefined, pickupAddressId: string, status: OrderStatus, totalAmount: number, createdAt: any, updatedAt: any, items: Array<{ __typename?: 'OrderItem', id: string, nameSnapshot: string, priceSnapshot: number, quantity: number, hairType?: string | undefined, hairLength?: string | undefined, notes?: string | undefined, orderItemUrl?: string | undefined, service?: { __typename?: 'Service', id: string, name: string, description?: string | undefined, basePrice: number, estimatedDays: number, category: string, isActive: boolean } | undefined }> }> } };

export type CreateRevampOrderMutationVariables = Exact<{
  input: CreateRevampOrderInput;
}>;


export type CreateRevampOrderMutation = { __typename?: 'Mutation', createRevampOrder: { __typename?: 'CreateRevampOrderPayload', order: { __typename?: 'Order', id: string, customerId: string, salonId?: string | undefined, pickupAddressId: string, status: OrderStatus, totalAmount: number, createdAt: any, updatedAt: any, customer: { __typename?: 'User', id: string, fullName: string, email?: string | undefined, role: UserRole, profileImage?: string | undefined, authProvider: AuthProvider, providerId: string, createdAt: any, updatedAt: any }, items: Array<{ __typename?: 'OrderItem', id: string, nameSnapshot: string, priceSnapshot: number, quantity: number, hairType?: string | undefined, hairLength?: string | undefined, notes?: string | undefined, orderItemUrl?: string | undefined }> } } };

export type GetOrderQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetOrderQuery = { __typename?: 'Query', order: { __typename?: 'Order', id: string, customerId: string, salonId?: string | undefined, pickupAddressId: string, phoneNumber?: string | undefined, status: OrderStatus, totalAmount: number, requestedReturnDate?: any | undefined, requestedReturnDays?: number | undefined, createdAt: any, updatedAt: any, customer: { __typename?: 'User', id: string, fullName: string, email?: string | undefined, phone?: string | undefined, role: UserRole, profileImage?: string | undefined, authProvider: AuthProvider, providerId: string, createdAt: any, updatedAt: any }, salon?: { __typename?: 'Salon', id: string, userId: string, name: string, address: string, latitude: number, longitude: number, serviceRadiusKm: number, rating?: number | undefined, isVerified: boolean, imageUrl?: string | undefined, createdAt: any } | undefined, pickupAddress: { __typename?: 'Address', id?: string | undefined, userId?: string | undefined, label?: string | undefined, address: string, latitude: number, longitude: number, isDefault: boolean, createdAt?: any | undefined }, items: Array<{ __typename?: 'OrderItem', id: string, orderId: string, itemType: OrderItemType, referenceId: string, serviceId?: string | undefined, nameSnapshot: string, priceSnapshot: number, quantity: number, hairType?: string | undefined, hairLength?: string | undefined, notes?: string | undefined, orderItemUrl?: string | undefined, createdAt: any, service?: { __typename?: 'Service', id: string, name: string, description?: string | undefined, basePrice: number, estimatedDays: number, category: string, isActive: boolean, createdAt: any } | undefined }>, statusEvents: Array<{ __typename?: 'OrderStatusEvent', id: string, orderId: string, status: OrderStatus, message?: string | undefined, actor: StatusActor, createdAt: any }>, payments: Array<{ __typename?: 'Payment', id: string, orderId: string, customerId: string, provider: string, reference: string, amount: number, status: string, paidAt?: any | undefined, createdAt: any }> } };

export type SalonsQueryVariables = Exact<{ [key: string]: never; }>;


export type SalonsQuery = { __typename?: 'Query', salons: Array<{ __typename?: 'Salon', id: string, name: string, address: string, latitude: number, longitude: number, serviceRadiusKm: number, rating?: number | undefined, isVerified: boolean, imageUrl?: string | undefined, isOnline: boolean, onboardingComplete: boolean }> };

export type SalonsNearLocationQueryVariables = Exact<{
  input: SalonsNearLocationInput;
}>;


export type SalonsNearLocationQuery = { __typename?: 'Query', salonsNearLocation: Array<{ __typename?: 'Salon', id: string, name: string, address: string, latitude: number, longitude: number, serviceRadiusKm: number, rating?: number | undefined, isVerified: boolean, imageUrl?: string | undefined, isOnline: boolean, onboardingComplete: boolean }> };

export type MySalonQueryVariables = Exact<{ [key: string]: never; }>;


export type MySalonQuery = { __typename?: 'Query', mySalon?: { __typename?: 'Salon', id: string, name: string, address: string, latitude: number, longitude: number, serviceRadiusKm: number, rating?: number | undefined, isVerified: boolean, imageUrl?: string | undefined, isOnline: boolean, onboardingComplete: boolean, createdAt: any } | undefined };

export type CompleteSalonOnboardingMutationVariables = Exact<{
  input: CompleteSalonOnboardingInput;
}>;


export type CompleteSalonOnboardingMutation = { __typename?: 'Mutation', completeSalonOnboarding: { __typename?: 'Salon', id: string, name: string, address: string, latitude: number, longitude: number, serviceRadiusKm: number, rating?: number | undefined, isVerified: boolean, imageUrl?: string | undefined, isOnline: boolean, onboardingComplete: boolean } };

export type SetSalonOnlineMutationVariables = Exact<{
  isOnline: Scalars['Boolean'];
}>;


export type SetSalonOnlineMutation = { __typename?: 'Mutation', setSalonOnline: { __typename?: 'Salon', id: string, name: string, address: string, latitude: number, longitude: number, serviceRadiusKm: number, rating?: number | undefined, isVerified: boolean, imageUrl?: string | undefined, isOnline: boolean, onboardingComplete: boolean } };

export type GetMyProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyProfileQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, fullName: string, email?: string | undefined, phone?: string | undefined, role: UserRole, profileImage?: string | undefined, authProvider: AuthProvider, providerId: string, notificationsEnabled: boolean, createdAt: any, updatedAt: any, defaultAddress?: { __typename?: 'Address', id?: string | undefined, userId?: string | undefined, label?: string | undefined, address: string, latitude: number, longitude: number, isDefault: boolean, createdAt?: any | undefined } | undefined, officeAddress?: { __typename?: 'Address', id?: string | undefined, userId?: string | undefined, label?: string | undefined, address: string, latitude: number, longitude: number, isDefault: boolean, createdAt?: any | undefined } | undefined } };

export type UpdateProfileMutationVariables = Exact<{
  input: UpdateProfileInput;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'User', id: string, fullName: string, email?: string | undefined, phone?: string | undefined, role: UserRole, profileImage?: string | undefined, authProvider: AuthProvider, providerId: string, notificationsEnabled: boolean, createdAt: any, updatedAt: any, defaultAddress?: { __typename?: 'Address', id?: string | undefined, userId?: string | undefined, label?: string | undefined, address: string, latitude: number, longitude: number, isDefault: boolean, createdAt?: any | undefined } | undefined, officeAddress?: { __typename?: 'Address', id?: string | undefined, userId?: string | undefined, label?: string | undefined, address: string, latitude: number, longitude: number, isDefault: boolean, createdAt?: any | undefined } | undefined } };


export const LoginWithOAuthDocument = gql`
    mutation LoginWithOAuth($input: OAuthInput!) {
  loginWithOAuth(input: $input) {
    token
    user {
      id
      fullName
      email
      role
      profileImage
      authProvider
      providerId
      createdAt
      updatedAt
    }
  }
}
    `;
export type LoginWithOAuthMutationFn = Apollo.MutationFunction<LoginWithOAuthMutation, LoginWithOAuthMutationVariables>;

/**
 * __useLoginWithOAuthMutation__
 *
 * To run a mutation, you first call `useLoginWithOAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginWithOAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginWithOAuthMutation, { data, loading, error }] = useLoginWithOAuthMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginWithOAuthMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginWithOAuthMutation, LoginWithOAuthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<LoginWithOAuthMutation, LoginWithOAuthMutationVariables>(LoginWithOAuthDocument, options);
      }
export type LoginWithOAuthMutationHookResult = ReturnType<typeof useLoginWithOAuthMutation>;
export type LoginWithOAuthMutationResult = Apollo.MutationResult<LoginWithOAuthMutation>;
export type LoginWithOAuthMutationOptions = Apollo.BaseMutationOptions<LoginWithOAuthMutation, LoginWithOAuthMutationVariables>;
export const RegisterWithEmailDocument = gql`
    mutation RegisterWithEmail($input: RegisterWithEmailInput!) {
  registerWithEmail(input: $input) {
    token
    user {
      id
      fullName
      email
      role
      profileImage
      authProvider
      providerId
      createdAt
      updatedAt
    }
  }
}
    `;
export type RegisterWithEmailMutationFn = Apollo.MutationFunction<RegisterWithEmailMutation, RegisterWithEmailMutationVariables>;

/**
 * __useRegisterWithEmailMutation__
 *
 * To run a mutation, you first call `useRegisterWithEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterWithEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerWithEmailMutation, { data, loading, error }] = useRegisterWithEmailMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterWithEmailMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterWithEmailMutation, RegisterWithEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RegisterWithEmailMutation, RegisterWithEmailMutationVariables>(RegisterWithEmailDocument, options);
      }
export type RegisterWithEmailMutationHookResult = ReturnType<typeof useRegisterWithEmailMutation>;
export type RegisterWithEmailMutationResult = Apollo.MutationResult<RegisterWithEmailMutation>;
export type RegisterWithEmailMutationOptions = Apollo.BaseMutationOptions<RegisterWithEmailMutation, RegisterWithEmailMutationVariables>;
export const LoginWithEmailDocument = gql`
    mutation LoginWithEmail($input: LoginWithEmailInput!) {
  loginWithEmail(input: $input) {
    token
    user {
      id
      fullName
      email
      role
      profileImage
      authProvider
      providerId
      createdAt
      updatedAt
    }
  }
}
    `;
export type LoginWithEmailMutationFn = Apollo.MutationFunction<LoginWithEmailMutation, LoginWithEmailMutationVariables>;

/**
 * __useLoginWithEmailMutation__
 *
 * To run a mutation, you first call `useLoginWithEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginWithEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginWithEmailMutation, { data, loading, error }] = useLoginWithEmailMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginWithEmailMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginWithEmailMutation, LoginWithEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<LoginWithEmailMutation, LoginWithEmailMutationVariables>(LoginWithEmailDocument, options);
      }
export type LoginWithEmailMutationHookResult = ReturnType<typeof useLoginWithEmailMutation>;
export type LoginWithEmailMutationResult = Apollo.MutationResult<LoginWithEmailMutation>;
export type LoginWithEmailMutationOptions = Apollo.BaseMutationOptions<LoginWithEmailMutation, LoginWithEmailMutationVariables>;
export const ServicesDocument = gql`
    query Services {
  services {
    id
    name
    description
    basePrice
    estimatedDays
    category
    isActive
    createdAt
    isPopular
    isBestValue
  }
}
    `;

/**
 * __useServicesQuery__
 *
 * To run a query within a React component, call `useServicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useServicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useServicesQuery({
 *   variables: {
 *   },
 * });
 */
export function useServicesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ServicesQuery, ServicesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ServicesQuery, ServicesQueryVariables>(ServicesDocument, options);
      }
export function useServicesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ServicesQuery, ServicesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ServicesQuery, ServicesQueryVariables>(ServicesDocument, options);
        }
export type ServicesQueryHookResult = ReturnType<typeof useServicesQuery>;
export type ServicesLazyQueryHookResult = ReturnType<typeof useServicesLazyQuery>;
export type ServicesQueryResult = Apollo.QueryResult<ServicesQuery, ServicesQueryVariables>;
export const RecentOrdersInProgressDocument = gql`
    query RecentOrdersInProgress($input: RecentOrdersInput) {
  recentOrdersInProgress(input: $input) {
    orders {
      id
      customerId
      salonId
      pickupAddressId
      status
      totalAmount
      createdAt
      updatedAt
      items {
        id
        nameSnapshot
        priceSnapshot
        quantity
        hairType
        hairLength
        service {
          id
          name
          description
          basePrice
          estimatedDays
          category
          isActive
        }
        notes
        orderItemUrl
      }
    }
    hasNextPage
  }
}
    `;

/**
 * __useRecentOrdersInProgressQuery__
 *
 * To run a query within a React component, call `useRecentOrdersInProgressQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecentOrdersInProgressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecentOrdersInProgressQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRecentOrdersInProgressQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RecentOrdersInProgressQuery, RecentOrdersInProgressQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<RecentOrdersInProgressQuery, RecentOrdersInProgressQueryVariables>(RecentOrdersInProgressDocument, options);
      }
export function useRecentOrdersInProgressLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RecentOrdersInProgressQuery, RecentOrdersInProgressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<RecentOrdersInProgressQuery, RecentOrdersInProgressQueryVariables>(RecentOrdersInProgressDocument, options);
        }
export type RecentOrdersInProgressQueryHookResult = ReturnType<typeof useRecentOrdersInProgressQuery>;
export type RecentOrdersInProgressLazyQueryHookResult = ReturnType<typeof useRecentOrdersInProgressLazyQuery>;
export type RecentOrdersInProgressQueryResult = Apollo.QueryResult<RecentOrdersInProgressQuery, RecentOrdersInProgressQueryVariables>;
export const OrderHistoryDocument = gql`
    query OrderHistory($input: RecentOrdersInput) {
  orderHistory(input: $input) {
    orders {
      id
      customerId
      salonId
      pickupAddressId
      status
      totalAmount
      createdAt
      updatedAt
      items {
        id
        nameSnapshot
        priceSnapshot
        quantity
        hairType
        hairLength
        service {
          id
          name
          description
          basePrice
          estimatedDays
          category
          isActive
        }
        notes
        orderItemUrl
      }
    }
    hasNextPage
    endCursor
  }
}
    `;

/**
 * __useOrderHistoryQuery__
 *
 * To run a query within a React component, call `useOrderHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderHistoryQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useOrderHistoryQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<OrderHistoryQuery, OrderHistoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<OrderHistoryQuery, OrderHistoryQueryVariables>(OrderHistoryDocument, options);
      }
export function useOrderHistoryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<OrderHistoryQuery, OrderHistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<OrderHistoryQuery, OrderHistoryQueryVariables>(OrderHistoryDocument, options);
        }
export type OrderHistoryQueryHookResult = ReturnType<typeof useOrderHistoryQuery>;
export type OrderHistoryLazyQueryHookResult = ReturnType<typeof useOrderHistoryLazyQuery>;
export type OrderHistoryQueryResult = Apollo.QueryResult<OrderHistoryQuery, OrderHistoryQueryVariables>;
export const CreateRevampOrderDocument = gql`
    mutation CreateRevampOrder($input: CreateRevampOrderInput!) {
  createRevampOrder(input: $input) {
    order {
      id
      customerId
      salonId
      pickupAddressId
      status
      totalAmount
      createdAt
      updatedAt
      customer {
        id
        fullName
        email
        role
        profileImage
        authProvider
        providerId
        createdAt
        updatedAt
      }
      items {
        id
        nameSnapshot
        priceSnapshot
        quantity
        hairType
        hairLength
        notes
        orderItemUrl
      }
    }
  }
}
    `;
export type CreateRevampOrderMutationFn = Apollo.MutationFunction<CreateRevampOrderMutation, CreateRevampOrderMutationVariables>;

/**
 * __useCreateRevampOrderMutation__
 *
 * To run a mutation, you first call `useCreateRevampOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRevampOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRevampOrderMutation, { data, loading, error }] = useCreateRevampOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRevampOrderMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateRevampOrderMutation, CreateRevampOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateRevampOrderMutation, CreateRevampOrderMutationVariables>(CreateRevampOrderDocument, options);
      }
export type CreateRevampOrderMutationHookResult = ReturnType<typeof useCreateRevampOrderMutation>;
export type CreateRevampOrderMutationResult = Apollo.MutationResult<CreateRevampOrderMutation>;
export type CreateRevampOrderMutationOptions = Apollo.BaseMutationOptions<CreateRevampOrderMutation, CreateRevampOrderMutationVariables>;
export const GetOrderDocument = gql`
    query GetOrder($id: ID!) {
  order(id: $id) {
    id
    customerId
    salonId
    pickupAddressId
    phoneNumber
    status
    totalAmount
    requestedReturnDate
    requestedReturnDays
    createdAt
    updatedAt
    customer {
      id
      fullName
      email
      phone
      role
      profileImage
      authProvider
      providerId
      createdAt
      updatedAt
    }
    salon {
      id
      userId
      name
      address
      latitude
      longitude
      serviceRadiusKm
      rating
      isVerified
      imageUrl
      createdAt
    }
    pickupAddress {
      id
      userId
      label
      address
      latitude
      longitude
      isDefault
      createdAt
    }
    items {
      id
      orderId
      itemType
      referenceId
      serviceId
      nameSnapshot
      priceSnapshot
      quantity
      hairType
      hairLength
      notes
      orderItemUrl
      createdAt
      service {
        id
        name
        description
        basePrice
        estimatedDays
        category
        isActive
        createdAt
      }
    }
    statusEvents {
      id
      orderId
      status
      message
      actor
      createdAt
    }
    payments {
      id
      orderId
      customerId
      provider
      reference
      amount
      status
      paidAt
      createdAt
    }
  }
}
    `;

/**
 * __useGetOrderQuery__
 *
 * To run a query within a React component, call `useGetOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrderQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOrderQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetOrderQuery, GetOrderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, options);
      }
export function useGetOrderLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetOrderQuery, GetOrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, options);
        }
export type GetOrderQueryHookResult = ReturnType<typeof useGetOrderQuery>;
export type GetOrderLazyQueryHookResult = ReturnType<typeof useGetOrderLazyQuery>;
export type GetOrderQueryResult = Apollo.QueryResult<GetOrderQuery, GetOrderQueryVariables>;
export const SalonsDocument = gql`
    query Salons {
  salons {
    id
    name
    address
    latitude
    longitude
    serviceRadiusKm
    rating
    isVerified
    imageUrl
    isOnline
    onboardingComplete
  }
}
    `;

/**
 * __useSalonsQuery__
 *
 * To run a query within a React component, call `useSalonsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSalonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSalonsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSalonsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SalonsQuery, SalonsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<SalonsQuery, SalonsQueryVariables>(SalonsDocument, options);
      }
export function useSalonsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SalonsQuery, SalonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<SalonsQuery, SalonsQueryVariables>(SalonsDocument, options);
        }
export type SalonsQueryHookResult = ReturnType<typeof useSalonsQuery>;
export type SalonsLazyQueryHookResult = ReturnType<typeof useSalonsLazyQuery>;
export type SalonsQueryResult = Apollo.QueryResult<SalonsQuery, SalonsQueryVariables>;
export const SalonsNearLocationDocument = gql`
    query SalonsNearLocation($input: SalonsNearLocationInput!) {
  salonsNearLocation(input: $input) {
    id
    name
    address
    latitude
    longitude
    serviceRadiusKm
    rating
    isVerified
    imageUrl
    isOnline
    onboardingComplete
  }
}
    `;

/**
 * __useSalonsNearLocationQuery__
 *
 * To run a query within a React component, call `useSalonsNearLocationQuery` and pass it any options that fit your needs.
 * When your component renders, `useSalonsNearLocationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSalonsNearLocationQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSalonsNearLocationQuery(baseOptions: ApolloReactHooks.QueryHookOptions<SalonsNearLocationQuery, SalonsNearLocationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<SalonsNearLocationQuery, SalonsNearLocationQueryVariables>(SalonsNearLocationDocument, options);
      }
export function useSalonsNearLocationLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SalonsNearLocationQuery, SalonsNearLocationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<SalonsNearLocationQuery, SalonsNearLocationQueryVariables>(SalonsNearLocationDocument, options);
        }
export type SalonsNearLocationQueryHookResult = ReturnType<typeof useSalonsNearLocationQuery>;
export type SalonsNearLocationLazyQueryHookResult = ReturnType<typeof useSalonsNearLocationLazyQuery>;
export type SalonsNearLocationQueryResult = Apollo.QueryResult<SalonsNearLocationQuery, SalonsNearLocationQueryVariables>;
export const MySalonDocument = gql`
    query MySalon {
  mySalon {
    id
    name
    address
    latitude
    longitude
    serviceRadiusKm
    rating
    isVerified
    imageUrl
    isOnline
    onboardingComplete
    createdAt
  }
}
    `;

/**
 * __useMySalonQuery__
 *
 * To run a query within a React component, call `useMySalonQuery` and pass it any options that fit your needs.
 * When your component renders, `useMySalonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMySalonQuery({
 *   variables: {
 *   },
 * });
 */
export function useMySalonQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MySalonQuery, MySalonQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<MySalonQuery, MySalonQueryVariables>(MySalonDocument, options);
      }
export function useMySalonLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MySalonQuery, MySalonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<MySalonQuery, MySalonQueryVariables>(MySalonDocument, options);
        }
export type MySalonQueryHookResult = ReturnType<typeof useMySalonQuery>;
export type MySalonLazyQueryHookResult = ReturnType<typeof useMySalonLazyQuery>;
export type MySalonQueryResult = Apollo.QueryResult<MySalonQuery, MySalonQueryVariables>;
export const CompleteSalonOnboardingDocument = gql`
    mutation CompleteSalonOnboarding($input: CompleteSalonOnboardingInput!) {
  completeSalonOnboarding(input: $input) {
    id
    name
    address
    latitude
    longitude
    serviceRadiusKm
    rating
    isVerified
    imageUrl
    isOnline
    onboardingComplete
  }
}
    `;
export type CompleteSalonOnboardingMutationFn = Apollo.MutationFunction<CompleteSalonOnboardingMutation, CompleteSalonOnboardingMutationVariables>;

/**
 * __useCompleteSalonOnboardingMutation__
 *
 * To run a mutation, you first call `useCompleteSalonOnboardingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompleteSalonOnboardingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [completeSalonOnboardingMutation, { data, loading, error }] = useCompleteSalonOnboardingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCompleteSalonOnboardingMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CompleteSalonOnboardingMutation, CompleteSalonOnboardingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CompleteSalonOnboardingMutation, CompleteSalonOnboardingMutationVariables>(CompleteSalonOnboardingDocument, options);
      }
export type CompleteSalonOnboardingMutationHookResult = ReturnType<typeof useCompleteSalonOnboardingMutation>;
export type CompleteSalonOnboardingMutationResult = Apollo.MutationResult<CompleteSalonOnboardingMutation>;
export type CompleteSalonOnboardingMutationOptions = Apollo.BaseMutationOptions<CompleteSalonOnboardingMutation, CompleteSalonOnboardingMutationVariables>;
export const SetSalonOnlineDocument = gql`
    mutation SetSalonOnline($isOnline: Boolean!) {
  setSalonOnline(isOnline: $isOnline) {
    id
    name
    address
    latitude
    longitude
    serviceRadiusKm
    rating
    isVerified
    imageUrl
    isOnline
    onboardingComplete
  }
}
    `;
export type SetSalonOnlineMutationFn = Apollo.MutationFunction<SetSalonOnlineMutation, SetSalonOnlineMutationVariables>;

/**
 * __useSetSalonOnlineMutation__
 *
 * To run a mutation, you first call `useSetSalonOnlineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetSalonOnlineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setSalonOnlineMutation, { data, loading, error }] = useSetSalonOnlineMutation({
 *   variables: {
 *      isOnline: // value for 'isOnline'
 *   },
 * });
 */
export function useSetSalonOnlineMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetSalonOnlineMutation, SetSalonOnlineMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SetSalonOnlineMutation, SetSalonOnlineMutationVariables>(SetSalonOnlineDocument, options);
      }
export type SetSalonOnlineMutationHookResult = ReturnType<typeof useSetSalonOnlineMutation>;
export type SetSalonOnlineMutationResult = Apollo.MutationResult<SetSalonOnlineMutation>;
export type SetSalonOnlineMutationOptions = Apollo.BaseMutationOptions<SetSalonOnlineMutation, SetSalonOnlineMutationVariables>;
export const GetMyProfileDocument = gql`
    query GetMyProfile {
  me {
    id
    fullName
    email
    phone
    role
    profileImage
    authProvider
    providerId
    notificationsEnabled
    createdAt
    updatedAt
    defaultAddress {
      id
      userId
      label
      address
      latitude
      longitude
      isDefault
      createdAt
    }
    officeAddress {
      id
      userId
      label
      address
      latitude
      longitude
      isDefault
      createdAt
    }
  }
}
    `;

/**
 * __useGetMyProfileQuery__
 *
 * To run a query within a React component, call `useGetMyProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyProfileQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMyProfileQuery, GetMyProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetMyProfileQuery, GetMyProfileQueryVariables>(GetMyProfileDocument, options);
      }
export function useGetMyProfileLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMyProfileQuery, GetMyProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetMyProfileQuery, GetMyProfileQueryVariables>(GetMyProfileDocument, options);
        }
export type GetMyProfileQueryHookResult = ReturnType<typeof useGetMyProfileQuery>;
export type GetMyProfileLazyQueryHookResult = ReturnType<typeof useGetMyProfileLazyQuery>;
export type GetMyProfileQueryResult = Apollo.QueryResult<GetMyProfileQuery, GetMyProfileQueryVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($input: UpdateProfileInput!) {
  updateProfile(input: $input) {
    id
    fullName
    email
    phone
    role
    profileImage
    authProvider
    providerId
    notificationsEnabled
    createdAt
    updatedAt
    defaultAddress {
      id
      userId
      label
      address
      latitude
      longitude
      isDefault
      createdAt
    }
    officeAddress {
      id
      userId
      label
      address
      latitude
      longitude
      isDefault
      createdAt
    }
  }
}
    `;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;