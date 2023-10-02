import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Toaster } from '../components/Toaster';
import { api } from '../service/api';

function AddUrl() {
    const [urls, setUrls] = useState('');
    const [toaster, setToaster] = React.useState({
        variant: 'success' as 'success' | 'error',
        text: '',
    });
    const [room, setRoom] = useState('');
    return (
        <div>
            <ol>
                <li>
                    Renseignez ici les URLs que vous souhaitez monitorer, séparées par des virgules
                    :{' '}
                    <TextField
                        name="urls"
                        value={urls}
                        onChange={(event) => setUrls(event.target.value)}
                    />
                </li>
                <li>
                    Créez un nouveau salon de type "Forum" dans sur{' '}
                    <a target="_blank" rel="noreferrer noopener" href="https://www.tchap.gouv.fr/">
                        https://www.tchap.gouv.fr/
                    </a>
                </li>
                <li>
                    Invitez dans ce salon l'utilisateur <b>Bot-Updown Io [Beta]</b>{' '}
                    (@bot-updown.io-beta.gouv.fr:agent.dinum.tchap.gouv.fr)
                </li>
                <li>
                    Renseignez ici l'URL du salon (exemple :{' '}
                    <i>
                        https://www.tchap.gouv.fr/#/room/!aBcDeFgHiJkLmNoPq:agent.dinum.tchap.gouv.fr
                    </i>
                    ):{' '}
                    <TextField
                        name="room"
                        value={room}
                        onChange={(event) => setRoom(event.target.value)}
                    />
                </li>
                <li>
                    Validez ici :{' '}
                    <Button variant="contained" onClick={handleSubmit}>
                        Envoyer la demande
                    </Button>
                </li>
            </ol>
            <Toaster
                isOpen={!!toaster.text}
                text={toaster.text}
                variant={toaster.variant}
                onClose={() => setToaster({ variant: 'success', text: '' })}
            />
        </div>
    );

    async function handleSubmit() {
        const response = await api.sendRequestUrlMonitoring({
            urls,
            room,
        });
        if (response.ok) {
            setRoom('');
            setUrls('');
            setToaster({ variant: 'success', text: 'La demande a bien été envoyée.' });
        } else {
            console.warn(response.statusText);
            setToaster({ variant: 'error', text: "L'envoi de la demande a échoué" });
        }
    }
}

export { AddUrl };
