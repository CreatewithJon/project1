# Git + SSH Authentication — Complete Reference

> Your golden source for understanding and maintaining the Git/GitHub/SSH setup on this machine.

---

## Current Architecture (What's Running)

```
Your Mac
├── ~/.ssh/id_ed25519          ← Private key (NEVER share, NEVER copy elsewhere)
├── ~/.ssh/id_ed25519.pub      ← Public key (safe to share — on GitHub)
├── ~/.ssh/config              ← Tells SSH to use this key for github.com
├── ~/.ssh/known_hosts         ← GitHub's server fingerprint (prevents MITM)
└── ~/.bash_profile            ← Auto-starts ssh-agent on terminal open

GitHub Account (CreatewithJon)
└── Settings → SSH Keys
    └── "MacBook Pro" → matches id_ed25519.pub

Repositories
├── my-sample-proj  → git@github.com:CreatewithJon/project1.git
└── signal-dashboard → git@github.com:CreatewithJon/Signal-Dasboard.git
```

---

## How It Works (Plain English)

When you run `git push`:

```
1. Git sees the remote is git@github.com:...  (SSH format)
2. SSH reads ~/.ssh/config → "use id_ed25519 for github.com"
3. SSH agent provides the private key
4. SSH connects to github.com port 22
5. GitHub sends a challenge: "sign this random message"
6. Your private key signs it
7. GitHub verifies the signature with your public key on file
8. ✓ Access granted — push proceeds
```

No password. No token. No expiry.

---

## Daily Workflow

```bash
# Normal day — just work
git add .
git commit -m "your message"
git push        # Just works. No prompts.

# Pull latest
git pull

# Check status
git status
```

---

## Branching Strategy

```bash
# Always start from fresh main
git checkout main
git pull

# Create feature branch
git checkout -b feature/my-feature-name

# Work, commit, push
git add .
git commit -m "feat: describe what this does"
git push        # push.default=current means no need to set upstream

# Merge back (do on GitHub via PR, or locally)
git checkout main
git merge feature/my-feature-name
git push
git branch -d feature/my-feature-name  # delete local branch
```

**Branch naming conventions:**
- `feature/` — new functionality
- `fix/` — bug fixes
- `docs/` — documentation only
- `refactor/` — code restructuring

---

## Commit Message Format

```
type: short description (under 72 chars)

Optional longer explanation.

Examples:
feat: add lead scoring to prospect pipeline
fix: resolve JSON parse error in outreach route
docs: update GH-600 study guide domain 2
refactor: extract all system prompts to lib/prompts
```

---

## Troubleshooting Guide

### "Permission denied (publickey)"

**Diagnosis:** SSH is working but GitHub doesn't recognize your key.

```bash
# Check if key is loaded in agent
ssh-add -l

# If "no identities" — reload it
eval "$(ssh-agent -s)"
ssh-add --apple-use-keychain ~/.ssh/id_ed25519

# Test again
ssh -T git@github.com
```

If still failing: your public key may not be on GitHub.
Go to https://github.com/settings/ssh and verify `MacBook Pro` is listed.

---

### "Host key verification failed"

```bash
# Re-add GitHub's host key
ssh-keyscan -t ed25519 github.com >> ~/.ssh/known_hosts
ssh -T git@github.com
```

---

### "Repository not found" or "Could not read from remote"

```bash
# Check your remote URL
git remote -v

# Should look like:
# origin  git@github.com:CreatewithJon/project1.git (fetch)
# origin  git@github.com:CreatewithJon/project1.git (push)

# If it shows https:// — convert it:
git remote set-url origin git@github.com:CreatewithJon/REPO-NAME.git
```

---

### "SSH agent has no identities" after reboot

```bash
eval "$(ssh-agent -s)"
ssh-add --apple-use-keychain ~/.ssh/id_ed25519
```

This is automatic on new terminal windows (handled by ~/.bash_profile).
If it's not automatic, check that ~/.bash_profile has the ssh-agent block.

---

### Vercel deployment broken after SSH migration

