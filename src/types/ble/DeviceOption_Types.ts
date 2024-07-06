export interface DeviceOption {
    label: string;
    action?: () => void;
    subOptions?: SubDeviceOption[];
}

export interface SubDeviceOption {
    label: string;
    action: () => void;
}