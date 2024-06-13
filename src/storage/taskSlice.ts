import { makeNormalizedSlice } from 'normalized-reducer';

export const schema = {
    task: {}
};

export const {
    reducer: taskReducer,
    actionCreators: taskActionCreators,
    selectors: taskSelectors,
} = makeNormalizedSlice(schema);