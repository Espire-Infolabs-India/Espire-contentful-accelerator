import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ComponentFactory } from "@/utils/lib/ComponentFactory";
import { ComponentDataProps, ComponentProps } from "@/utils/lib/CommonProps";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function transformTabData(tab: ComponentProps) {
  if (!tab?.fields?.referencedTabItem) {
    return null;
  }

  return {
    sys: tab?.fields?.referencedTabItem?.sys,
    fields: tab?.fields?.referencedTabItem?.fields || {},
  };
}

export default function Horizontal({ data }: ComponentDataProps) {
  const [value, setValue] = React.useState(0);

  if (!data?.fields?.tabs || !Array.isArray(data?.fields?.tabs)) {
    return <Typography variant="h6">No tabs available</Typography>;
  }

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const renderTabs = () =>
    data?.fields?.tabs?.map((tab: ComponentProps, index: number) => (
      <Tab
        key={tab?.sys?.contentType?.sys?.id || `tab-${index}`}
        label={tab?.fields?.title || `Tab ${index + 1}`}
        {...a11yProps(index)}
      />
    ));

  const renderTabPanels = () =>
    data?.fields?.tabs?.map((tab: ComponentProps, index: number) => {
      const referencedTabItem = tab?.fields?.referencedTabItem;
      const componentType = referencedTabItem?.sys?.contentType?.sys?.id;
      const Component = componentType
        ? (ComponentFactory[componentType] as
            | React.ComponentType<{ data: ComponentProps }>
            | undefined)
        : undefined;
      const tabData = transformTabData(tab);

      return (
        <CustomTabPanel
          key={tab?.sys?.contentType?.sys?.id || `panel-${index}`}
          value={value}
          index={index}
        >
          {Component && tabData ? (
            <Component data={tabData} />
          ) : (
            <Typography>
              No component found for {componentType || "unknown type"}
            </Typography>
          )}
        </CustomTabPanel>
      );
    });

  return (
    <div className="container m-auto my-10">
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ textAlign: "center", width: "100%" }}
      >
        {data?.fields?.title || "Default Title"}
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="dynamic tabs">
          {renderTabs()}
        </Tabs>
      </Box>

      {renderTabPanels()}
    </Box>
    </div>
  );
}
