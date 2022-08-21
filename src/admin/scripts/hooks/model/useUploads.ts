import { UploadsItemProps } from '../../types';

const useUploads = () => {
    const items: UploadsItemProps[] = [];

    return {
        Uploads: items,
        loadUploads: () => { console.log('loadUploads') },
        createUploads: () => { console.log('createUploads') },
        updateUploads: () => { console.log('updateUploads') },
        toggleUploads: () => { console.log('toggleUploads') },
        deleteUploads: () => { console.log('deleteUploads') },
    };
};

export default useUploads;
