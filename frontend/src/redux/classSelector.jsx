import { createSelector } from "reselect";

const classId = (state) => state['class-data'].classId;


export const selectClassId = createSelector([classId], (classId1) => {
    return classId1;
});