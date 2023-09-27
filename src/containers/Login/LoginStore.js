import { useLocalObservable } from 'mobx-react-lite';
import StoreAction from '@store/StoreAction';
import { callLoginUser } from '@api';

const initialState = {};

const LoginStore = () =>
    useLocalObservable(() => ({
        /* observables */
        ...initialState,
        ...StoreAction(initialState),
    }));

export default LoginStore;
