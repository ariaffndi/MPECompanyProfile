# CI/CD Pipeline Documentation

## Overview

This document describes the CI/CD pipeline implementation for the MPE Company Profile Laravel + InertiaJS (React) monorepo SPA. The pipeline uses GitHub Actions to automate building, testing, and deployment processes.

## Architecture

### Tech Stack

- **Backend**: Laravel 12 (PHP 8.4)
- **Frontend**: React with InertiaJS, TypeScript, Vite
- **Database**: MySQL 8.0
- **Testing**: Pest/PHPUnit, Vitest/Jest, Laravel Dusk (E2E)
- **Code Quality**: ESLint, Prettier, PHPStan
- **Containerization**: Docker
- **CI/CD**: GitHub Actions

### Repository Structure

```
project-root/
├── app/Http/Controllers/          # Laravel controllers (Inertia render)
├── resources/js/
│   ├── Pages/                     # React InertiaJS pages
│   └── Components/                # React components
├── tests/
│   ├── Feature/InertiaTest.php    # Controller → Inertia props
│   └── Dusk/LoginTest.php         # E2E browser SPA
├── .github/workflows/ci-cd.yml    # Single workflow PHP+Node
├── vite.config.ts                 # Vite + Inertia bundling
├── package.json                   # @inertiajs/react, vitest
├── composer.json                  # inertiajs/inertia-laravel
├── Dockerfile                     # Monorepo Docker
├── docker-compose.yml             # Local dev
├── phpunit.xml                    # Laravel tests
└── docs/PIPELINE-DOC.md           # This documentation
```

## Pipeline Stages

### 1. CI Stage (Frontend + Backend)

#### Setup

- **PHP 8.4** with required extensions (PDO, MySQL, etc.)
- **Node.js 20** with npm caching
- **MySQL 8.0** service for testing

#### Dependencies Installation

- `composer install` for Laravel backend
- `npm ci` for React frontend and build tools

#### Laravel Backend Setup

- Copy `.env.example` to `.env`
- Generate application key
- Run migrations with seeding
- Create storage symbolic link

#### Testing

- **Laravel Tests**: Unit and feature tests using Pest/PHPUnit
- **InertiaJS Tests**: Component testing with Vitest/Jest
- **TypeScript Checking**: Type validation
- **Code Quality**: ESLint and Prettier checks

#### Asset Building

- Production build with Vite
- Asset optimization and manifest generation
- Cache busting for CSS/JS

### 2. E2E Testing Stage

#### Browser Automation

- **Laravel Dusk**: End-to-end testing for SPA flows
- **Selenium Chrome**: Headless browser testing
- Tests cover: login/logout, CRUD operations, pagination, form validation

#### Inertia-Specific Testing

- Page component props validation
- Shared data verification
- Form handling and error rendering
- Authentication flows with Sanctum/Breeze
- Flash messages and redirects

### 3. Artifact Generation & Docker

#### Docker Image

- Multi-stage build for optimization
- Production-ready image with PHP, Node.js, and assets
- Push to Docker Hub or GitHub Container Registry

#### Asset Management

- Vite bundling with code splitting
- Critical asset preloading
- Optimized manifests for SPA performance

### 4. Deployment Stages

#### Staging Deployment

- **Trigger**: Push to `develop` branch
- **Auto-deploy**: Docker image pull and container restart
- **Post-deploy**: Run migrations, clear caches
- **Notification**: Slack webhook for deployment status

#### Production Deployment

- **Trigger**: Push to `main` branch
- **Manual Approval**: Required for production deploys
- **Zero-downtime**: Rolling deployment strategy
- **Post-deploy**: Migration and cache management
- **Tagging**: Git tags for rollback points

### 5. Monitoring & Rollback

#### Notifications

- **Slack Integration**: Real-time deployment notifications
- **Status Updates**: Success/failure alerts with commit details

#### Rollback Strategy

- **Git Tags**: Automatic tagging on successful deployments
- **Manual Rollback**: Via tagged releases
- **Automated Rollback**: On pipeline failures

#### Performance Monitoring

- Basic response time logging
- Error rate tracking
- Resource usage monitoring

## GitHub Actions Workflow

### Triggers

- Push to `main` and `develop` branches
- Pull requests to `main` and `develop`

### Jobs

1. **ci**: Main CI pipeline (PHP + Node setup, tests, build)
2. **e2e**: Browser-based E2E testing
3. **build-docker**: Container image creation
4. **deploy-staging**: Auto-deploy to staging
5. **deploy-production**: Manual deploy to production
6. **rollback**: Automated rollback on failures

### Environments

- **staging**: Develop branch deployments
- **production**: Main branch deployments (with approval)

## Configuration

