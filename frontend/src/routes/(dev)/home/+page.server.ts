import type { PageServerLoad } from "./$types";


export let load: PageServerLoad = async () => {
    let trips: Model.Trip[] = [
        {
            id: 1,
            vehicle: {
                id: 1,
                plate_no: "QGY7789"
            },
            points: [
                {
                    id: 1,
                    name: "npop"
                },
                {
                    id: 2,
                    name: "graphg"
                }
            ]
        },
        {
            id: 2,
            vehicle: {
                id: 2,
                plate_no: "HHU0090"
            },
            points: [
                {
                    id: 1,
                    name: "npop"
                },
                {
                    id: 3,
                    name: "benta sawit"
                }
            ]
        }
    ]

    return {
        trips
    }
}