export enum ShipmentStatus {
  processing,
  transit,
  returned,
  delivered,
  failure,
}

export interface ShipmentEntry {
  status?: ShipmentStatus;
  message: string;
  time: Date;
  loc?: string;
}

export interface Shipment {
  status?: ShipmentStatus;
  entries: ShipmentEntry[];
}