### Required GitHub Secrets

```bash
DOCKER_HUB_USERNAME     # Docker Hub username
DOCKER_HUB_TOKEN        # Docker Hub access token
SLACK_WEBHOOK_URL       # Slack webhook for notifications
STAGING_HOST            # Staging server SSH host
STAGING_USER            # Staging server SSH user
PRODUCTION_HOST         # Production server SSH host
PRODUCTION_USER         # Production server SSH user
```

### Environment Variables

```bash
COMPOSER_ALLOW_SUPERUSER=1
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=testing
DB_USERNAME=root
DB_PASSWORD=root
APP_URL=http://localhost:8000
```

## Local Development Setup

### Prerequisites

- PHP 8.4
- Node.js 20
- MySQL 8.0
- Composer
- Docker (optional)

### Setup Commands

```bash
# Install dependencies
composer install
npm install

# Environment setup
cp .env.example .env
php artisan key:generate

# Database setup
php artisan migrate:fresh --seed

# Build assets
npm run build

# Start development server
php artisan serve
npm run dev
```

### Docker Development

```bash
# Build and run with Docker Compose
docker-compose up --build
```

## Deployment Runbook

### Staging Deployment

1. Push changes to `develop` branch
2. Pipeline automatically runs CI/E2E tests
3. On success, builds Docker image
4. Deploys to staging environment
5. Runs migrations and clears caches
6. Sends Slack notification

### Production Deployment

1. Merge changes to `main` branch via PR
2. Pipeline runs full test suite
3. Manual approval required for production
4. Creates deployment tag
5. Deploys to production with zero-downtime
6. Runs migrations and optimizations
7. Sends Slack notification

### Rollback Procedure

1. Identify failed deployment tag
2. SSH to target server
3. Pull previous image/tag
4. Run rollback commands:
    ```bash
    git checkout <previous-tag>
    docker-compose down
    docker-compose up -d
    php artisan migrate:rollback
    ```
5. Verify application health
6. Notify team via Slack

## Troubleshooting

### Common Issues

#### Pipeline Failures

- **Composer Install**: Check PHP version and extensions
- **NPM Install**: Verify Node.js version and cache
- **Database Connection**: Ensure MySQL service is healthy
- **Asset Building**: Check Vite configuration and dependencies

#### Deployment Issues

- **SSH Connection**: Verify server credentials and network
- **Docker Pull**: Check registry access and image tags
- **Migration Errors**: Review database schema changes
- **Permission Issues**: Ensure proper file permissions

#### E2E Test Failures

- **Browser Timeout**: Increase timeout values
- **Element Not Found**: Update selectors or wait conditions
- **Database State**: Ensure proper test data seeding

### Debugging Steps

1. Check GitHub Actions logs for detailed error messages
2. Verify environment variables and secrets
3. Test locally with same conditions
4. Check server logs for deployment issues
5. Use Slack notifications for real-time monitoring

## Performance Optimization

### Build Optimization

- **Vite Bundling**: Code splitting and tree shaking
- **Asset Optimization**: Compression and minification
- **Caching**: GitHub Actions caching for dependencies
- **Parallel Jobs**: Concurrent CI and E2E testing

### Deployment Optimization

- **Docker Layers**: Efficient multi-stage builds
- **CDN Integration**: Static asset delivery
- **Database Optimization**: Migration optimization
- **Zero-downtime**: Rolling deployment strategy

## Security Considerations

### Secrets Management

- All sensitive data stored as GitHub secrets
- No hardcoded credentials in codebase
- Regular rotation of access tokens

### Access Control

- Branch protection rules for main/develop
- Required reviews for production merges
- Manual approval for production deployments

### Container Security

- Minimal base images
- Regular security scanning
- Non-root user execution where possible

## Future Enhancements

### Planned Improvements

- **Advanced Monitoring**: APM integration (New Relic, DataDog)
- **Blue-Green Deployments**: Advanced deployment strategies
- **Multi-environment**: Additional staging environments
- **Performance Testing**: Load testing integration
- **Security Scanning**: SAST/DAST integration
- **Infrastructure as Code**: Terraform/Ansible integration

### Monitoring Enhancements

- **Metrics Collection**: Response times, error rates
- **Alerting**: Automated alerts for issues
- **Dashboards**: Real-time pipeline and app metrics
- **Log Aggregation**: Centralized logging solution

---

## Support

For pipeline issues or questions:

1. Check this documentation first
2. Review GitHub Actions workflow logs
3. Check server/application logs
4. Contact DevOps team via Slack

## Changelog

### v1.0.0

- Initial CI/CD pipeline implementation
- GitHub Actions workflow setup
- Docker containerization
- Staging and production deployments
- Slack notifications and rollback procedures
