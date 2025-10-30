const express = require("express");
const router = express.Router();
const db = require("../config/database");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/projects", authMiddleware, (req, res) => {
    const {image, title, technologies, gitUrl, projectLink, description } = req.body;
    console.log(req.body);

    if ( !image || !title || !technologies || !gitUrl || !projectLink || !description) {
        return res.status(400).json({ message: "Image, Title, Technologies, gitUrl, projectLink and description are required" });
    }

    db.run(
        "INSERT INTO projects (image,title,technologies, gitUrl, projectLink, description) VALUES (?, ?, ?, ?, ?, ?)",
        [image,title, gitUrl, projectLink, description,
            Array.isArray(technologies) ? JSON.stringify(technologies) : JSON.stringify(technologies.split(","))
        ],
        function (err) {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Failed to add project" });
            }
            res.status(201).json({ message: "Project added successfully", status:200 });
        }
    );
});

router.get("/projects",  (req, res) => {
    db.all("SELECT * FROM projects", [], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to fetch projects" });
        }

        const formattedRows = rows.map(row => ({
            ...row,
            technologies: JSON.parse(row.technologies),
        }));


        res.json({rows:formattedRows, status:200, message:"Projects fetched successfully"});
    });
});

router.delete("/projects/:id", authMiddleware, (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM projects WHERE id = ?", [id], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to delete project" });
        }
        res.json({ message: "Project deleted successfully", status:200 });
    });
});

router.patch("/projects/:id", authMiddleware, (req, res) => {
    const { id } = req.params;
    const { image, title, technologies, gitUrl, projectLink, description } = req.body;
    db.run(
        "UPDATE projects SET image = ?, title = ?, technologies = ?, gitUrl = ?, projectLink = ?, description = ? WHERE id = ?",
        [image, title, Array.isArray(technologies) ? JSON.stringify(technologies) : JSON.stringify(technologies.split(",")), gitUrl, projectLink, description, id],
        (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Failed to update project" });
            }
            res.json({ message: "Project updated successfully", status:200 });
        }
    );
});

router.get("/projects/search", authMiddleware, (req, res) => {
    const { search } = req.query;
    db.all("SELECT * FROM projects WHERE title LIKE ?", [`%${search}%`], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to fetch projects" });
        }
        const formattedRows = rows.map(row => ({
            ...row,
            technologies: JSON.parse(row.technologies),
        }));
        res.json({rows:formattedRows, status:200, message:"Projects fetched successfully"});
    });
});


module.exports = router;
