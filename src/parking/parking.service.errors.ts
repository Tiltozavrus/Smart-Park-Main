export enum ParkingServiceErrorType {
    PlaceIsReserved = "Place is reserved",
    PlaceNotFound = "Place not found",
    UserDontHaveReservedPlace = "User don't have reserved place",
    UserAlreadyReservePlace = "User already reserve place",
    YouNotReserveThisPlace = "You not reserve this place",
    ReservedPlaceNotFound = "ReservePlaceNotFound"
}

export class ParkingServiceError extends Error {
    type: ParkingServiceErrorType

    constructor(type: ParkingServiceErrorType) {
        super(type)
        this.type = type
    }

    get name(): string {
        return this.type
    }
}
