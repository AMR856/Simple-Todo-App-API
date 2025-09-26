const bcrypt = require("bcrypt");

const verifyPassword = async (candidatePassword, hashedPasswordFromDb) => {
  const match = await bcrypt.compare(candidatePassword, hashedPasswordFromDb);
  return match;
};
  
module.exports = verifyPassword;