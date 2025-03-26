import { contentfulClient } from "../lib/ContentfulClient";

export const getAssetByID = (id: string) => {

    console.log("🔍 getAsset :: id :: ", id);
    const client = contentfulClient();
    try {
        if (client) {
        return client.getAsset(id);
        } else {
        console.log("No Data available");
        return false;
        }
    } catch (error) {
        console.log("Error occurred while fetching data :: ", error);
        return false;
    }

}