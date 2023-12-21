const messageTreatmentStatuses = [
    'irrelevant',
    'error',
    'unauthorized',
    'pending',
    'handled',
] as const;

type messageTreatmentStatusType = (typeof messageTreatmentStatuses)[number];

export type { messageTreatmentStatusType };
export { messageTreatmentStatuses };
