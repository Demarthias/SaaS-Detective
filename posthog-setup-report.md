# PostHog post-wizard report

The wizard has completed a deep integration of the SaaS Detective licensing worker with PostHog. A new Cloudflare Worker source file was created at `saas-detective-licensing/saas-detective-licensing/src/index.js` — a clean ES-module rewrite of the archived worker — with `posthog-node` (v4.18.0) installed and wired into every business-critical endpoint. All existing GA4 tracking was preserved; PostHog events are added alongside it. `identify()` calls are made on trial start and license purchase so server-side events can be correlated with extension-side events that already use the same `email` or `ga_client_id` as the distinct ID. Exception tracking via `captureException` is wired into the Stripe webhook error handler.

| Event | Description | File |
|---|---|---|
| `trial_started` | User successfully starts a 7-day Pro trial via the marketing site form. | `saas-detective-licensing/saas-detective-licensing/src/index.js` |
| `license_purchased` | Stripe `checkout.session.completed` — a paid license has been issued. | `saas-detective-licensing/saas-detective-licensing/src/index.js` |
| `checkout_abandoned` | Stripe checkout session expired before payment was completed. | `saas-detective-licensing/saas-detective-licensing/src/index.js` |
| `payment_failed` | Stripe payment intent failed with a decline code. | `saas-detective-licensing/saas-detective-licensing/src/index.js` |
| `invoice_payment_failed` | Stripe invoice payment failed on a renewal attempt. | `saas-detective-licensing/saas-detective-licensing/src/index.js` |
| `subscription_cancelled` | User set `cancel_at_period_end` — subscription will not renew. | `saas-detective-licensing/saas-detective-licensing/src/index.js` |
| `subscription_deleted` | Stripe subscription was fully deleted and the license deactivated. | `saas-detective-licensing/saas-detective-licensing/src/index.js` |
| `subscription_renewed` | Recurring invoice payment succeeded — subscription renewal confirmed. | `saas-detective-licensing/saas-detective-licensing/src/index.js` |
| `newsletter_subscribed` | User submitted the email capture form on the marketing site. | `saas-detective-licensing/saas-detective-licensing/src/index.js` |

## Next steps

We've built a dashboard and five insights to monitor the licensing funnel and business health:

- **Dashboard**: [Analytics basics (wizard)](https://us.posthog.com/project/449223/dashboard/1767813)
- [Trial-to-Purchase Funnel (wizard)](https://us.posthog.com/project/449223/insights/l3RoVkTu) — ordered funnel, 14-day window, 90d range
- [Trials Started Over Time (wizard)](https://us.posthog.com/project/449223/insights/oACqV5KB) — daily line chart, 90d range
- [License Purchases & Renewals (wizard)](https://us.posthog.com/project/449223/insights/bJ1EXDRF) — weekly line chart, new + renewal, 90d range
- [Churn Signals (wizard)](https://us.posthog.com/project/449223/insights/M2Yw8u1Z) — weekly, cancellations + deletions, 90d range
- [Payment Failures (wizard)](https://us.posthog.com/project/449223/insights/36IfsUjv) — weekly, direct failures + invoice failures, 90d range

## Verify before merging

- [ ] Run a full production build (`npm run build` in the extension root, and `wrangler deploy --dry-run` in the licensing worker directory) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `POSTHOG_KEY` and `POSTHOG_HOST` to `.env.example` and any onboarding scripts so collaborators know what to set in their local environments (the worker reads these from `wrangler secret put` / `wrangler.toml [vars]` in production).
- [ ] Run `wrangler secret put POSTHOG_KEY` in the licensing worker directory to set the production PostHog key as a Wrangler secret (the value in `wrangler.toml [vars]` is fine for development but secrets are preferred for production).
- [ ] Confirm the returning-visitor path also calls `identify` — the current implementation identifies on trial start and license purchase, but a returning licensed user who revalidates their key only gets re-identified if their email is stored in the license data. Verify `sd_license.email` is populated for all existing licenses.

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
