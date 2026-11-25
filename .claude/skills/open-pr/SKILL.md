---
name: open-pr
description: Push the current branch and open a GitHub pull request against the developer branch. Use when the user has committed their changes and wants a PR opened.
disable-model-invocation: true
---

# Open a PR against developer

Push the current branch to `origin` and open a pull request into `developer` using the GitHub CLI (`gh`). Run the checks in order and stop at the first one that fails, telling the user what is wrong and how to fix it. Never fix a failed check yourself (don't commit, push `developer`, or log in for them).

## 1. Checks

1. **Branch:** `git branch --show-current`. Stop if it is `main`, `developer`, or empty (detached HEAD): PRs come from a feature branch.
2. **Clean working tree:** `git status --porcelain`. If anything is listed, stop, show the files, and ask the user to commit or stash them first. Only committed work goes into the PR.
3. **Target exists on GitHub:** `git fetch origin`, then `git rev-parse --verify origin/developer`. If it fails, stop: `developer` must be pushed once with `git push -u origin developer`.
4. **Something to merge:** `git log origin/developer..HEAD --oneline`. If empty, stop: the branch has no commits that `developer` doesn't already have.
5. **GitHub CLI ready:** `gh auth status`. If `gh` is missing, tell the user to run `winget install GitHub.cli`, restart the terminal, then `gh auth login`. If it is installed but not logged in, tell them to run `gh auth login`.

## 2. Existing PR

Run `gh pr view --json url,state,baseRefName`. If an open PR already exists for this branch, push with `git push -u origin HEAD` (this updates the PR), show its URL, and stop. Don't create a second PR.

## 3. Draft the PR

Read the commits from check 4 and `git diff origin/developer...HEAD --stat` to understand the change. Draft:

- **Title:** the commit subject if there is one commit; otherwise a short summary of the change (under 70 characters).
- **Body:**

  ```markdown
  ## Summary
  - <what changed and why, 1-3 bullets>

  ## Commits
  - <one line per commit>
  ```

Show the user the branch, the target (`developer`), the title and the body. **Wait for them to approve or edit before continuing**, because the next step publishes to GitHub.

## 4. Push and create

1. `git push -u origin HEAD`. Never force-push. If the push is rejected, stop and explain (usually the remote branch has commits the local one doesn't; the user should pull first).
2. Write the approved body to a file in the scratchpad directory, then:

   ```sh
   gh pr create --base developer --head <branch> --title "<title>" --body-file <file>
   ```

   Using `--body-file` avoids quoting problems with multi-line text in PowerShell.
3. Show the PR URL that `gh` prints.
