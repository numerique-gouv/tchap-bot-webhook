type parsedCommandType = {
    kind: 'scalingo:create';
    appName: string;
    shouldBeSecNumCloud: boolean;
    collaboratorToInvite: string;
};

function parseCommand(command: string): parsedCommandType {
    const [commandName, ...parameters] = command.split(' ').filter(Boolean);
    switch (commandName) {
        case 'scalingo:create':
            const parsedCommand: parsedCommandType = {
                kind: 'scalingo:create',
                appName: '',
                shouldBeSecNumCloud: false,
                collaboratorToInvite: '',
            };
            for (const parameter of parameters) {
                const [key, value] = parameter.split(':');
                switch (key) {
                    case 'appName':
                        parsedCommand['appName'] = value;
                        break;
                    case 'collaboratorToInvite':
                        parsedCommand['collaboratorToInvite'] = value;
                        break;
                    case 'shouldBeSecNumCloud':
                        parsedCommand['shouldBeSecNumCloud'] = value === 'true';
                        break;
                    default:
                        console.error(`Unknown parameter : ${key}:${value}`);
                }
            }

            return parsedCommand;
        default:
            throw new Error(`Unknown command ${command}`);
    }
}

export { parseCommand };
