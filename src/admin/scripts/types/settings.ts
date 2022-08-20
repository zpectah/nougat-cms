export interface SettingsProps {
    app_language_default: string,
    app_language_installed: string[],
    app_language_active: string[],

    company_name: string,
    company_id: string,

    app_meta_title: string,
    app_meta_description: string,
    app_meta_robots: string,
    app_meta_keywords: string[],

    app_revision_token: string,
}
