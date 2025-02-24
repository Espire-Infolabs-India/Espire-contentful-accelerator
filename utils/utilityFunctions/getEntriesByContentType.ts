import { contentfulClient } from "../lib/ContentfulClient";

export const getEntriesByContentType = async (content_type: string, url: string) => {
    const client = contentfulClient();
    try {
        if (client) {
            const params: {
                content_type: string;
                include: number;   
                url: string;             
            } = { content_type: content_type, include: 3, url:url};

            if(url)
            {
                console.log("check", url);
            }
            const entries = await client.getEntries(params);

            const items = entries?.items;
            console.log("items", items);

            return { items };
        } else {
            console.log("No Dara found")
            return false;
        }
    } catch (error) {
        console.log("Error occurred while fetching data :: ", error);
        return false;
    }
};
