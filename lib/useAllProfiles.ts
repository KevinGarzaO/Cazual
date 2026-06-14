"use client";

import { useState, useEffect } from "react";
import { profiles, getAllProfiles, type Profile } from "./profiles";

export function useAllProfiles(): Profile[] {
  const [all, setAll] = useState<Profile[]>(() => [...profiles]);
  useEffect(() => {
    setAll(getAllProfiles());
  }, []);
  return all;
}
