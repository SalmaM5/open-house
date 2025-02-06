
const Listing = require('../models/listing')


const index = async (req, res) => {
    try {
        const listings = await Listing.find().populate('owner')
        
        res.render('listing/index.ejs', {
            title: 'Listing',
            listings
        })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}

const newListing = (req,res) =>{

    res.render('listing/new.ejs', {
        title:'new'
})
}

const Createlisting = async (req,res)=>{
    try{
    // req.body.owner=req.session.user._id
    req.body.owner=req.params.userId
    await Listing.create(req.body)
    res.redirect('/listing')
    console.log('request body: ', req.body)
    }
    catch(error){
        console.log(error)

    }
}

const show = async (req,res)=>{

      try{
           const listing = await Listing.findById(req.params.listingId).populate('owner')
           console.log(listing)
            res.render('listing/show.ejs' ,{
                title: listing.streetAdress,
                listing
            })
      }
      catch(error){
        console.log(error)
        res.redirect('/')
          
      }
}

const deleteListing = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.listingId) // find the listing

        if (listing.owner.equals(req.params.userId)) { // check if signed in user and listing owner are the same
            await listing.deleteOne() // delete the listing
            res.redirect('/listing')
        } else {
            res.send("You don't have permission to do that.") // if owner and signed in user are different - send message
        }

    } catch(error) {
        console.log(error)
        res.redirect('/')
    }
}

const edit = async(req,res)=>{
          try{
            const listing = await Listing.findById(req.params.listingId).populate('owner')
            if(listing.owner.equals(req.params.userId)) {
                res.render('listing/edit.ejs', {
                    title: `Edit ${listing.streetAdress}`,
                    listing
                })
            } else {
                res.send("You don't have permission to do that.") // if owner and signed in user are different - send message
            }
   
          }
          catch(error){
         console.log(error)
         res.redirect('/')

          }

}

// const update = async (res,req)=>{

//        try{
//         const listing = await Listing.findByIdAndUpdate(
//             req.params.listingId,
//             req.body,
//             {new: true}

//         )
//         res.redirect(`/listing/${listing._id}`)

//        }

//        catch (error){
//         console.log(error)
//         res.redirect('/')

//        }

// }
const update = async (req, res) => {
    try {
        const listing = await Listing.findByIdAndUpdate(
            req.params.listingId,
            req.body,
            { new: true }
        )
        res.redirect(`/listing/${listing._id}`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}

module.exports={
    index,
    newListing,
    Createlisting,
    show,
    deleteListing,
    edit,
    update,
}