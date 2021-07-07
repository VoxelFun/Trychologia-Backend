import { Visit } from "../model/Visit";

export function getSaveVisitsRoute() {
    return "admin/visits/save";
}

export interface SaveVisitsRequest {
    visitsHolders: {
        day: number;
        visits: Visit[];
    }[]
}