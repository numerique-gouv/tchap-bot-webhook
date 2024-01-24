import { parsedCommandType } from './types';

function parseCommand(command: string): parsedCommandType {
    const [commandName, ...parameters] = command.split(' ').filter(Boolean);
    let parsedCommand: parsedCommandType | undefined;
    switch (commandName) {
        case 'scalingo:create':
            parsedCommand = {
                kind: 'scalingo:create',
                parameters: {
                    appName: '',
                    shouldBeSecNumCloud: false,
                    collaboratorToInvite: '',
                },
            };
            for (const parameter of parameters) {
                const [key, value] = parameter.split(':');
                switch (key) {
                    case 'appName':
                        parsedCommand.parameters['appName'] = value;
                        break;
                    case 'collaboratorToInvite':
                        parsedCommand.parameters['collaboratorToInvite'] = value;
                        break;
                    case 'shouldBeSecNumCloud':
                        parsedCommand.parameters['shouldBeSecNumCloud'] = value === 'true';
                        break;
                    default:
                        console.error(`Unknown parameter : ${key}:${value}`);
                }
            }
            break;
        case 'scalingo:rename':
            parsedCommand = {
                kind: 'scalingo:rename',
                parameters: {
                    previousAppName: '',
                    isSecNumCloud: false,
                    newAppName: '',
                },
            };
            for (const parameter of parameters) {
                const [key, value] = parameter.split(':');
                switch (key) {
                    case 'previousAppName':
                        parsedCommand.parameters['previousAppName'] = value;
                        break;
                    case 'newAppName':
                        parsedCommand.parameters['newAppName'] = value;
                        break;
                    case 'isSecNumCloud':
                        parsedCommand.parameters['isSecNumCloud'] = value === 'true';
                        break;
                    default:
                        console.error(`Unknown parameter : ${key}:${value}`);
                }
            }
            break;
        default:
            throw new Error(`Unknown command ${command}`);
    }
    return parsedCommand;
}

export { parseCommand };
