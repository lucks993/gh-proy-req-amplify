export const monthList = [
    {
        id: 1,
        name: 'Enero',
        value: '01'
    },
    {
        id: 2,
        name: 'Febrero',
        value: '02'
    },
    {
        id: 3,
        name: 'Marzo',
        value: '03'
    },
    {
        id: 4,
        name: 'Abril',
        value: '04'
    },
    {
        id: 5,
        name: 'Mayo',
        value: '05'
    },
    {
        id: 6,
        name: 'Junio',
        value: '06'
    },
    {
        id: 7,
        name: 'Julio',
        value: '07'
    },
    {
        id: 8,
        name: 'Agosto',
        value: '08'
    },
    {
        id: 9,
        name: 'Setiembre',
        value: '09'
    },
    {
        id: 10,
        name: 'Octubre',
        value: '10'
    },
    {
        id: 11,
        name: 'Noviembre',
        value: '11'
    },
    {
        id: 12,
        name: 'Diciembre',
        value: '12'
    }
]

export const yearListProto = [
    {
        id: 1,
        name: '2021',
        value: 2021
    },
    {
        id: 2,
        name: '2022',
        value: 2022
    },
    {
        id: 3,
        name: '2023',
        value: 2023
    },
    {
        id: 4,
        name: '2024',
        value: 2024
    },
    {
        id: 5,
        name: '2025',
        value: 2025
    },
    {
        id: 6,
        name: '2026',
        value: 2026
    },
    {
        id: 7,
        name: '2027',
        value: 2027
    },
    {
        id: 8,
        name: '2028',
        value: 2028
    },
    {
        id: 9,
        name: '2029',
        value: 2029
    }
]

export const barData1 = [    
    {
        "group": "Nuevo",
        "key": "GLORIA",
        "value": 0
    },
    {
        "group": "Nuevo",
        "key": "YURA",
        "value": 2
    },
    {
        "group": "Nuevo",
        "key": "SUPERMIX",
        "value": 14
    },
    {
        "group": "Nuevo",
        "key": "CALCESUR",
        "value": 0
    },
    {
        "group": "Nuevo",
        "key": "RACIEMSA",
        "value": 5
    },
    {
        "group": "Nuevo",
        "key": "TRUPAL",
        "value": 0
    },
    {
        "group": "Nuevo",
        "key": "CENTRO",
        "value": 0
    },
    {
        "group": "Nuevo",
        "key": "ILLAPU",
        "value": 0
    },
    {
        "group": "Reemplazo",
        "key": "GLORIA",
        "value": 3
    },
    {
        "group": "Reemplazo",
        "key": "YURA",
        "value": 4
    },
    {
        "group": "Reemplazo",
        "key": "SUPERMIX",
        "value": 5
    },
    {
        "group": "Reemplazo",
        "key": "CALCESUR",
        "value": 7
    },
    {
        "group": "Reemplazo",
        "key": "RACIEMSA",
        "value": 8
    },
    {
        "group": "Reemplazo",
        "key": "TRUPAL",
        "value": 1
    },
    {
        "group": "Reemplazo",
        "key": "CENTRO",
        "value": 1
    },
    {
        "group": "Reemplazo",
        "key": "ILLAPU",
        "value": 2
    }
]

export const barOption1 =
    {
        title: "Resumen Requerimientos Aprobados por Empresa por Nueva Vacante y Reemplazo",
        axes: {
            left: {
                mapsTo: "value"
            },
            bottom: {
                mapsTo: "key",
                scaleType: "labels"
            }
        },
        legend: {
            "alignment": "center"
        },   
        color: {
            scale: {
                "Nuevo Planificado": "#002060",
                "Nuevo No Planificado": "#8faae6",
                Reemplazo: "#7f7f7f"
            }
        },
        height: "400px"
    }

