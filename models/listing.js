const mongoose= require("mongoose");
const Schema= mongoose.Schema;
const Review= require("./review.js");
const { required } = require("joi");


// const imageSchema = new Schema({
//     filename: { type: String,},
//     url: {
//         type: String,
//         default: "https://images.unsplash.com/photo-1543754845-4cac43ebb305?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         set: (v) => v === ""|| v=== null ? "https://images.unsplash.com/photo-1543754845-4cac43ebb305?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
//     },
// });


const categoryEnum= ["Trending", "Rooms", "IconicCities", "Mountains", "Castles", "AmazingPools", "Camping", "Farms", "Arctic", "Domes", "Boats"];
const listingSchema= new Schema({
    title: {
        type:String,
        required:true
    },
    description: String,
    image: {
        url:String,
        filename: String
    },
    price:Number,
    location:String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    category: {
        type: "String",
        enum: categoryEnum,
        required: true
    },
});

listingSchema.post("findOneAndDelete", async(listing) => {
    if(listing) {
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
})

const Listing= mongoose.model("Listing", listingSchema);


module.exports= {Listing, categoryEnum};