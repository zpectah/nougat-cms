import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Grid } from '@mui/material';

import {
    ViewHeading,
    List,
    Chip,
    Card,
} from '../../components';

const Profile = () => {
    const { t } = useTranslation([ 'views' ]);

    return (
        <>
            <ViewHeading
                title={t('views:Profile.title')}
                subtitle={t('views:Profile.subtitle')}
                withBreadcrumbs
            />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                }}
            >
                <Grid
                    container
                    spacing={2}
                >
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={5}
                        lg={4}
                    >
                        <Box
                            sx={{
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <img
                                src="https://avataaars.io/?avatarStyle=Circle&topType=WinterHat2&accessoriesType=Sunglasses&hatColor=Pink&facialHairType=BeardMedium&facialHairColor=Red&clotheType=ShirtScoopNeck&clotheColor=Blue01&eyeType=Dizzy&eyebrowType=AngryNatural&mouthType=Default&skinColor=Yellow"
                                alt="avatar"
                                style={{
                                    maxWidth: '75%',
                                    height: 'auto',
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={7}
                        lg={8}
                    >
                        <Box
                            sx={{
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                            }}
                        >
                            <List
                                items={[
                                    { primary: <>Name: <b>John Doe</b></> },
                                    { primary: <>Email: <b>john.doe@gooogle.com</b></> },
                                    { primary: <>Role: <Chip label="Administrator" size="small" /></> },
                                    { primary: <>Group: <Chip label="Company" size="small" /></> },
                                ]}
                            />
                        </Box>
                    </Grid>
                </Grid>
                <Card>
                    <p>
                        Odio leo rhoncus, ligula urna mauris nunc ut enim et tincidunt rhoncus at sem, dolor ut tellus sed porttitor dui vel. Ullamcorper varius, consectetur ornare id consequat id dolor id lacinia, venenatis a dui vel dolor auctor. Mauris ipsum, nibh maximus egestas consequat congue nulla cras dictum nec placerat, ut venenatis elit posuere nibh maximus. Ut venenatis placerat, sit amet elit libero sed suspendisse libero dui duis id, quis ut hendrerit donec dolor quis. Curabitur sem, metus vestibulum interdum commodo hendrerit in donec cursus, luctus mauris eu elementum luctus maximus. Dolor quis a lacinia, adipiscing et nullam fermentum imperdiet convallis nam, et condimentum pellentesque neque.
                    </p>
                    <p>
                        Odio leo rhoncus, ligula urna mauris nunc ut enim et tincidunt rhoncus at sem, dolor ut tellus sed porttitor dui vel. Ullamcorper varius, consectetur ornare id consequat id dolor id lacinia, venenatis a dui vel dolor auctor. Mauris ipsum, nibh maximus egestas consequat congue nulla cras dictum nec placerat, ut venenatis elit posuere nibh maximus. Ut venenatis placerat, sit amet elit libero sed suspendisse libero dui duis id, quis ut hendrerit donec dolor quis. Curabitur sem, metus vestibulum interdum commodo hendrerit in donec cursus, luctus mauris eu elementum luctus maximus. Dolor quis a lacinia, adipiscing et nullam fermentum imperdiet convallis nam, et condimentum pellentesque neque.
                    </p>
                </Card>
            </Box>
        </>
    );
};

export default Profile;
