"use client"
import { Accordion, AccordionItem } from "@heroui/react";
import { div } from "framer-motion/client";

export default function Acordar() {
  const defaultContent =
    "Lorem Innei ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <div className="max-w-max bg-gray-800">
      <Accordion isCompact className="max-w-max">
        <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1" className="max-w-max">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
          {defaultContent}
        </AccordionItem>
      </Accordion>
    </div>
  );
}
