import { Proyecto } from "./interfaces";

//crear un array de proyectos

export const PROYECTOS_DATA: Proyecto[] = [
    {
        id: 100,
        Nombre: 'Proyecto 1',
        Descripción: 'Descripción del proyecto 1',
        Estado: 'En curso',
        Tareas: [
            {
                id: 200,
                Nombre: 'Tarea 1',
                Descripción: 'Descripción de la tarea 1',
                Estado: 'En curso',
                Prioridad: 'Alta',
                Usuario: 'Usuario 1',
                FechaInicio: '2020-03-01',
                FechaFin: '2020-03-31',
                Proyecto: 100
            },
            {
                id: 201,
                Nombre: 'Tarea 2',
                Descripción: 'Descripción de la tarea 2',
                Estado: 'En curso',
                Prioridad: 'Alta',
                Usuario: 'Usuario 2',
                FechaInicio: '2020-03-01',
                FechaFin: '2020-03-31',
                Proyecto: 100
            },
            {
                id: 202,
                Proyecto: 100,
                Nombre: 'Tarea 3',
                Descripción: 'Descripción de la tarea 3',
                Estado: 'En curso',
                Prioridad: 'Alta',
                Usuario: 'Usuario 3',
                FechaInicio: '2020-03-01',
                FechaFin: '2020-03-31'
            }
        ],
        FechaInicio: '2020-01-01',
        FechaFin: '2020-01-31'
    },
    {
        id: 101,
        Nombre: 'Proyecto 2',
        Descripción: 'Descripción del proyecto 2',
        Estado: 'En curso',
        Tareas: [
            {
                id: 203,
                Proyecto: 101,
                Nombre: 'Tarea 1',
                Descripción: 'Descripción de la tarea 1',
                Estado: 'En curso',
                Prioridad: 'Alta',
                Usuario: 'Usuario 1',
                FechaInicio: '2020-03-01',
                FechaFin: '2020-03-31'
            },
            {
                id: 204,
                Proyecto: 101,
                Nombre: 'Tarea 2',
                Descripción: 'Descripción de la tarea 2',
                Estado: 'En curso',
                Prioridad: 'Alta',
                Usuario: 'Usuario 2',
                FechaInicio: '2020-03-01',
                FechaFin: '2020-03-31'
            },
            {
                id: 205,
                Proyecto: 101,
                Nombre: 'Tarea 3',
                Descripción: 'Descripción de la tarea 3',
                Estado: 'En curso',
                Prioridad: 'Alta',
                Usuario: 'Usuario 3',
                FechaInicio: '2020-03-01',
                FechaFin: '2020-03-31'
            }
        ],
        FechaInicio: '2020-02-01',
        FechaFin: '2020-02-28'
    },
    {
        id: 103,
        Nombre: 'Proyecto 3',
        Descripción: 'Descripción del proyecto 3',
        Estado: 'En curso',
        Tareas: [
            {
                id: 206,
                Proyecto: 103,
                Nombre: 'Tarea 1',
                Descripción: 'Descripción de la tarea 1',
                Estado: 'En curso',
                Prioridad: 'Alta',
                Usuario: 'Usuario 1',
                FechaInicio: '2020-03-01',
                FechaFin: '2020-03-31'
            },
            {
                id: 207,
                Proyecto: 103,
                Nombre: 'Tarea 2',
                Descripción: 'Descripción de la tarea 2',
                Estado: 'Finalizada',
                Prioridad: 'Alta',
                Usuario: 'Usuario 2',
                FechaInicio: '2020-03-01',
                FechaFin: '2020-03-31'
            },
            {
                id: 208,
                Proyecto: 103,
                Nombre: 'Tarea 3',
                Descripción: 'Descripción de la tarea 3',
                Estado: 'En curso',
                Prioridad: 'Alta',
                Usuario: 'Usuario 3',
                FechaInicio: '2020-03-01',
                FechaFin: '2020-03-31'
            }
        ],
        FechaInicio: '2020-03-01',
        FechaFin: '2020-03-31'
    }
];




