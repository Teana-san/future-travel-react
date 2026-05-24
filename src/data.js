
// contact cards
import madrid from "./assets/fotoTour/spain/madrid.png"
import moscow from "./assets/fotoTour/russia/moscow.png"
import lima from "./assets/fotoTour/peru/lima.jpg"


// contact section
export const paises = [
    {
        id: 1,
        label: "España",
        value: "spain",
        ciudad: "Madrid",
        imagen: madrid,
        telefono: "+34 000 000 000",
        correo: "spain@futuretravel.com"
    },
    {
        id: 2,
        label: "Perú",
        value: "peru",
        ciudad: "Lima",
        imagen: lima,
        telefono: "+51-00-0000000",
        correo: "peru@futuretravel.com"
    },
    {
        id: 3,
        label: "Rusia",
        value: "russia",
        ciudad: "Moscú",
        imagen: moscow,
        telefono: "+7 000 000 00 00",
        correo: "rusia@futuretravel.com"
    }
];


// select asunto
export const asuntos = [
    { id: 1, label: "Consulta general", value: "general" },
    { id: 2, label: "Reserva de viaje", value: "reserva" },
    { id: 3, label: "Colaboración", value: "colaboracion" },
    { id: 4, label: "Reclamación", value: "queja" },
    { id: 5, label: "Otro", value: "otro" }
];
// для сервера важно value, специально указываем его без тильд и всякой хрени, чтобы сервер норм все считал


// select fechas
export const fechas = {
    "marzo": [
        { id: 1, label: "01-03-2026 - 04-03-2026", value: "marzo1", precio: 300 },
        { id: 2, label: "09-03-2026 - 12-03-2026", value: "marzo2", precio: 350 },
        { id: 3, label: "16-03-2026 - 19-03-2026", value: "marzo3", precio: 400 }
    ],
    "junio": [
        { id: 4, label: "01-06-2026 - 04-06-2026", value: "junio1", precio: 450 },
        { id: 5, label: "09-06-2026 - 12-06-2026", value: "junio2", precio: 500 },
        { id: 6, label: "16-06-2026 - 19-06-2026", value: "junio3", precio: 550 }
    ],
    "septiembre": [
        { id: 7, label: "01-09-2026 - 04-09-2026", value: "septiembre1", precio: 500 },
        { id: 8, label: "09-09-2026 - 12-09-2026", value: "septiembre2", precio: 450 },
        { id: 9, label: "16-09-2026 - 19-09-2026", value: "septiembre3", precio: 400 }
    ]
}
