"use client";

import { SetState } from "@/lib/types";
import React, { useState } from "react";

export default function Router({
  children,
  route,
  setRoute,
}: {
  children: (route: string) => React.JSX.Element;
  route: string;
  setRoute: SetState<string>;
}) {
  return children(route);
}
