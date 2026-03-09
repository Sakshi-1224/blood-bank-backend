
import  Donor  from '../models/Donor.js';

export const searchDonors = async (req, res) => {
  try {
    const { bloodGroup, city, region } = req.query;

    if (!bloodGroup || !city) {
      return res.status(400).json({ 
        message: "Both 'bloodGroup' and 'city' are mandatory search criteria." 
      });
    }

    const queryCondition = {
      bloodGroup: bloodGroup,
      city: city,
      verificationStatus: 'Active', 
      isAvailable: true             
    };

    if (region) {
      queryCondition.region = region;
    }

    const donors = await Donor.findAll({
      where: queryCondition,
      attributes: ['id', 'fullName', 'bloodGroup', 'city', 'state', 'region', 'phone', 'address'] 
    });

    if (donors.length === 0) {
      return res.status(404).json({ message: "No active donors found for this criteria." });
    }

    res.status(200).json({
      message: `Found ${donors.length} active donor(s).`,
      donors
    });

  } catch (error) {
    console.error("Error in searchDonors:", error);
    res.status(500).json({ message: "Internal server error during search" });
  }
};