// scripts/add-shebang.js
import fs from "fs";
import path from "path";

const filePath = path.resolve("dist", "index.js");
const shebang = "#!/usr/bin/env node\n";

try {
  const original = fs.readFileSync(filePath, "utf-8");
  if (!original.startsWith(shebang)) {
    fs.writeFileSync(filePath, shebang + original);
    console.log("✅ Shebang agregado a dist/index.js");
  } else {
    console.log("ℹ️ Ya tenía shebang");
  }
} catch (err) {
  console.error("❌ Error al agregar shebang:", err.message);
  process.exit(1);
}
