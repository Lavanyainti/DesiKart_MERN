const profile=require('../model/profile')
const mongoose=require('mongoose')

async function addProfile(req,res) {
    const {userName, profileDesciption,address}=req.body;
    const profileImage=req.file ? req.file.filename : null;
    try{
        let existingProfile = await profile.findOne({ user:req.user._id });
    if (existingProfile) {
      // Update existing profile
      existingProfile.userName = userName;
      existingProfile.profileDesciption = profileDesciption;
      existingProfile.address=address;
      if (profileImage) existingProfile.profileImage = profileImage;
      await existingProfile.save();
      return res.status(200).json({ message: "Profile updated successfully" });
    } else {
      // Create new profile
      const newProfile = new profile({
        user:req.user._id,
        userName,
        profileImage,
        profileDesciption,
        address
      });
      await newProfile.save();
      return res.status(200).json({ message: "Profile created successfully" });
    }

    }catch(err){
        return res.status(500).json({message:"Error while upload profile "+err})
    }
}

async function getProfile(req,res) {
    try{
        const getProfileResult=await profile.findOne({user:req.user._id})
        if(getProfileResult){
            console.log(getProfileResult)
            return res.status(200).json({getProfileResult})
        }
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Failed to fetch profile "+err})
    }
}


const profileController={
    addProfile,
    getProfile,
}
module.exports=profileController