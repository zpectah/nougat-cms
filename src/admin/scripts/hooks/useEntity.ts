import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import routes from '../routes';
import { UsersTypeKeys } from '../enums';
import { entityItemProps, storeProps } from '../types';
import actions from '../store/actions';

const demoEntity: entityItemProps = {
    id: 12,
    type: 'default',
    email: 'email@email.email',
    firstname: 'John',
    lastname: 'Doe',
    nickname: 'johnny',
    fullname: 'John Doe',
    user_group: UsersTypeKeys['default'],
    user_meta: {
        avataaar: {
            avatarStyle: 'Circle',
            topType: 'LongHairBob',
            accessoriesType: 'Round',
            hairColor: 'Black',
            facialHairType: 'BeardMedium',
            facialHairColor: 'BrownDark',
            clotheType: 'ShirtCrewNeck',
            clotheColor: 'Gray01',
            eyeType: 'Wink',
            eyebrowType: 'UnibrowNatural',
            mouthType: 'Serious',
            skinColor: 'DarkBrown',
        },
    },
    user_level: 7,
    active: true,
    availableActions: {
        // common: {
        //     toggle: true,
        //     create: true,
        //     update: true,
        //     delete: true,
        // },
        Users: {
            toggle: true,
            create: true,
            update: true,
            delete: true,
        },
        Posts: {
            toggle: true,
            create: true,
            update: true,
            delete: true,
        },
    },
};

const useEntity = () => {
    const { entity } = useSelector((store: storeProps) => store);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getAvataaarImageSrc = () => {
        // https://getavataaars.com/
        const root = 'https://avataaars.io/';
        let path = '';
        const a = demoEntity.user_meta.avataaar;
        for (const key in a) {
            let s = '&';
            if (path === '') s = '?';
            path += `${s}${key}=${a[key]}`;
        }

        return root + path;
    };

    return {
        // entity,
        entity: demoEntity,
        setEntity: (entity: entityItemProps) => dispatch(actions.setEntity(entity)),
        reloadEntity: () => {},
        updateEntity: (entity: Partial<entityItemProps>) => {},
        avataaarSrc: getAvataaarImageSrc(),
        logout: () => {
            // TODO Handle log out request
            // Make this as callback of request
            navigate(routes.Login.path as string);
        },
    };
};

export default useEntity;
