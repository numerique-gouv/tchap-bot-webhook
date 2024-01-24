const messageTreatmentStatuses = [
    'irrelevant',
    'error',
    'unauthorized',
    'pending',
    'handled',
] as const;

type messageTreatmentStatusType = (typeof messageTreatmentStatuses)[number];

type parsedCommandType =
    | {
          kind: 'scalingo:create';
          parameters: {
              appName: string;
              shouldBeSecNumCloud: boolean;
              collaboratorToInvite: string;
          };
      }
    | {
          kind: 'scalingo:rename';
          parameters: {
              previousAppName: string;
              isSecNumCloud: boolean;
              newAppName: string;
          };
      };

type commandKindType = parsedCommandType['kind'];
export type { messageTreatmentStatusType, parsedCommandType, commandKindType };
export { messageTreatmentStatuses };
