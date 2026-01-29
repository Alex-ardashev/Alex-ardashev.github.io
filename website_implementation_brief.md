# Website Implementation Brief for FitCommit

This document outlines the requirements for implementing the "Support," "Terms of Service," and "Privacy Policy" sections on the FitCommit website.

## 1. Features to Implement

### A. Support Page
**URL:** `/support` (or section on landing page)
**Requirements:**
1.  **Contact Form:**
    *   **Fields:**
        *   Name (Text)
        *   Email (Email)
        *   Issue Type (Dropdown: "Account Issue", "Payment/Refund", "Bug Report", "Feature Request", "Other")
        *   Message (Text Area)
    *   **Validation:** All fields required. Email must be valid format.
    *   **Handling:** Form submissions should send an email to `pickitbox.official@gmail.com`.
    *   **Spam Protection:** (Recommended) Implement a simple CAPTCHA or honeypot field.
2.  **Direct Email Link:** clearly display `pickitbox.official@gmail.com` for users who prefer their own email client.

### B. Legal Pages
Create simple text-based pages for legal compliance.
*   **Privacy Policy URL:** `/privacy` or `/privacy-policy`
*   **Terms of Service URL:** `/terms` or `/terms-of-service`

---

## 2. Content for Legal Pages

### Privacy Policy Content
*(Copy and paste the text below into the Privacy Policy page)*

```markdown
# Privacy Policy for FitCommit

**Last Updated:** January 2026

FitCommit ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share information about you when you use our mobile application and services.

## 1. Information We Collect

### Account Information
When you create an account using Apple Sign-In, we collect your name and email address (if you choose to share them). We also generate a unique user identifier.

### Activity Data
When you log activities, we collect photos you upload to verify your workouts. These photos are stored securely in our cloud infrastructure.

### Location Data
With your permission, we collect precise location data when you verify activities. This helps us confirm you are at a fitness facility. Location data is only collected when you actively use the verification feature.

### Payment Information
Payment processing is handled by Stripe. We do not store your full credit card number. We store a reference to your Stripe customer ID and default payment method for processing commitment penalties.

## 2. How We Use Information
We use your information to:
*   Provide and maintain our services
*   Verify your fitness activities using AI analysis
*   Process penalty charges for failed commitments
*   Direct penalty amounts to your selected charity
*   Display leaderboards and social features
*   Send you notifications about your commitments
*   Improve and develop new features

## 3. AI Photo Analysis
We use Google Gemini AI to analyze photos you submit for activity verification. The AI evaluates whether your photo depicts a legitimate fitness activity. Photos are sent to Google's servers for analysis. Google may process this data according to their privacy policy. We do not use your photos to train AI models.

## 4. Third-Party Services
We share data with the following third-party services:
*   **Stripe:** Payment processing (PCI-DSS compliant)
*   **Google Gemini:** AI photo analysis
*   **Google Maps/Places:** Location verification
*   **Supabase:** Database and authentication
*   **Apple:** Sign-In with Apple authentication

Each service has its own privacy policy governing data use.

## 5. Data Retention
We retain your account information as long as your account is active. Activity photos are retained for 90 days after verification. You can request deletion of your account and associated data at any time through the app settings.

## 6. Data Security
We implement industry-standard security measures including encryption in transit (TLS), secure cloud storage, and access controls. Payment data is handled by Stripe in compliance with PCI-DSS standards.

## 7. Your Rights
You have the right to:
*   Access your personal data
*   Correct inaccurate data
*   Delete your account and data
*   Export your data
*   Opt out of marketing communications
*   Withdraw consent for location tracking

To exercise these rights, use the settings in the app or contact us at **pickitbox.official@gmail.com**.

## 8. Children's Privacy
FitCommit is not intended for children under 13. We do not knowingly collect personal information from children under 13.

## 9. Contact Us
If you have questions about this Privacy Policy, please contact us at:
**Email:** pickitbox.official@gmail.com
```

---

