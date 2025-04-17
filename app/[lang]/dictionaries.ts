import 'server-only';

type Locale = 'en' | 'es';

const dictionaries = {
    en: () => import('./dictionaries/en.json').then(module => module.default),
    es: () => import('./dictionaries/es.json').then(module => module.default),
}

export const getDictionary = async (locale: string) => {
    return (locale in dictionaries)
    ? dictionaries[locale as keyof typeof dictionaries]()
    : dictionaries.en()
}