export interface Shipment {
    shipmentId: number;
    trackingNumber: string;
    carrier: string;
    shipmentDate: string;
    estimatedArrivalDate: string;
    status: string;
    orderId: number;
  }