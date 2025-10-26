const express = require("express");
const router = express.Router();
const db = require("../config/database");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../uploads/uploads");
const path = require("path");
const fs = require("fs");

router.post("/my-details", authMiddleware, upload.single("resume"), (req, res) => {
    const { name, email, phone, address, profileImage, linkedIn, github, twitter, facebook, instagram, whatsapp, location, frontend, backend, database } = req.body;
    console.log(req.body);
    console.log("File received:", req.file);
    console.log("Body received:", req.body);

    if (!req.file || !name || !email || !phone || !address || !profileImage || !linkedIn || !github || !twitter || !facebook || !instagram || !whatsapp || !location || !frontend || !backend || !database) {
        return res.status(400).json({ status: 400, message: "All fields are required" });
    }

    const resumePath = req.file ? req.file.path : null;

    db.run(
        "INSERT INTO myDetails (name,email,phone,address,profileImage,resume,linkedIn,github,twitter,facebook,instagram,whatsapp,location,frontend,backend,database) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [name,email,phone,address,profileImage,resumePath,linkedIn,github,twitter,facebook,instagram,whatsapp,location,
            Array.isArray(frontend) ? JSON.stringify(frontend) : JSON.stringify(frontend.split(",")),
            Array.isArray(backend) ? JSON.stringify(backend) : JSON.stringify(backend.split(",")),
            Array.isArray(database) ? JSON.stringify(database) : JSON.stringify(database.split(",")),
        ],
        function(err) {
            if(err){
                console.error(err);
                return res.status(500).json({status:500,message:"Failed to add your details"});
            }
            res.json({status:200,message:"Your details added successfully"});
        }
    );
});



router.get("/my-details", authMiddleware, (req, res) => {

    db.all("SELECT * FROM myDetails", [], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({status: 500, message: "Failed to fetch your details" });
        }
      
 
    const formattedRows = rows.map(row => {
    const filename = path.basename(row.resume);
    return {
        ...row,
        frontend: JSON.parse(row.frontend),
        backend: JSON.parse(row.backend),
        database: JSON.parse(row.database),
        resumePath: `uploads/${filename}`,      
        resumeImage: `uploads/${filename}`,     
        resumeName: filename.split("-").slice(1).join("-") 
    };
});


        res.json({status: 200, rows:formattedRows});
    });
});

// router.patch("/my-details/:id", authMiddleware, upload.single("resume"), (req, res) => {
//     const {name, email, phone, address, profileImage, resume, linkedIn, github, twitter, facebook, instagram, whatsapp, location, frontend, backend, database } = req.body;
//     console.log(req.body);

//     if ( !name || !email || !phone || !address || !profileImage || !resume || !linkedIn || !github || !twitter || !facebook || !instagram || !whatsapp || !location || !frontend || !backend || !database) {
//         return res.status(400).json({status: 400, message: "All fields are required" });
//     }

//     db.run(
//         "UPDATE myDetails SET name = ?, email = ?, phone = ?, address = ?, profileImage = ?, resume = ?, linkedIn = ?, github = ?, twitter = ?, facebook = ?, instagram = ?, whatsapp = ?, location = ?, frontend = ?, backend = ?, database = ? WHERE id = ?",
//         [name,email,phone,address,profileImage,resume,linkedIn,github,twitter,facebook,instagram,whatsapp,location,
//             Array.isArray(frontend) ? JSON.stringify(frontend) : JSON.stringify(frontend.split(",")),
//             Array.isArray(backend) ? JSON.stringify(backend) : JSON.stringify(backend.split(",")),
//             Array.isArray(database) ? JSON.stringify(database) : JSON.stringify(database.split(","))],
//         function (err) {
//             if (err) {
//                 console.error(err);
//                 return res.status(500).json({status: 500, message: "Failed to update your details" });
//             }
//             res.json({status: 200, message: "Your details updated successfully" });
//         }
//     );
// });



router.patch("/my-details/:id", authMiddleware, upload.single("resume"), (req, res) => {
    const { id } = req.params;
    const { name, email, phone, address, profileImage, linkedIn, github, twitter, facebook, instagram, whatsapp, location, frontend, backend, database } = req.body;

    if (!name || !email || !phone || !address || !profileImage || !linkedIn || !github || !twitter || !facebook || !instagram || !whatsapp || !location || !frontend || !backend || !database) {
        return res.status(400).json({ status: 400, message: "All fields are required" });
    }

    
    db.get("SELECT resume FROM myDetails WHERE id = ?", [id], (err, row) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ status: 500, message: "Failed to fetch existing data" });
        }

        let newResumePath = row.resume; 
        if (req.file) {
            newResumePath = path.join("uploads", req.file.filename);

            
            if (row.resume && fs.existsSync(row.resume)) {
                try {
                    fs.unlinkSync(row.resume);
                    console.log("Old resume deleted:", row.resume);
                } catch (deleteErr) {
                    console.error("Failed to delete old resume:", deleteErr);
                }
            }
        }

        db.run(
            `UPDATE myDetails 
             SET name = ?, email = ?, phone = ?, address = ?, profileImage = ?, resume = ?, linkedIn = ?, github = ?, twitter = ?, facebook = ?, instagram = ?, whatsapp = ?, location = ?, frontend = ?, backend = ?, database = ?
             WHERE id = ?`,
            [
                name,
                email,
                phone,
                address,
                profileImage,
                newResumePath,
                linkedIn,
                github,
                twitter,
                facebook,
                instagram,
                whatsapp,
                location,
                Array.isArray(frontend) ? JSON.stringify(frontend) : JSON.stringify(frontend.split(",")),
                Array.isArray(backend) ? JSON.stringify(backend) : JSON.stringify(backend.split(",")),
                Array.isArray(database) ? JSON.stringify(database) : JSON.stringify(database.split(",")),
                id
            ],
            function (err) {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ status: 500, message: "Failed to update your details" });
                }

                res.json({
                    status: 200,
                    message: "Your details updated successfully",
                    resume: newResumePath
                });
            }
        );
    });
});





router.delete("/my-details/:id", authMiddleware, (req, res) => {
    const {id} = req.params;
    console.log(req.params);

    db.run(
        "DELETE FROM myDetails WHERE id = ?",
        [id],
        function (err) {
            if (err) {
                console.error(err);
                return res.status(500).json({status: 500, message: "Failed to delete your details" });
            }
            res.json({status: 200, message: "Your details deleted successfully" });
        }
    );
});




module.exports = router;
