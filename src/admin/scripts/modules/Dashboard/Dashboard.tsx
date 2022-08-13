import React, { useEffect } from 'react';

import config from '../../config';
import { useMeta, useToasts, useAnnouncementBanner } from '../../hooks';
import { TOAST_DEFAULT_TIMEOUT } from '../../const';
import { Button, CloseButton } from '../../components';

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
        </>
    );
};

export default Dashboard;
