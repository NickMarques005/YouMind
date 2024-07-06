import { RouteProp, useRoute } from '@react-navigation/native';

export type GenericRouteParams<T = {}> = RouteProp<Record<string, object>, string> & { params?: T };



