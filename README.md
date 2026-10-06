# StoryLens website

## Approved website plan

English, responsive four-page concept website for family AR adventures at castles. Cream (#F8F6EF), forest green (#0A3327), muted gold (#B58731), serif headlines and restrained editorial layouts follow the supplied storylens_tam_sam_som presentation. Imagery comes from the user's StoryLense Pitch; castle illustrations are concept imagery, not evidence of a partnership.

1. **Overview `/`**: product introduction, three-step experience, family roles, story preview, supplied concept introduction video with native playback controls and FAQ.
2. **Our stories `/stories`**: The Siege of Eltz, 1331, with six stations; clearly identified as a concept chapter.
3. **Prices `/prices`**: a castle-facing pay-for-performance partnership. StoryLens receives 80% of the StoryLens surcharge; the castle keeps 20% plus its regular admission revenue. No detailed calculations, revenue calculator, family device pricing or invented plan tiers. The main section presents six included services: bespoke story, game design, AR production, devices and fleet operation, on-site setup/training, and ongoing support/maintenance. No unconfirmed claims about setup fees, subscriptions, cancellation, tax or settlement terms.
4. **Contact us `/contact`**: validated demonstration form; no real delivery or persistent storage. Castle inquiries from Prices preselect the partnership topic. A successful demo explicitly says no message was sent.

Shared header/footer, mobile menu, section-aware CTAs and accessible keyboard interaction. Legacy `/experience` links redirect to the overview; `/partners` redirects to Contact. Content remains a concept, with no booking, checkout, claimed availability or fabricated testimonials.

## Development

Run `pnpm install`, then `pnpm dev`. Run `pnpm build` for TypeScript and production-build validation. `pnpm preview` serves the production build. Production hosting must rewrite non-file routes to `/index.html` for SPA direct links.

## Verification

Check every route at 390, 768 and 1440px; confirm no horizontal overflow, working mobile navigation, anchor offsets and legacy redirects. Check empty/invalid/valid form submissions and confirm there is no network submission or browser storage of form values. Check images and browser errors.

## References

The pricing structure was informed by the clarity of [Chargeflow](https://www.chargeflow.io/pricing), [Revatto](https://revatto.com/pricing), and [Subcraft](https://subcraft.ai/pricing/). Their commercial terms and claims are not adopted. StoryLens's 80/20 split was supplied by the user.
