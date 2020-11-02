export interface InstanceDB {

    id?: number ;
    instanceId: string ;
    name: string ;
    vmtaDomain?: string ;
    mainIp?: string ;
    isInstalled?: boolean;
    isDeleted?: boolean;
    createdAt?: Date;
    deletedAt?: Date;
    ipStatus?: number;

}
