import { contentfulClient } from "../lib/ContentfulClient";

export const getEntryByID = (id: string) => {
    const client = contentfulClient();
    try {
        if (client) {
        return client.getEntry(id);
        } else {
        console.log("No Data available");
        return false;
        }
    } catch (error) {
        console.log("Error occurred while fetching data :: ", error);
        return false;
    }

}