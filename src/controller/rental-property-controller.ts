//@ts-types="npm:@types/express"
import express, { NextFunction, Request, Response } from "express"
import { rentalPropertyService } from "@service/rental-property-service.ts";


export type RentalPropertyResDTO = {
    id?: string;
    addressId?: string;
    rentalOwner?: string;
    madeAt?: Date;
    madeBy?: string;
    editedAt?: Date;
    editedBy?: string;
    rentalName?: string;
    singleBeds?: number;
    doubleBeds?: number;
    storage?: string;
    country?: string;
    city?: string;
    postalCode?: string;
    street?: string;
    streetNumber?: string;
}

export type RentalPropertyReqDTO = {
    addressId?: string;
    rentalOwner?: string;
    rentalName?: string;
    singleBeds?: number;
    doubleBeds?: number;
    storage?: string;
    country?: string;
    city?: string;
    postalCode?: string;
    street?: string;
    streetNumber?: string;
}

const router = express.Router();
const service = rentalPropertyService;

router.get("/", async (req: Request, res: Response<RentalPropertyResDTO[]>, next: NextFunction) => {
    console.log("homo")
    try {
        const data = await service.getAllRentalProperties()
        res.status(200).json(data)

    } catch(error) {
        next(error)
    }
})

router.get("/:id", async (req: Request, res: Response<RentalPropertyResDTO>, next: NextFunction) => {
    try {
        const { id } = req.params;
        const data = await service.getRentalPropertyById(id);
        res.status(200).json(data);

    } catch (error) {
        next(error);
    }
});

export { router as rentalPropertyRouter }