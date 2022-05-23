/**
 * Parking place errors type enum
 *
 * @export
 * @enum {number}
 */
export enum ParkingServiceErrorType {
    PlaceIsReserved = "Place is reserved",
    PlaceNotFound = "Place not found",
    UserDontHaveReservedPlace = "User don't have reserved place",
    UserAlreadyReservePlace = "User already reserve place",
    YouNotReserveThisPlace = "You not reserve this place",
    ReservedPlaceNotFound = "ReservePlaceNotFound"
}

/**
 * Parking Servic error
 *
 * @export
 * @class ParkingServiceError
 * @extends {Error}
 */
export class ParkingServiceError extends Error {
    /**
     * type of error
     *
     * @type {ParkingServiceErrorType}
     * @memberof ParkingServiceError
     */
    type: ParkingServiceErrorType

    /**
     * Creates an instance of ParkingServiceError.
     * @param {ParkingServiceErrorType} type
     * @memberof ParkingServiceError
     */
    constructor(type: ParkingServiceErrorType) {
        super(type)
        this.type = type
    }

    /**
     * error name getter
     *
     * @readonly
     * @type {string}
     * @memberof ParkingServiceError
     */
    get name(): string {
        return this.type
    }
}
