import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import RichtextRenderOptions from "@/common/RTE/RichTextRenderOptions";
import { ComponentDataProps, ComponentProps } from "@/utils/lib/CommonProps";

const FeatureCard = ({ data }: ComponentDataProps) => {
  const [selectedCard, setSelectedCard] = React.useState<number | null>(null);
  const cardList: ComponentProps[] = data?.fields?.cardList || [];

  return (
    <>
      <div className="container m-auto my-10">
        <Typography
          variant="h4"
          component="h2"
          sx={{ textAlign: "center", fontWeight: "bold", mb: 3 }}
        >
          {data?.fields?.title}
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 3,
          }}
        >
          {cardList.map((item, index) => {
            const key = `card-${index}`;
            return (
              <Card
                key={key}
                sx={{
                  backgroundColor:
                    index % 2 === 0 ? "rgb(30, 58, 138)" : "#f5f5f5",
                  color: index % 2 === 0 ? "white" : "black",
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              >
                <CardActionArea
                  onClick={() => setSelectedCard(index)}
                  data-active={selectedCard === index ? "" : undefined}
                  sx={{
                    height: "100%",
                    p: 2,
                    "&[data-active]": {
                      backgroundColor: "action.selected",
                      "&:hover": {
                        backgroundColor: "action.selectedHover",
                      },
                    },
                  }}
                >
                  <CardContent sx={{ height: "100%" }}>
                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{ fontWeight: "bold", mb: 1 }}
                    >
                      {item.fields?.title?.trim() || "Untitled"}
                    </Typography>
                    <Typography variant="body2" component="div">
                      {documentToReactComponents(
                        item.fields?.description as unknown as Document,
                        RichtextRenderOptions
                      ) || "No description available."}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
        </Box>
      </div>
    </>
  );
};

export default FeatureCard;
