import { createSlice } from '@reduxjs/toolkit';

const enrollmentSlice = createSlice({
    name: 'enrollment',
    initialState: { enrolledModules: [] },
    reducers: {
        // add a module if it isn't already enrolled
        enrollModule(state, action) {
            const alreadyIn = state.enrolledModules.find(m => m.id === action.payload.id);
            if (!alreadyIn) {
                state.enrolledModules.push(action.payload);
            }
        },
        // remove a module by id
        unenrollModule(state, action) {
            state.enrolledModules = state.enrolledModules.filter(m => m.id !== action.payload);
        },
    },
});

export const { enrollModule, unenrollModule } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;
