import mongoose, {Document, Schema} from "mongoose";



export interface IBooking extends Document{
    user: mongoose.Types.ObjectId,
    car: mongoose.Types.ObjectId,
    startDate: Date,
    endDate: Date,
    totalPrice: number,
    status: "pending" |"approved" | "cancelled"
}

const bookingSchema = new Schema<IBooking>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        car: {
            type: Schema.Types.ObjectId,
            ref: 'Car',
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        totalPrice: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ["pending", "approved", "cancelled"],
            default: "pending"
        } 
    }, { timestamps: true }
)

export default mongoose.model<IBooking>('Booking', bookingSchema)