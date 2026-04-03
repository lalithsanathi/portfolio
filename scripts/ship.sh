#!/usr/bin/env bash
# Stage everything, commit with your message, push to origin.
# Usage from repo root: npm run ship -- "your commit message"
set -euo pipefail
cd "$(dirname "$0")/.."
if [[ -z "${1:-}" ]]; then
  echo "Usage: npm run ship -- \"Describe what you changed\""
  echo ""
  echo "Other handy commands (also in package.json):"
  echo "  npm run git:status   → git status"
  echo "  npm run git:push     → git push (after you’ve committed)"
  exit 1
fi
git add -A
git commit -m "$1"
git push
