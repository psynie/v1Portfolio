import { lazy } from "react";

export const demos = {
  shatterbox: lazy(() => import("./ShatterBoxDemo")),
  health: lazy(() => import("./HealthDemo")),
  learning: lazy(() => import("./LearningDemo")),
  alumni: lazy(() => import("./AlumniDemo")),
  legal: lazy(() => import("./LegalDemo")),
  airline: lazy(() => import("./AirlineDemo")),
};
