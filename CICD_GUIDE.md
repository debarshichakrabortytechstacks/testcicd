# GitHub Actions CI/CD Pipeline Guide

## Pipeline Overview

The application includes a fully automated CI/CD pipeline using GitHub Actions that runs on every push and pull request.

## Workflow File Location
`.github/workflows/ci-cd.yml`

## When Does It Run?

### Automatic Triggers
- **Push** to branches: `main`, `develop`, or any `copilot/**` branch
- **Pull Request** to branches: `main` or `develop`

### Manual Trigger
You can also manually trigger the workflow from the GitHub Actions tab.

## Pipeline Jobs

### Job 1: Backend Build and Test
**Duration**: ~2-3 minutes

**Steps**:
1. ✓ Checkout code from repository
2. ✓ Set up Python 3.11 environment
3. ✓ Upgrade pip to latest version
4. ✓ Install backend dependencies from `requirements.txt`
5. ✓ Run flake8 linting (errors only)
6. ✓ Run flake8 code quality checks
7. ✓ Execute unit tests with unittest

**What it validates**:
- Python code syntax
- Dependency installation
- Code quality standards
- Unit test passing
- API endpoint functionality

### Job 2: Frontend Build and Test
**Duration**: ~3-4 minutes

**Steps**:
1. ✓ Checkout code from repository
2. ✓ Set up Node.js 18 environment
3. ✓ Cache npm dependencies for faster builds
4. ✓ Install frontend dependencies with `npm ci`
5. ✓ Run Jest tests with React Testing Library
6. ✓ Build production bundle
7. ✓ Upload build artifacts

**What it validates**:
- JavaScript/React code syntax
- Dependency installation
- Component tests passing
- Production build success
- No breaking changes

### Job 3: Docker Build (Optional)
**Duration**: Skipped unless on `main` branch

**Steps**:
1. ✓ Checkout code from repository
2. ✓ Placeholder for Docker image builds

**When it runs**:
- Only on pushes to `main` branch
- After backend and frontend jobs complete successfully

## Viewing Pipeline Results

### In GitHub
1. Go to your repository on GitHub
2. Click the "Actions" tab
3. See all workflow runs
4. Click any run to see detailed logs

### Status Badges
Add to README.md:
```markdown
![CI/CD Pipeline](https://github.com/debarshichakrabortytechstacks/testcicd/actions/workflows/ci-cd.yml/badge.svg)
```

## Pipeline Artifacts

### What Gets Saved
- Frontend production build (`frontend/build/`)
- Available for download for 90 days

### How to Download
1. Go to workflow run
2. Scroll to "Artifacts" section
3. Click "frontend-build" to download

## Success Criteria

### Backend Job Passes If:
- ✓ All Python dependencies install successfully
- ✓ Code passes flake8 linting
- ✓ All unit tests pass
- ✓ No syntax errors

### Frontend Job Passes If:
- ✓ All Node dependencies install successfully
- ✓ All component tests pass
- ✓ Production build completes without errors
- ✓ No breaking changes detected

## Failure Scenarios

### Backend Might Fail If:
- ❌ Syntax errors in Python code
- ❌ Import errors or missing dependencies
- ❌ Unit tests fail
- ❌ Linting errors (critical only)

### Frontend Might Fail If:
- ❌ Syntax errors in JavaScript/JSX
- ❌ Missing dependencies
- ❌ Component tests fail
- ❌ Build errors

## Debugging Failed Pipelines

### Steps to Debug
1. Click on the failed job
2. Expand the failed step
3. Read error messages
4. Fix locally and push again

### Common Issues

**Issue**: Dependencies fail to install
```
Solution: Check requirements.txt or package.json for typos
```

**Issue**: Tests fail
```
Solution: Run tests locally first, fix failing tests
```

**Issue**: Build fails
```
Solution: Test build locally with `npm run build`
```

## Local Testing Before Push

### Backend
```bash
cd backend
pip install -r requirements.txt
python -m unittest test_app.py
```

### Frontend
```bash
cd frontend
npm install
npm test -- --watchAll=false
npm run build
```

## Pipeline Performance

### Current Stats
- **Backend Job**: ~2-3 minutes
- **Frontend Job**: ~3-4 minutes
- **Total Duration**: ~5 minutes (parallel execution)

### Optimization Tips
- Jobs run in parallel
- npm dependencies are cached
- Only required steps included

## Environment Variables in CI

### Available by Default
- `CI=true` (in frontend tests)
- `GITHUB_*` variables
- Repository information

### Secrets (if needed)
Add in Settings → Secrets → Actions:
- Database credentials (for integration tests)
- API keys
- Deployment tokens

## Branch Protection

### Recommended Settings
1. Require status checks to pass
2. Require branches to be up to date
3. Include administrators

### How to Enable
1. Settings → Branches
2. Add rule for `main`
3. Enable "Require status checks"
4. Select workflow jobs

## Workflow Diagram

```
┌─────────────────────────────────────────────┐
│         Push or Pull Request Event          │
└──────────────────┬──────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
        ▼                     ▼
┌────────────────┐    ┌────────────────┐
│  Backend Job   │    │  Frontend Job  │
│                │    │                │
│ 1. Checkout    │    │ 1. Checkout    │
│ 2. Setup Py    │    │ 2. Setup Node  │
│ 3. Install     │    │ 3. Install     │
│ 4. Lint        │    │ 4. Test        │
│ 5. Test        │    │ 5. Build       │
│                │    │ 6. Upload      │
└────────┬───────┘    └────────┬───────┘
         │                     │
         └──────────┬──────────┘
                    │
            ┌───────▼────────┐
            │ Both Jobs Pass │
            └───────┬────────┘
                    │
                    ▼
           ┌────────────────┐
           │  Docker Build  │
           │  (main only)   │
           └────────────────┘
```

## Monitoring

### Email Notifications
GitHub sends emails on:
- First failure after success
- Success after failure

### Configure Notifications
1. Settings → Notifications
2. Actions section
3. Choose notification preferences

## Extending the Pipeline

### Add More Jobs
Example: Integration tests, deployment, etc.

```yaml
integration-tests:
  needs: [backend-build, frontend-build]
  runs-on: ubuntu-latest
  steps:
    - name: Run integration tests
      run: |
        # Your integration test commands
```

### Add Deployment
```yaml
deploy:
  needs: [backend-build, frontend-build]
  if: github.ref == 'refs/heads/main'
  runs-on: ubuntu-latest
  steps:
    - name: Deploy to production
      run: |
        # Your deployment commands
```

## Security Considerations

### What's Safe in Logs
- Build output
- Test results
- Dependency versions

### Keep Secret
- API keys
- Passwords
- Tokens
- Connection strings

### Use GitHub Secrets
Never commit secrets to code. Use GitHub Secrets feature.

## Cost

### GitHub Actions Minutes
- **Free tier**: 2,000 minutes/month
- **This pipeline**: ~5 minutes per run
- **Estimation**: ~400 runs/month on free tier

## Support

### If Pipeline Fails
1. Check logs in GitHub Actions
2. Test locally first
3. Fix issues and push again

### For Help
- Review workflow YAML
- Check GitHub Actions documentation
- See error messages in logs

## Success Indicators

✅ Green checkmark on commit
✅ All jobs show "passed"
✅ Artifacts available for download
✅ No errors in logs

## Next Steps

1. Push code to trigger pipeline
2. Monitor in GitHub Actions tab
3. Review results
4. Add more tests as needed
5. Configure branch protection
