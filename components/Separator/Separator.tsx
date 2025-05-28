import Head from "next/head";
import React from "react";
/**
 * Used when we need a line between components
 */
const Separator = (): JSX.Element => (
  <>
    <p className="text-center lg:text-left text-sm border-t
                    border-gray-500 mt-4 pt-2"></p>
  </>
);

export default Separator;
