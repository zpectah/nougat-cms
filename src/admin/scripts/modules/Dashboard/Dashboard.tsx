import React, { useEffect } from 'react';
import { Stack } from '@mui/material';

import config from '../../config';
import { useMeta, useToasts, useAnnouncementBanner } from '../../hooks';
import { TOAST_DEFAULT_TIMEOUT } from '../../const';
import { Button, CloseButton, Card } from '../../components';

const Dashboard = () => {
    const { meta } = useMeta();
    const { createToast } = useToasts();
    const { addBanner } = useAnnouncementBanner();

    useEffect(() => {
        if (meta && meta.version) {
            console.log('config', config);
            console.log('meta', meta);
        }
    }, [ meta ]);

    return (
        <>
            Dashboard view
            <p>
                Odio leo rhoncus, ligula urna mauris nunc ut enim et tincidunt rhoncus at sem, dolor ut tellus sed porttitor dui vel. Ullamcorper varius, consectetur ornare id consequat id dolor id lacinia, venenatis a dui vel dolor auctor. Mauris ipsum, nibh maximus egestas consequat congue nulla cras dictum nec placerat, ut venenatis elit posuere nibh maximus. Ut venenatis placerat, sit amet elit libero sed suspendisse libero dui duis id, quis ut hendrerit donec dolor quis. Curabitur sem, metus vestibulum interdum commodo hendrerit in donec cursus, luctus mauris eu elementum luctus maximus. Dolor quis a lacinia, adipiscing et nullam fermentum imperdiet convallis nam, et condimentum pellentesque neque.
            </p>
            <p>
                Odio leo rhoncus, ligula urna mauris nunc ut enim et tincidunt rhoncus at sem, dolor ut tellus sed porttitor dui vel. Ullamcorper varius, consectetur ornare id consequat id dolor id lacinia, venenatis a dui vel dolor auctor. Mauris ipsum, nibh maximus egestas consequat congue nulla cras dictum nec placerat, ut venenatis elit posuere nibh maximus. Ut venenatis placerat, sit amet elit libero sed suspendisse libero dui duis id, quis ut hendrerit donec dolor quis. Curabitur sem, metus vestibulum interdum commodo hendrerit in donec cursus, luctus mauris eu elementum luctus maximus. Dolor quis a lacinia, adipiscing et nullam fermentum imperdiet convallis nam, et condimentum pellentesque neque.
            </p>
            <p>
                Odio leo rhoncus, ligula urna mauris nunc ut enim et tincidunt rhoncus at sem, dolor ut tellus sed porttitor dui vel. Ullamcorper varius, consectetur ornare id consequat id dolor id lacinia, venenatis a dui vel dolor auctor. Mauris ipsum, nibh maximus egestas consequat congue nulla cras dictum nec placerat, ut venenatis elit posuere nibh maximus. Ut venenatis placerat, sit amet elit libero sed suspendisse libero dui duis id, quis ut hendrerit donec dolor quis. Curabitur sem, metus vestibulum interdum commodo hendrerit in donec cursus, luctus mauris eu elementum luctus maximus. Dolor quis a lacinia, adipiscing et nullam fermentum imperdiet convallis nam, et condimentum pellentesque neque.
            </p>
            <p>
                Odio leo rhoncus, ligula urna mauris nunc ut enim et tincidunt rhoncus at sem, dolor ut tellus sed porttitor dui vel. Ullamcorper varius, consectetur ornare id consequat id dolor id lacinia, venenatis a dui vel dolor auctor. Mauris ipsum, nibh maximus egestas consequat congue nulla cras dictum nec placerat, ut venenatis elit posuere nibh maximus. Ut venenatis placerat, sit amet elit libero sed suspendisse libero dui duis id, quis ut hendrerit donec dolor quis. Curabitur sem, metus vestibulum interdum commodo hendrerit in donec cursus, luctus mauris eu elementum luctus maximus. Dolor quis a lacinia, adipiscing et nullam fermentum imperdiet convallis nam, et condimentum pellentesque neque.
            </p>
            <p>
                Odio leo rhoncus, ligula urna mauris nunc ut enim et tincidunt rhoncus at sem, dolor ut tellus sed porttitor dui vel. Ullamcorper varius, consectetur ornare id consequat id dolor id lacinia, venenatis a dui vel dolor auctor. Mauris ipsum, nibh maximus egestas consequat congue nulla cras dictum nec placerat, ut venenatis elit posuere nibh maximus. Ut venenatis placerat, sit amet elit libero sed suspendisse libero dui duis id, quis ut hendrerit donec dolor quis. Curabitur sem, metus vestibulum interdum commodo hendrerit in donec cursus, luctus mauris eu elementum luctus maximus. Dolor quis a lacinia, adipiscing et nullam fermentum imperdiet convallis nam, et condimentum pellentesque neque.
            </p>
            <br />
            <div>
                <Button
                    secondary
                    onClick={() => createToast({
                        title: 'Test toast item title',
                        context: 'info',
                    })}
                >
                    add toast
                </Button>
                <Button
                    secondary
                    onClick={() => createToast({
                        title: 'Test toast item title',
                        context: 'success',
                        timeout: TOAST_DEFAULT_TIMEOUT,
                    })}
                >
                    add toast & timeout
                </Button>
                <br />
                <Button
                    secondary
                    onClick={() => addBanner(
                        <>Some ReactNode content banner ...</>
                    )}
                >
                    add announcement banner
                </Button>
            </div>
            <br />
            <Button primary>
                Button
            </Button>
            <br />
            <CloseButton
                tooltip="Some demo tooltip on button"
            />

            <br />

            <Stack direction="row" spacing={2}>

                <Card>
                    <>
                        Card content ...
                    </>
                </Card>

                <Card
                    title="Some card title"
                    dividers
                >
                    <>
                        Card content ...
                    </>
                </Card>

                <Card
                    title="Some card title"
                    subtitle="some card subtitle"
                >
                    <>
                        Card content ...
                    </>
                </Card>

                <Card
                    title="Some card title"
                    subtitle="some card subtitle"
                    collapsible
                    dividers
                    actions={
                        <span>some actions</span>
                    }
                >
                    <>
                        Card content ...
                    </>
                </Card>

            </Stack>

        </>
    );
};

export default Dashboard;
