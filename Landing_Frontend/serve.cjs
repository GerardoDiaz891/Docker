// serve.cjs
const { exec } = require("child_process");

const port = process.env.PORT;

if (!port) {
  console.error("❌ ERROR: process.env.PORT no está definido");
  process.exit(1);
}

const command = `npx serve -s dist -l ${port}`;

console.log(`👉 Starting frontend on port ${port}...`);
exec(command, (err, stdout, stderr) => {
  if (err) {
    console.error("❌ Error starting serve:", err);
    process.exit(1);
  }

  if (stdout) console.log(stdout);
  if (stderr) console.error(stderr);
});