export const barData2 = [    
    {
        "group": "Mar21",
        "key": "GERENTES / SUB GTS / SUPERINT",
        "value": 0
    },
    {
        "group": "Mar21",
        "key": "JEFES",
        "value": 4
    },
    {
        "group": "Mar21",
        "key": "SUPERVISORES / COORD / ESPECIALIST",
        "value": 11
    },
    {
        "group": "Mar21",
        "key": "ANALISTAS / ASISTENTES / SECRETARIAS",
        "value": 12
    },
    {
        "group": "Mar21",
        "key": "OPERADORES",
        "value": 9
    },
    {
        "group": "Mar21",
        "key": "AUXILIARES / OBREROS / OPERARIOS",
        "value": 7
    },
    {
        "group": "Mar21",
        "key": "CHOFERES",
        "value": 0
    },
    {
        "group": "Mar21",
        "key": "PRACTICANTES APRENDICES",
        "value": 9
    }
]

export const barOption2 =
    {
        title: "Resumen Requerimientos Aprobados por Agrupador de Puesto",
        axes: {
            left: {
                mapsTo: "value"
            },
            bottom: {
                mapsTo: "key",
                scaleType: "labels"
            }
        },
        legend: {
            "alignment": "center"
        },        
        color: {
            scale: {
                Mar21: "#002060"
            }
        },
        height: "400px"
    }

export const barData3 = [    
    {
        "group": "GLORIA CORPORATIVO",
        "value": 3
    },
    {
        "group": "YURA",
        "value": 6
    },
    {
        "group": "SUPERMIX",
        "value": 19
    },
    {
        "group": "CALCESUR",
        "value": 7
    },
    {
        "group": "RACIEMSA",
        "value": 13
    },
    {
        "group": "TRUPAL",
        "value": 1
    },
    {
        "group": "CENTRO",
        "value": 1
    },
    {
        "group": "ILLAPU",
        "value": 2
    }
]

export const barOption3 =
    {
        title: "Resumen Requerimientos Aprobados por Empresa",
        resizable: "true",
        legend: {
            "alignment": "center"
        },     
        pie: {
            "alignment": "center"
        },   
        color: {
            scale: {
                GLORIA: "#002060",
                DEPRODECA: "#0070c0",
                AGP: "#025022",
                PANIFICADORA: "#bf8f00",
                YURA: "#7f7f7f",
                SUPERMIX: "#2f6948",
                INGEMIN: "#993300",
                CALCESUR: "#7030a0",
                TRUPAL: "#ed7c31",
                RACIEMSA: "#c00000",            
                CENTRO: "#14a0ba"
                //ILLAPU: "#B80808"
            }
        },
        height: "550px"
    }

export const barData4 = [    
    {
        "group": "2020",
        "date": "Jan",
        "value": 100
    },
    {
        "group": "2020",
        "date": "Feb",
        "value": 50
    },
    {
        "group": "2020",
        "date": "Mar",
        "value": 60
    },
    {
        "group": "2020",
        "date": "Apr",
        "value": 80
    },
    {
        "group": "2020",
        "date": "May",
        "value": 70
    },
    {
        "group": "2021",
        "date": "Jan",
        "value": 113
    },
    {
        "group": "2021",
        "date": "Feb",
        "value": 56
    },
    {
        "group": "2021",
        "date": "Mar",
        "value": 52
    },
    {
        "group": "2021",
        "date": "Apr",
        "value": 45
    },
    {
        "group": "2022",
        "date": "Jan",
        "value": 40
    },
    {
        "group": "2022",
        "date": "Feb",
        "value": 20
    },
    {
        "group": "2022",
        "date": "Mar",
        "value": 30
    },
    {
        "group": "2022",
        "date": "Apr",
        "value": 100
    }
]

export const barOption4 =
    {
        title: "Resumen Anual Requerimientos Aprobados",
        axes: {
            left: {
                title: "Aprobaciones",
                mapsTo: "value",
                scaleType: "linear"
            },
            bottom: {
                title: "Meses",
                mapsTo: "date",
                scaleType: "labels"
            }
        },
        // data: {
        //     groupsMapTo: "date"
        // },
        legend: {
            alignment: "center"
        },     
        color: {
            scale: {
                "2020": "black",
                "2021": "#002060"
            }
        },
        curve: "curveMonotoneX",
        height: "400px"
    }