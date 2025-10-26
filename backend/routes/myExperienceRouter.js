const express = require("express");
const router = express.Router();
const db = require("../config/database");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/my-experience",authMiddleware, async (req, res) => {
    const exp = req.body;
    console.log(exp, "experienceData");

    if (!exp.company || !exp.position || !exp.duration) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        db.run(
            `INSERT INTO myExperience (company, position, duration) VALUES (?, ?, ?)`,
            [exp.company, exp.position, exp.duration],
            function (err) {
                if (err) {
                    console.error("Error inserting experience:", err.message);
                    return res.status(500).json({ message: "DB error" });
                }

                const experienceId = this.lastID;
                const insertResponsibility = db.prepare(
                    `INSERT INTO responsibilities (experienceId, responsibility) VALUES (?, ?)`
                );

                
                const responsibilities = Array.isArray(exp.responsibilities)
                    ? exp.responsibilities
                    : exp.responsibilities.split(",").map(r => r.trim().replace(/^"|"$/g, ""));

                responsibilities.forEach(r => {
                    if (r) insertResponsibility.run(experienceId, r);
                });

                insertResponsibility.finalize();

                res.status(200).json({status: 200, message: "Experience added successfully" });
            }
        );
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({status: 500, message: "Server error" });
    }
});


router.get("/my-experience",authMiddleware, async (req, res) => {
    try {
        db.all("SELECT * FROM myExperience", [], async (err, experiences) => {
            if (err) {
                console.error(err);
                return res.status(500).json({status: 500, message: "Failed to fetch experiences" });
            }

            const experiencePromises = experiences.map(exp => {
                return new Promise((resolve, reject) => {
                    db.all("SELECT responsibility FROM responsibilities WHERE experienceId = ?", [exp.id], (err, responsibilities) => {
                        if (err) return reject(err);
                        exp.responsibilities = responsibilities.map(r => r.responsibility);
                        resolve(exp);
                    });
                });
            });

            const result = await Promise.all(experiencePromises);

            res.status(200).json({
                status: 200,
                message: "Experiences fetched successfully",
                data: result
            });
        });
    } catch (error) {
        console.error("Error fetching experiences:", error);
        res.status(500).json({status: 500, message: "Server error" });
    }
});

router.patch("/my-experience/:id",authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { company, position, duration, responsibilities } = req.body;

    if (!company || !position || !duration) {
        return res.status(400).json({status: 400, message: "Missing required fields" });
    }

    try {
        
        db.run(
            `UPDATE myExperience SET company = ?, position = ?, duration = ? WHERE id = ?`,
            [company, position, duration, id],
            function (err) {
                if (err) {
                    console.error("Error updating experience:", err.message);
                    return res.status(500).json({status: 500, message: "DB error" });
                }

                db.run(`DELETE FROM responsibilities WHERE experienceId = ?`, [id], function (err) {
                    if (err) {
                        console.error("Error deleting old responsibilities:", err.message);
                        return res.status(500).json({status: 500, message: "Failed to delete old responsibilities" });
                    }

                    const insertResponsibility = db.prepare(
                        `INSERT INTO responsibilities (experienceId, responsibility) VALUES (?, ?)`
                    );

                    const newResponsibilities = Array.isArray(responsibilities)
                        ? responsibilities
                        : responsibilities.split(",").map(r => r.trim().replace(/^"|"$/g, ""));

                    newResponsibilities.forEach(r => {
                        if (r) insertResponsibility.run(id, r);
                    });

                    insertResponsibility.finalize();

                    res.status(200).json({
                        status: 200,
                        message: "Experience updated successfully"
                    });
                });
            }
        );
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({status: 500, message: "Server error" });
    }
});



router.delete("/my-experience/:id",authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        db.run("DELETE FROM myExperience WHERE id = ?", [id], function (err) {
            if (err) {
                console.error("Error deleting experience:", err.message);
                return res.status(500).json({status: 500, message: "DB error" });
            }
            res.status(200).json({status: 200, message: "Experience deleted successfully" });
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({status: 500, message: "Server error" });
    }
});

router.get("/my-experience/search",authMiddleware, async (req, res) => {
    const { search } = req.query;
    db.all("SELECT * FROM myExperience WHERE company LIKE ?", [`%${search}%`], async (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({status: 500, message: "Failed to fetch experiences" });
        }
        const experiencePromises = rows.map(exp => {
            return new Promise((resolve, reject) => {
                db.all("SELECT responsibility FROM responsibilities WHERE experienceId = ?", [exp.id], (err, responsibilities) => {
                    if (err) return reject(err);
                    exp.responsibilities = responsibilities.map(r => r.responsibility);
                    resolve(exp);
                });
            });
        });
        const result = await Promise.all(experiencePromises);
        res.json({data:result, status:200, message:"Experiences fetched successfully"});
    });
})





module.exports = router;