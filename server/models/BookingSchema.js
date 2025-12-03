import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    doctor:{
        type: mongoose.Types.ObjectId,
        ref: "Doctor",
        required: true,
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    ticketPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    session: {
      type: String,  // Store Stripe Checkout session ID
      required: false, 
    },
  },
   { timestamps: true }
);

BookingSchema.pre(/^find/, function(){
  this.populate("user").populate({
    path: "doctor",
    select: "name", 
  });
  
})


export default mongoose.model("Booking", BookingSchema);