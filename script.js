const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;
const submissions = [];
let nextId = 1;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function getPasswordStrength(password) {
	if (!password) return "-";
	let score = 0;
	if (password.length >= 8) score += 1;
	if (/[A-Z]/.test(password)) score += 1;
	if (/[a-z]/.test(password)) score += 1;
	if (/\d/.test(password)) score += 1;
	if (/[^A-Za-z0-9]/.test(password)) score += 1;

	if (score <= 2) return "Weak";
	if (score <= 4) return "Medium";
	return "Strong";
}

function validateSubmission(payload) {
	const {
		username = "",
		email = "",
		age = "",
		gender = "",
		bio = "",
		agree = "",
		password = "",
		confirmPassword = "",
	} = payload;

	const interestsInput = payload.interests;
	const interests = Array.isArray(interestsInput)
		? interestsInput
		: interestsInput
		? [interestsInput]
		: [];

	const agreed = agree === "on" || agree === true || agree === "true";
	const errors = [];
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const usernamePattern = /^[a-zA-Z0-9 ]{3,30}$/;
	const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
	const parsedAge = Number(age);

	if (!usernamePattern.test(String(username).trim())) {
		errors.push("Username must be 3-30 characters (letters, numbers, spaces).");
	}
	if (!emailPattern.test(String(email).trim())) {
		errors.push("A valid email is required.");
	}
	if (!Number.isInteger(parsedAge) || parsedAge < 18 || parsedAge > 100) {
		errors.push("Age must be a whole number between 18 and 100.");
	}
	if (!["male", "female", "other"].includes(gender)) {
		errors.push("Please select a gender.");
	}
	if (interests.length === 0) {
		errors.push("Please select at least one interest.");
	}
	if (String(bio).trim().length < 20 || String(bio).trim().length > 250) {
		errors.push("Bio must be between 20 and 250 characters.");
	}
	if (!passwordPattern.test(String(password))) {
		errors.push("Password must be at least 8 characters and include uppercase, lowercase, number, and special character.");
	}
	if (String(password) !== String(confirmPassword)) {
		errors.push("Confirm password must match the password.");
	}
	if (!agreed) {
		errors.push("You must agree to the terms.");
	}

	return {
		errors,
		cleaned: {
			username: String(username).trim(),
			email: String(email).trim(),
			age: parsedAge,
			gender,
			interests,
			bio: String(bio).trim(),
			agree: agreed,
			password: String(password),
			passwordStrength: getPasswordStrength(String(password)),
		},
	};
}

function buildEntry(cleaned, existing) {
	const now = new Date().toLocaleString();
	if (existing) {
		return {
			...existing,
			...cleaned,
			updatedAt: now,
		};
	}

	return {
		id: nextId++,
		...cleaned,
		timestamp: now,
		updatedAt: now,
	};
}

app.get("/", (req, res) => {
	res.render("index", {
		title: "Advance Form",
		totalSubmissions: submissions.length,
	});
});

// RESTful CRUD API
app.get("/api/submissions", (req, res) => {
	res.json({ items: submissions.slice().reverse(), total: submissions.length });
});

app.get("/api/submissions/:id", (req, res) => {
	const id = Number(req.params.id);
	const item = submissions.find((entry) => entry.id === id);
	if (!item) {
		return res.status(404).json({ error: "Submission not found." });
	}
	return res.json(item);
});

app.post("/api/submissions", (req, res) => {
	const { errors, cleaned } = validateSubmission(req.body);
	if (errors.length > 0) {
		return res.status(400).json({ errors });
	}

	const entry = buildEntry(cleaned);
	submissions.push(entry);
	return res.status(201).json(entry);
});

app.put("/api/submissions/:id", (req, res) => {
	const id = Number(req.params.id);
	const index = submissions.findIndex((entry) => entry.id === id);
	if (index === -1) {
		return res.status(404).json({ error: "Submission not found." });
	}

	const { errors, cleaned } = validateSubmission(req.body);
	if (errors.length > 0) {
		return res.status(400).json({ errors });
	}

	const updated = buildEntry(cleaned, submissions[index]);
	submissions[index] = updated;
	return res.json(updated);
});

app.delete("/api/submissions/:id", (req, res) => {
	const id = Number(req.params.id);
	const index = submissions.findIndex((entry) => entry.id === id);
	if (index === -1) {
		return res.status(404).json({ error: "Submission not found." });
	}

	submissions.splice(index, 1);
	return res.status(204).send();
});

app.get("/submissions", (req, res) => {
	res.render("submissions", {
		title: "Submission",
	});
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
