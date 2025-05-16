import { GoogleAnalytics } from "@next/third-parties/google";
import { ComponentDataProps } from "@/utils/lib/CommonProps";

const GoogleAnalyticsComponent = ({ data }: ComponentDataProps) => {
  const { gtmId } = data?.fields || {};
  if (!gtmId) return null;
  return <GoogleAnalytics gaId={gtmId} />;
};
export default GoogleAnalyticsComponent;
