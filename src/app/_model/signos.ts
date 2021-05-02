import { Paciente } from "./paciente";

export class Signos{
    idSignos:number=0;
    paciente: Paciente=new Paciente();
    temperatura: string="";
    pulso: string="";
    ritmo:string="";
    fecha: string=""; 
}