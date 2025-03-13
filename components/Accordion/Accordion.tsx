import * as React from "react";
import { Accordion as MUIAccordion } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RichtextRenderOptions from "@/common/RTE/RichTextRenderOptions";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import { ComponentDataProps, ComponentProps } from "@/utils/lib/CommonProps";

const Accordion = ({ data }: ComponentDataProps) => {
  return (
    <div>
      <Typography
        variant="h5"
        component="h2"
        className="text-center font-bold uppercase mb-4 text-gray-800 w-full flex justify-center"
      >
        {data?.fields?.title}
      </Typography>

      {data?.fields?.accordionItemsList?.map((item : ComponentProps, index : number) => (
        <MUIAccordion key={index} defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography component="span">
              {documentToReactComponents(
                item?.fields?.heading as unknown as Document,
                RichtextRenderOptions
              )}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {documentToReactComponents(
              item?.fields?.summary as unknown as Document,
              RichtextRenderOptions
            )}
          </AccordionDetails>
        </MUIAccordion>
      ))}
    </div>
  );
};

export default Accordion;