### Terms of Service Content
*(Copy and paste the text below into the Terms of Service page)*

```markdown
# Terms of Service

**Last Updated:** January 2026

By using FitCommit ("the App"), you agree to be bound by these Terms of Service. Please read them carefully before using our services.

## 1. Acceptance of Terms
By creating an account or using the App, you confirm that you are at least 18 years old and agree to these Terms. If you do not agree, do not use the App.

## 2. Commitments and Pledges
When you create a commitment, you agree to:
*   Complete the specified fitness goal within the timeframe
*   Verify activities honestly through the App
*   Have the staked amount charged if you fail to meet your goal
*   Have the charged amount processed as an accountability penalty and directed to your selected charity

Commitments are binding once created. The minimum stake is $1 and maximum is $10,000.

## 3. Activity Verification
All activities must be verified through the App using:
*   A photo taken at the time of the activity
*   Location data (when enabled) to confirm venue

We use AI analysis to evaluate submissions. AI decisions are final. Deliberately submitting fraudulent photos may result in account termination.

## 4. Payments and Charges
*   Payments are processed securely via Stripe
*   You must have a valid payment method on file
*   Failed commitments result in automatic charges
*   Charges occur at the end of each commitment period
*   You authorize us to charge your payment method for penalties

## 5. Refund Policy
Penalty charges for failed commitments are generally non-refundable as they are immediately processed. However, you may request a refund within 48 hours if:
*   There was a technical error in verification
*   The App experienced an outage preventing activity logging
*   An unauthorized charge occurred

Refund requests are reviewed on a case-by-case basis. Contact **pickitbox.official@gmail.com** with your request.

## 6. Commitment Cancellation
Active commitments cannot be cancelled once started. You may:
*   Choose not to create new commitments
*   Let commitments expire naturally
*   Delete your account (existing commitments will still be evaluated)

## 7. Pacts (Social Challenges)
When participating in pacts:
*   Both parties must accept the challenge
*   Stakes and terms are agreed upon before starting
*   The losing party's stake is charged as a penalty
*   Disputes are resolved based on verified activity data

## 8. Accountability and Charity
FitCommit operates as an accountability service. When you fail to meet your fitness commitment, you are charged a penalty as agreed. Penalty amounts are directed to the charity you selected during commitment creation. We partner with established charitable organizations. FitCommit is not a charity and does not claim tax-deductible status for these payments. We are not responsible for how charities use the funds they receive.

## 9. Account Termination
You may delete your account at any time through the App settings. We may suspend or terminate accounts for:
*   Violation of these Terms
*   Fraudulent activity or submissions
*   Payment failures or disputes
*   Abuse of the App or other users

## 10. Limitation of Liability
TO THE MAXIMUM EXTENT PERMITTED BY LAW:
*   FitCommit is provided "as is" without warranties
*   We are not liable for indirect, incidental, or consequential damages
*   Our total liability is limited to amounts you paid us in the past 12 months
*   We are not responsible for injuries during fitness activities
*   You assume all risk associated with your fitness activities

## 11. Disclaimer
FitCommit is a motivational tool, not a fitness program. Consult a healthcare provider before starting any exercise routine. We do not provide medical, fitness, or financial advice.

## 12. Dispute Resolution
Any disputes arising from these Terms or your use of the App will be resolved through:
*   First, informal negotiation by contacting **pickitbox.official@gmail.com**
*   If unresolved after 30 days, binding arbitration
*   Arbitration will be conducted in accordance with AAA rules
*   You waive the right to participate in class actions

## 13. Intellectual Property
All content, features, and functionality of the App are owned by FitCommit and protected by copyright and trademark laws. You may not copy, modify, or distribute our content without permission.

## 14. Changes to Terms
We may update these Terms at any time. Continued use of the App after changes constitutes acceptance. Material changes will be notified through the App or email.

## 15. Contact Us
For questions about these Terms, contact us at:
**Email:** pickitbox.official@gmail.com
```
