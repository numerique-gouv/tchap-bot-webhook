import { parseCommand } from './parseCommand';

describe('parseCommand', () => {
    it('should parse the command if scalingo:create', () => {
        const command =
            'scalingo:create appName:app-name isSecNumCloud:true collaboratorToInvite:user@beta.gouv.fr';

        const parsedCommand = parseCommand(command);

        expect(parsedCommand).toEqual({
            kind: 'scalingo:create',
            parameters: {
                appName: 'app-name',
                shouldBeSecNumCloud: true,
                collaboratorToInvite: 'user@beta.gouv.fr',
            },
        });
    });

    it('should parse the command if scalingo:rename', () => {
        const command =
            'scalingo:rename previousAppName:previous-app-name isSecNumCloud:true newAppName:new-app-name';

        const parsedCommand = parseCommand(command);

        expect(parsedCommand).toEqual({
            kind: 'scalingo:rename',
            parameters: {
                previousAppName: 'previous-app-name',
                isSecNumCloud: true,
                newAppName: 'new-app-name',
            },
        });
    });
});
