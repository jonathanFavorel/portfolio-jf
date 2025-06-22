import bcrypt from "bcrypt";
import dotenv from "dotenv";

// Charger les variables d'environnement
dotenv.config();

console.log("🔍 Diagnostic des variables d'environnement :\n");

// Vérifier si les variables existent
const adminUsername = process.env.ADMIN_USERNAME;
const adminPassword = process.env.ADMIN_PASSWORD;
const jwtSecret = process.env.JWT_SECRET;

console.log("ADMIN_USERNAME:", adminUsername ? "✅ Défini" : "❌ Manquant");
console.log("ADMIN_PASSWORD:", adminPassword ? "✅ Défini" : "❌ Manquant");
console.log("JWT_SECRET:", jwtSecret ? "✅ Défini" : "❌ Manquant");

console.log("\n📋 Valeurs actuelles :");
console.log("ADMIN_USERNAME =", adminUsername);
console.log(
  "ADMIN_PASSWORD =",
  adminPassword ? adminPassword.substring(0, 20) + "..." : "Non défini"
);
console.log(
  "JWT_SECRET =",
  jwtSecret ? jwtSecret.substring(0, 20) + "..." : "Non défini"
);

// Test de connexion avec les identifiants actuels
console.log("\n🧪 Test de connexion :");
const testUsername = "admin";
const testPassword = "@Aspire59121";

console.log("Test avec :");
console.log("- Username:", testUsername);
console.log("- Password:", testPassword);

if (adminUsername && adminPassword) {
  // Vérifier le nom d'utilisateur
  const usernameMatch = testUsername === adminUsername;
  console.log("✅ Nom d'utilisateur correct:", usernameMatch);

  // Vérifier le mot de passe
  bcrypt.compare(testPassword, adminPassword, function (err, isMatch) {
    if (err) {
      console.log(
        "❌ Erreur lors de la vérification du mot de passe:",
        err.message
      );
    } else {
      console.log("✅ Mot de passe correct:", isMatch);
    }

    if (usernameMatch && isMatch) {
      console.log("\n🎉 Connexion réussie !");
    } else {
      console.log("\n❌ Connexion échouée !");
      console.log("\n💡 Solutions possibles :");
      console.log("1. Vérifiez que le fichier .env est à la racine du projet");
      console.log("2. Vérifiez que les variables sont correctement définies");
      console.log("3. Redémarrez le serveur après modification du .env");
    }
  });
} else {
  console.log("\n❌ Variables d'environnement manquantes !");
  console.log("💡 Créez un fichier .env à la racine du projet avec :");
  console.log("ADMIN_USERNAME=admin");
  console.log(
    "ADMIN_PASSWORD=$2b$10$eKwY92vAFICeMUW25gc/IOsOiAgH/To132jEkS5GmulptYmx6wphq"
  );
  console.log(
    "JWT_SECRET=b686bba559a60f8a2bd9c028790991127bb017a170cd8fbdc5a313b75e09a6b8"
  );
}
