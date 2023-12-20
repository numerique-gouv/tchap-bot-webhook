import { parseCommand } from './parseCommand';

describe('parseCommand', () => {
    it('should parse the command if scalingo:create', () => {
        const command =
            'scalingo:create appName:app-name shouldBeSecNumCloud:true collaboratorToInvite:user@beta.gouv.fr';

        const parsedCommand = parseCommand(command);

        expect(parsedCommand).toEqual({
            kind: 'scalingo:create',
            appName: 'app-name',
            shouldBeSecNumCloud: true,
            collaboratorToInvite: 'user@beta.gouv.fr',
        });
    });
});
