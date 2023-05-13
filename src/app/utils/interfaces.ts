
export interface User {

}

export interface Proyecto {
    id: number;
    Nombre: string;
    Descripción: string;
    Estado: string;
    Tareas?: Tarea[];
    FechaInicio?: string;
    FechaFin?: string;
}

export interface Tarea {
    id: number;
    Nombre: string;
    Descripción: string;
    Estado: string;
    Prioridad: string;
    Proyecto: number | String;
    Usuario: string;
    FechaInicio?: string;
    FechaFin?: string;
}