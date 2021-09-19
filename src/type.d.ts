interface userState {
  permissions: Array<string>;
}

type userAction = {
  type: string;
  user: userState;
};

type DispatchType = (args: userAction) => userAction;
interface loadingState {
  loading: boolean;
}
type loadingAction = {
  type: string;
  loading: loadingState;
};
type currentAction = {
  type: string;
  current: currentState;
};
interface applicationState {
  current: currentState;
  user: userState;
  loading: loadingState;
}
interface bookState {
  id?: string;
  body?: string;
  header?: string;
  status?: number;
  subtitle?: string;
  title?: string;
  warning_message?: string;
}
interface characterState {
  id?: string;
  name?: string;
  gender?: string;
  color?: string;
  ethnicity?: string;
  bio?: string;
  date_of_birth?: string;
  images?: {
    id: string;
    imageUrl: string;
    key: string;
    localImageUrl?: string;
  }[];
  category?: { id: string; title: string } | null;
}
interface blogState {}
interface currentState {
  book?: bookState;
  character?: characterState;
  blogState?: blogState;
}
