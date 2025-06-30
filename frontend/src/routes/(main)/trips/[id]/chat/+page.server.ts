import type { PageServerLoad } from "./$types";


export let load: PageServerLoad = async ({ parent }) => {
    let layoutData = await parent()

    return {
        data: layoutData
    }
}