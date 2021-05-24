export const data_month = [
  {
    group: "Enero",
    value: 65000,
  },
  {
    group: "Febrero",
    value: 29123,
  },
  {
    group: "Marzo",
    value: 35213,
  },
  {
    group: "Abril",
    value: 51213,
  },
];

export const fillColors = [
  "#002060",
  "#002060",
  "#002060",
  "#002060",
  "#002060",
];

export const data = [
  {
    group: "Otros funcionarios",
    value: 65000,
  },
  {
    group: "Ejecutivos III",
    value: 29123,
  },
  {
    group: "Ejecutivos II",
    value: 35213,
  },
  {
    group: "Ejecutivos I",
    value: 51213,
  },
  {
    group: "Mandos medios",
    value: 16932,
  },
];

export const options_v = {
  title: "1.- % DE INCREMENTO MENSUAL OTORGADO",
  axes: {
    left: {
      mapsTo: "value",
    },
    bottom: {
      mapsTo: "group",
      scaleType: "labels",
    },
  },
  height: "280px",
  color: {
    scale: {
      Enero: "#002060",
      Febrero: "#002060",
      Marzo: "#002060",
      Abril: "#002060",
    },
  },
};
export const options_h = {
  title: "2.- % DE INCREMENTO OTORGADO POR CATEGORIA",
  axes: {
    left: {
      mapsTo: "group",
      scaleType: "labels",
    },
    bottom: {
      mapsTo: "value",
    },
  },
  height: "280px",
  color: {
    scale: {
      "Otros funcionarios": "#002060",
      "Ejecutivos III": "#002060",
      "Ejecutivos II": "#002060",
      "Ejecutivos I": "#002060",
      "Mandos medios": "#002060",
    },
  },
};
