
export interface User {

}

export interface Project {
    Nombre: string;
    Descripción: string;
    Estado: string;
    Tareas?: Task[];
    FechaInicio?: string;
    FechaFin?: string;
}

export interface Task {
    name: string;
    description: string;
    status: string;
    priority: string;
    project: Project;
    user: string;
}