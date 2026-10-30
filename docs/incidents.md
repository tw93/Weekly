# Incidents

## 2026-10-30: Subscription preferences

Duplicate detection ignored language membership, and new contacts could inherit an unselected topic through Resend defaults. Contact creation and existing-contact updates now have distinct paths. The missing layer was preference-boundary testing; `tests/newsletter.test.js` covers language, explicit opt-outs, preserving existing preferences and failed lookups.

