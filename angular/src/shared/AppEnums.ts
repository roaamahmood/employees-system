import { TenantAvailabilityState } from '@shared/service-proxies/service-proxies';

export class AppTenantAvailabilityState {
    static Available: number = TenantAvailabilityState._1;
    static InActive: number = TenantAvailabilityState._2;
    static NotFound: number = TenantAvailabilityState._3;
}

export enum ApiAction {
    GET = "Get",
    DETAILS = "GetDetails",
    DELETE = "Delete",
    CREATE = "Create",
    UPDATE = "Update"
}
