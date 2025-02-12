import { createClient } from 'contentful';

const space_id = process.env.NEXT_PUBLIC_SPACE_ID || '';
const access_token = process.env.NEXT_PUBLIC_DELIVERY_TOKEN || '';
const preview_token = process.env.NEXT_PUBLIC_PREVIEW_TOKEN || '';
const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;

interface ContentfulOptions {
    space: string;
    host?: string;
    accessToken: string;
    environment: string;
}

const clientOptions = (is_preview: boolean): ContentfulOptions => {
    const options: ContentfulOptions = {
        space: '',
        host: '',
        accessToken: '',
        environment: ''
    };
    options.space = space_id;
    options.host = is_preview ? "preview.contentful.com" : undefined;
    options.accessToken = is_preview ? preview_token : access_token;
    options.environment = environment ? environment : "master";
    return options;
};

export const contentfulClient = () =>{
    const options = clientOptions(false);
    return createClient(options);
};