// scripts/create-issues-from-md.js
// Create GitHub issues from inbox/issues.md
// ENV required when running locally: GITHUB_TOKEN, REPO="owner/repo"

const fs = require('fs');
const path = require('path');
const { Octokit } = require('@octokit/rest');

const SRC = path.join(process.cwd(), 'inbox', 'issues.md');
if (!fs.existsSync(SRC)) {
  console.error('inbox/issues.md not found');
  process.exit(1);
}

const token = process.env.GITHUB_TOKEN;
const repoFull = process.env.REPO || process.env.GITHUB_REPOSITORY; // GitHub Actions sets this
if (!repoFull) {
  console.error('Missing REPO (expected "owner/name"). Set REPO env or run in GitHub Actions.');
  process.exit(1);
}
if (!token) {
  console.error('Missing GITHUB_TOKEN env. Use a PAT locally or GitHub-provided token in Actions.');
  process.exit(1);
}
const [owner, repo] = repoFull.split('/');
const octo = new Octokit({ auth: token });

// --- parse helpers ----------------------------------------------------------
function splitIssues(fileText) {
  // split on lines that are exactly "# ISSUE"
  return fileText.split(/^#\s*ISSUE\s*$/m).map(s => s.trim()).filter(Boolean);
}

function section(text, startHeader, endHeaderRegex) {
  const reStart = new RegExp(`^\\s*${startHeader}\\s*`, 'mi');
  const mStart = reStart.exec(text);
  if (!mStart) return '';
  const after = text.slice(mStart.index + mStart[0].length);
  const mEnd = endHeaderRegex ? after.match(endHeaderRegex) : null;
  const end = mEnd ? mEnd.index : after.length;
  return after.slice(0, end).trim();
}

function parseIssueBlock(b) {
  // Expected format (order matters):
  // **Title:** [Task]: ...
  // **Labels:** ai-draft, ready
  // ## Goal
  // ...
  // ## Acceptance criteria
  // ...
  // ## Allowed paths
  // ...
  // ## Preview URL
  // ...
  const titleMatch = b.match(/\*\*Title:\*\*\s*(.+)\s*/i);
  const labelsMatch = b.match(/\*\*Labels:\*\*\s*([^\n]+)\n/i);

  const bodyStart = /(^|\n)##\s*Goal\s*/i;
  const nextHdr = /\n##\s*(Acceptance criteria|Allowed paths|Preview URL)\b/i;

  const goal = section(b, '##\\s*Goal', nextHdr);
  const acc = section(b, '##\\s*Acceptance criteria', /\n##\s*(Allowed paths|Preview URL)\b/i);
  const paths = section(b, '##\\s*Allowed paths', /\n##\s*Preview URL\b/i) || 'assets/**/*.css, assets/**/*.js';
  const preview = section(b, '##\\s*Preview URL', /$(?!\s\S)/) || '<!-- TODO: add preview URL -->';

  const title = titleMatch ? titleMatch[1].trim() : 'Untitled task';
  const labels = labelsMatch
    ? labelsMatch[1].split(',').map(s => s.trim()).filter(Boolean)
    : ['ai-draft', 'ready'];

  const body = `## Goal
${goal}

## Acceptance criteria
${acc}

## Allowed paths
${paths}

## Preview URL
${preview}
`;

  return { title, labels, body };
}

// --- main -------------------------------------------------------------------
(async () => {
  const txt = fs.readFileSync(SRC, 'utf8');
  const blocks = splitIssues(txt);
  if (!blocks.length) {
    console.log('No issues found in inbox/issues.md');
    return;
  }

  // Ensure labels exist
  async function ensureLabel(name) {
    try {
      await octo.issues.getLabel({ owner, repo, name });
    } catch {
      try {
        await octo.issues.createLabel({ owner, repo, name, color: 'ededed' });
      } catch (_) {}
    }
  }
  await ensureLabel('ai-draft');
  await ensureLabel('ready');

  for (const raw of blocks) {
    const { title, labels, body } = parseIssueBlock(raw);
    const res = await octo.issues.create({ owner, repo, title, labels, body });
    console.log(`Created #${res.data.number} ${title}`);
  }
})();
