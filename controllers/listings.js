const {Listing, categoryEnum}= require("../models/listing");

module.exports.index= async(req, res) => {
    const {category}= req.query;
    const {country}= req.query;
    if(category) {
        allListings= await Listing.find({category});
    } else if(country) {
        allListings= await Listing.find({country});
    } else if(category & country) {
        allListings= await Listing.find({category, country});
    } else {
        allListings= await Listing.find({});
    }
    res.render("listings/index.ejs", {allListings, category});
}

module.exports.renderNewForm= (req,res) => {
    res.render("listings/new.ejs", {categories: categoryEnum});
}


module.exports.createListing= async(req,res) => {
    let url= req.file.path;
    let filename= req.file.filename;
    let category= req.body.listing.category;
    const newListing= new Listing(req.body.listing);
    newListing.owner= req.user._id;
    newListing.image= {url, filename};
    newListing.category= category;
    await newListing.save();
    req.flash("success", "New listing created!");
    res.redirect("/listings");
}


module.exports.showListing= async(req,res) => {
    let {id}= req.params;
    const listing = await Listing.findById(id).populate({path: "reviews", populate: {path:"author"}}).populate("owner");
    if(!listing) {
        req.flash("error", "Listing you requested for doesn't exist");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", {listing});
}


module.exports.renderEditForm= async(req, res) => {
    let {id}= req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error", "Listing you requested for doesn't exist");
        res.redirect("/listings");
    }
    let originalImageUrl= listing.image.url;
    originalImageUrl= originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", {listing, originalImageUrl, categories:categoryEnum});
}

module.exports.updateListing= async(req,res) => {
    let {id}= req.params;
    let listing= await Listing.findByIdAndUpdate(id, {...req.body.listing});

    if(typeof req.file !== "undefined") {
    let url= req.file.path;
    let filename= req.file.filename;
    listing.image= {url, filename};
    await listing.save();
    }

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);    // We can also take this on show route or res.redirect("listings") (Index Route);  
}

module.exports.destroyListing= async(req,res) => {
    let {id}= req.params;
    let deletedListing= await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
}