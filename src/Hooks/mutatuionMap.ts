// src/hooks/useCreateEntityMutation.ts
import {
    useCreateSubdivisionMutation,
    useCreatePositionMutation,
    useCreateProjectTypeMutation,
    useCreateAbsenceReasonMutation
} from "../services/CreateSelectionService";
import { EntityType } from "../types/Selection";

export const useCreateEntityMutation = (entityType: EntityType) => {
    const mutationMap = {
        Subdivision: useCreateSubdivisionMutation,
        Position: useCreatePositionMutation,
        ProjectType: useCreateProjectTypeMutation,
        AbsenceReason: useCreateAbsenceReasonMutation,
    };

    return mutationMap[entityType]();
};
