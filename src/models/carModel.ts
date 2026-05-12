import mongoose, {Document, Schema, trusted} from "mongoose"

export interface ICar extends Document{
    name: string,
    brand: string,
    pricePerDay: number,
    image: string;
    transmission: string,
    fuelType: string,
    seats: number,
    available: boolean,
    description: string
}

const carSchema = new Schema<ICar>(
    {
        name: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        pricePerDay: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        transmission: {
            type: String,
            enum: ['Automatic', 'Manual'],
            required: true
        },
        fuelType: {
            type: String,
            enum: ['Petrol', 'Diesel', 'Electric'],
            required: true
        },
        seats: {
            type: Number,
            required: true
        },
        available: {
            type: Boolean,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }, { timestamps: true }
)

export default mongoose.model<ICar>('Car', carSchema);