Vercel connects to GitHub via OAuth, not SSH. SSH migration doesn't affect Vercel.
If Vercel breaks, check:
- Vercel → Settings → Git Integration → GitHub connection still authorized
- Environment variables still set (run `npx vercel env ls`)

---

## Setting Up SSH on a New Machine

```bash
# 1. Generate new key (one per machine, not shared)
ssh-keygen -t ed25519 -C "machine-name-github" -f ~/.ssh/id_ed25519 -N ""

# 2. Configure SSH
cat > ~/.ssh/config << 'EOF'
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519
  AddKeysToAgent yes
  UseKeychain yes
EOF
chmod 600 ~/.ssh/config

# 3. Add GitHub host key
ssh-keyscan -t ed25519 github.com >> ~/.ssh/known_hosts

# 4. Load into agent
eval "$(ssh-agent -s)"
ssh-add --apple-use-keychain ~/.ssh/id_ed25519

# 5. Add public key to GitHub
cat ~/.ssh/id_ed25519.pub | pbcopy
# → github.com/settings/ssh/new → paste → save

# 6. Test
ssh -T git@github.com

# 7. Set global git config
git config --global user.name "Jonathan Cardona"
git config --global user.email "your@email.com"
git config --global init.defaultBranch main
git config --global push.default current
git config --global url."git@github.com:".insteadOf "https://github.com/"

# 8. Convert repos to SSH
git remote set-url origin git@github.com:CreatewithJon/REPO.git
```

---

## Environment Variable Management

### The Rule
```
.env.local          ← Local only. In .gitignore. NEVER commit.
.env.example        ← Template with key names, no values. COMMIT THIS.
Vercel dashboard    ← Production values. Set via CLI, not UI.
GitHub Secrets      ← CI/CD values. Set via GitHub → Repo → Settings → Secrets.
```

### Setting Vercel env vars
```bash
# Add (will prompt for value)
npx vercel env add VARIABLE_NAME production --scope createwithjons-projects

# List
npx vercel env ls --scope createwithjons-projects

# Remove
npx vercel env rm VARIABLE_NAME production --scope createwithjons-projects
```

### Checking for exposed secrets
```bash
# Before committing, always check
git diff --cached | grep -i "api_key\|secret\|password\|token"

# If you accidentally commit a secret:
# 1. Rotate the secret IMMEDIATELY (generate a new one)
# 2. Remove from git history: git filter-branch or BFG Repo Cleaner
# 3. Force push: git push --force
# 4. The old secret is compromised — rotating is non-negotiable
```

---

## Security Checklist

- [ ] SSH key exists at `~/.ssh/id_ed25519`
- [ ] Public key listed at github.com/settings/ssh
- [ ] Both repos use `git@github.com:` format (not https://)
- [ ] No PATs hardcoded in remote URLs (`git remote -v` to verify)
- [ ] All PATs revoked at github.com/settings/tokens (if not needed)
- [ ] `.env.local` is in `.gitignore`
- [ ] No secrets in commit history (`git log -p | grep -i secret`)
- [ ] Vercel env vars set via CLI (not in code)
- [ ] SSH agent auto-starts in `~/.bash_profile`

---

## When to Use a PAT (Rare Cases)

SSH handles 99% of developer needs. PATs are only needed for:

| Use case | Tool |
|---|---|
| `git push` / `git pull` | SSH ✓ (never need PAT) |
| GitHub API calls (create repo, manage secrets) | GitHub CLI (`gh`) |
| Vercel GitHub integration | OAuth via Vercel dashboard |
| GitHub Actions CI/CD | GitHub Secrets (not PATs) |
| Automated scripts that call GitHub API | PAT with minimal scopes, stored in secret manager |

If you find yourself needing a PAT for something that SSH should handle — stop and investigate. Something is misconfigured.

---

*Last updated: 2026-05-20 | Machine: MacBook Pro | Key: SHA256:cFDF3yNvWQMofjYScWmNj4p8D3KCADlaJE+fCbXRapA*
