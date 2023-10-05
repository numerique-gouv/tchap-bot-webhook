import { Alert } from './Alert.entity';

type updownIoEventType = Array<{
    description: string;
    check: { url: string };
}>;

type genericEventType = {
    message: string;
    roomId: string;
};

type alertDtoType = Pick<Alert, 'roomId' | 'url'>;

export type { updownIoEventType, alertDtoType, genericEventType };
