# Configuration Files

This directory is intended for project configuration files.

## What goes here:
- `config.json` - Main application configuration
- `database.json` - Database connection settings
- `api-keys.json` - API keys and external service configurations
- `settings.json` - User preferences and application settings

## What NOT to put here:
- `package.json` and `package-lock.json` - These belong in the root directory
- Environment variables (use `.env` files instead)
- Sensitive information (use environment variables)

## Example structure:
```json
{
  "api": {
    "baseUrl": "https://api.example.com",
    "timeout": 5000
  },
  "features": {
    "debug": false,
    "analytics": true
  }
}
```

**Note:** Never commit sensitive configuration files to version control. Use environment variables or `.env` files for secrets.
