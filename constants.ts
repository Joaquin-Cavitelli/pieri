
import { LabelText, TimelineMilestone, UltrasoundData } from './types';

export const LABEL_CONTENT: LabelText = {
  title: "SIEMPRE LEA LA LETRA CHICA",
  subtitle: "EL SECRETO MEJOR GUARDADO",
  description: "\"SIEMPRE LEA LA LETRA CHICA\" es un vino que nos invita a prestar atención a los pequeños detalles. Elaborado durante nueve meses en barricas de madera noble, revelando su complejidad lentamente, como las sorpresas más inesperadas de la vida. Un vino lleno de promesas y momentos por descubrir.",
  vintage: "COSECHA 2025",
  variety: "MALBEC",
  footerQuote: "Los pies más pequeños dejan las huellas más grandes."
};

export const ULTRASOUND_IMAGES: UltrasoundData[] = [
  { 
    src: "./eco/1.jpeg", 
    date: "04/12/2024", 
    weeks: "Semana 7" 
  },
  { 
    src: "./eco/2.jpeg", 
    date: "07/01/2025", 
    weeks: "Semana 12" 
  },
  { 
    src: "./eco/3.jpeg", 
    date: "14/04/2025", 
    weeks: "Semana 26" 
  },
  { 
    src: "./eco/4.jpeg", 
    date: "14/04/2025", 
    weeks: "Semana 26" 
  }
];

export const MILESTONES: TimelineMilestone[] = [
  {
    title: "La primer foto",
    description: "Mi bebe chiquitita, con 2,2kg naciste",
    image: "./historia/1.jpeg",
    date: "30 de Junio 2024"
  },
  {
    title: "1 dia de vida",
    description: "Todavia en el hospital esperando que se recupere mamá",
    image: "./historia/2.jpeg",
    date: "1 de Julio 2024"
  },
{
    title: "Sesion de fotos",
    description: "En los bazos de mamá saque esta foto que estuvo como fondo de bloqueo de pantalla del celu por mucho tiempo",
    image: "./historia/3.jpeg",
    date: "15 de Julio 2024"
  },
  {
    title: "Mi bebe hermosa",
    description: "Probando outfit nuevo, de a poco le va entrando la ropa",
    image: "./historia/4.jpeg",
    date: "1 de Septiembre 2024"
  },
  {
    title: "",
    description: "",
    image: "./historia/5.jpeg",
    date: "18 de Septiembre 2024"
  },
  {
    title: "",
    description: "4 meses",
    image: "./historia/6.jpeg",
    date: "2 de Noviembre 2024"
  },
  {
    title: "",
    description: "5 meses",
    image: "./historia/7.jpeg",
    date: "3 de Diciembre 2024"
  },
];
