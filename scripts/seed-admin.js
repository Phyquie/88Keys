const mongoose = require("mongoose");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

// Manually parse .env file
const envPath = path.join(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, "utf-8");
  envConfig.split("\n").forEach((line) => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || "";
      // Remove double quotes if present
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  });
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Error: MONGODB_URI is not defined in .env file.");
  process.exit(1);
}

// User Schema definition (matching lib/db.ts)
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  salt: { type: String, required: true },
  role: { type: String, required: true, default: "admin" }
}, { timestamps: true });

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
}

function generateSalt() {
  return crypto.randomBytes(16).toString("hex");
}

async function run() {
  const args = process.argv.slice(2);
  const username = (args[0] || process.env.ADMIN_USERNAME || "admin").toLowerCase();
  const password = args[1] || process.env.ADMIN_PASSWORD || "admin123";

  console.log(`Connecting to MongoDB...`);
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB successfully.");

    // Delete all existing admins / users
    console.log("Deleting all existing admin users...");
    const deleteResult = await UserModel.deleteMany({});
    console.log(`Deleted ${deleteResult.deletedCount} existing user(s).`);

    // Create the new admin user
    console.log(`Creating admin user '${username}'...`);
    const salt = generateSalt();
    const passwordHash = hashPassword(password, salt);

    await UserModel.create({
      username,
      passwordHash,
      salt,
      role: "admin"
    });
    console.log(`Admin '${username}' created successfully!`);
  } catch (error) {
    console.error("Error during seeding:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}

run();
