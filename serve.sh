#!/bin/bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Kill any existing node processes (optional - uncomment if needed)
# pkill -f node || true

# Run the Express server
echo "Starting wedding website server..."
node server.js

# Alternative: use npm scripts
# npm start