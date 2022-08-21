import { TranslationsItemProps } from '../../types';

const useTranslations = () => {
    const items: TranslationsItemProps[] = [];

    return {
        Translations: items,
        loadTranslations: () => { console.log('loadTranslations') },
        createTranslations: () => { console.log('createTranslations') },
        updateTranslations: () => { console.log('updateTranslations') },
        toggleTranslations: () => { console.log('toggleTranslations') },
        deleteTranslations: () => { console.log('deleteTranslations') },
    };
};

export default useTranslations;
