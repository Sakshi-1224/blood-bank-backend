import Member from "../models/Member.js";
import { Op } from "sequelize";

export const searchDonors = async (req, res) => {
  try {
    const { blood_group, city, minAge, maxAge } = req.query;

    if (!blood_group) {
      return res.status(400).json({
        message: "blood_group is mandatory"
      });
    }

    const maxAgeNum = Number(maxAge);
    const minAgeNum = Number(minAge);

    if (maxAge && maxAgeNum > 60) {
      return res.status(400).json({
        message: "Maximum donor age cannot exceed 60"
      });
    }

    const whereCondition = {
      blood_group,
      is_active: true
    };

    if (city) {
      whereCondition.current_address = {
        [Op.like]: `%${city}%`
      };
    }

    if (minAge || maxAge) {
      const today = new Date();
      const dobCondition = {};

      if (maxAge) {
        const minDOB = new Date();
        minDOB.setFullYear(today.getFullYear() - maxAgeNum);
        dobCondition[Op.gte] = minDOB;
      }

      if (minAge) {
        const maxDOB = new Date();
        maxDOB.setFullYear(today.getFullYear() - minAgeNum);
        dobCondition[Op.lte] = maxDOB;
      }

      whereCondition.date_of_birth = dobCondition;
    }

    const donors = await Member.findAll({
      where: whereCondition,
      attributes: [
        "id",
        "name",
        "blood_group",
        "mobile_number",
        "date_of_birth",
        "current_address"
      ]
    });

    res.status(200).json({
      message: `Found ${donors.length} donor(s)`,
      donors
    });

  } catch (error) {
    console.error("Error searching donors:", error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
};