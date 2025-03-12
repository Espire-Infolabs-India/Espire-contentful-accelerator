import React, { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import { TabsDataProps, TabsItemProps } from "../TabsProps";
import { ContentTypeProps } from "@/utils/lib/CommonProps";
import { ComponentFactory } from "@/utils/lib/ComponentFactory";

interface ComponentPropsFactory {
  sys: ContentTypeProps;
  fields: Record<string, unknown>;
}

const transformTabData = (tab: TabsItemProps): ComponentPropsFactory | null => {
  if (!tab?.fields?.referencedTabItem) {
    return null;
  }

  return {
    sys: tab?.fields?.referencedTabItem?.sys,
    fields: tab?.fields?.referencedTabItem?.fields || {},
  };
};

const Vertical = ({ data }: TabsDataProps) => {
  const [activeTab, setActiveTab] = useState(0);

  if (!data?.fields?.tabs || !Array.isArray(data?.fields?.tabs)) {
    return <Typography variant="h6">No tabs available</Typography>;
  }

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const renderTabs = () =>
    data?.fields?.tabs?.map((tab, index) => (
      <Tab
        key={tab?.sys?.contentType?.sys?.id || `tab-${index}`}
        label={tab?.fields?.title || `Tab ${index + 1}`}
      />
    ));

  const renderTabContent = () =>
    data?.fields?.tabs?.map((tab, index) => {
      if (activeTab !== index) return null;

      const referencedTabItem = tab?.fields?.referencedTabItem;
      const componentType = referencedTabItem?.sys?.contentType?.sys?.id;
      const Component = componentType
        ? (ComponentFactory[componentType] as
            | React.ComponentType<{ data: ComponentPropsFactory }>
            | undefined)
        : undefined;
      const tabData = transformTabData(tab);

      return (
        <Box
          key={tab?.sys?.contentType?.sys?.id || `content-${index}`}
          sx={{ p: 3 }}
        >
          {Component && tabData ? (
            <Component data={tabData} />
          ) : (
            <Typography>
              No component found for {componentType || "unknown type"}
            </Typography>
          )}
        </Box>
      );
    });

  return (
    <>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ textAlign: "center", width: "100%" }}
      >
        {data?.fields?.title || "Default Title"}
      </Typography>
      <Box sx={{ display: "flex", bgcolor: "background.paper", p: 3 }}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={activeTab}
          onChange={handleChange}
          sx={{ borderRight: 1, borderColor: "divider", minWidth: 150 }}
        >
          {renderTabs()}
        </Tabs>

        <Box sx={{ p: 3, flex: 1 }}>{renderTabContent()}</Box>
      </Box>
    </>
  );
};

export default Vertical;
