const User=require('../model/User')
const review=require('../model/review')
const profile =require('../model/profile')

async function addReview(req,res) {
    const {comment}=req.body
    const {id}=req.params
    const newComment=new review({
        user:req.user._id,
        product:id,
        comment
    })
    try{
        await newComment.save();
        return res.status(200).json({message:"Commnet added"})

    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Failed to fetch profile "+err.message})
    }
}

async function getReview(req, res) {
  const { id} = req.params;

  try {
    // Step 1: Find reviews with user info
    const reviews = await review.find({ product: id }).populate('user');

    // Step 2: Attach user profile to each review
    const result = await Promise.all(
      reviews.map(async (r) => {
        const userProfile = await profile.findOne({ user: r.user._id });
        return {
          _id: r._id,
          user: r.user,
          comment: r.comment,
          createdAt:r.createdAt,
          product: r.product,
          userProfile: userProfile || null,
        };
      })
    );
                    // {
                    //   "reviews": [
                    //     {
                    //       "_id": "review123",
                    //       "user": {
                    //         "_id": "user123",
                    //         "email": "test@gmail.com"
                    //       },
                    //       "comment": "Nice product!",
                    //       "product": "product456",
                    //       "userProfile": {
                    //         "_id": "profile789",
                    //         "userName": "Lavanya",
                    //         "profileImage": "dp.jpg"
                    //       }
                    //     }
                    //   ]
                    // }
    console.log(result)

    return res.status(200).json({ reviewsResult: result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to fetch reviews: " + err.message });
  }
}

const reviewController={
    addReview,
    getReview
}
module.exports=reviewController