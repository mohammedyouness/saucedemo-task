class Helpers {
  // Utility: generate unique username
  generateUsername(prefix = 'user') {
    return prefix + Date.now();
  }
}
export default Helpers;