# Demo Guide

Quick reference for delivering impressive demos of the Salesforce AI Email Generator.

## Pre-Demo Setup (5 minutes)

1. **Verify credentials are configured**
   ```bash
   cd server
   cat .env  # Should show all credentials filled in
   ```

2. **Test connection**
   ```bash
   curl http://localhost:3001/api/health
   ```
   Should return: `{"status":"ok","salesforce":"connected","claude":"connected"}`

3. **Test opportunity fetch**
   ```bash
   curl http://localhost:3001/api/opportunities
   ```
   Should return list of opportunities

4. **Have backup talking points ready** in case of API delays

## Demo Script (3-5 minutes)

### Introduction (30 seconds)
"Today I'll show you how AI can transform the way sales teams create personalized outreach. Instead of spending 15-20 minutes crafting each email, reps can generate contextual, professional emails in seconds."

### The Problem (30 seconds)
"Sales reps face a dilemma: generic email templates have low response rates, but personalizing each email is time-consuming. They need to research the company, understand the deal context, and craft compelling messaging. What if AI could do this instantly?"

### The Demo (2-3 minutes)

1. **Show the opportunity list**
   - "Here we see open opportunities pulled directly from Salesforce"
   - Point out key details: company name, deal size, stage, close date

2. **Select an opportunity**
   - Pick one with compelling details (large deal, interesting industry)
   - "Let's say I'm a rep working on this $250K deal with Acme Corp in the manufacturing industry"

3. **Show the context**
   - "The AI sees all the relevant context: company, industry, deal stage, amount, close date"
   - "This ensures the email will be relevant and appropriate for where we are in the sales cycle"

4. **Optional: Add custom instructions**
   - Click to expand custom instructions
   - "I can add specific guidance like 'Mention our upcoming webinar' or 'Focus on cost savings'"
   - Type example: "Focus on their industry pain points"

5. **Generate email**
   - Click "Generate Personalized Email"
   - "In just a few seconds, Claude analyzes all this context and creates a professional email"

6. **Review the result**
   - Read the subject line: "Notice how it's specific to Acme Corp and their situation"
   - Skim the body: "The email references their industry, deal stage, and provides value"
   - "It's not a generic template—it's contextually relevant to this specific opportunity"

7. **Copy to clipboard**
   - Click "Copy to Clipboard"
   - "Now the rep can paste this into their email client, make any final tweaks, and send"
   - "What would take 15-20 minutes now takes 30 seconds"

### The Value (30 seconds)
"This is the power of combining Salesforce data with AI:
- Reps save hours each week
- Every email is personalized and professional
- Response rates improve because emails are contextually relevant
- Reps can focus on conversations instead of email composition"

### Q&A Prompts
"Want to see me generate another email? Try different instructions? Any questions about how this works?"

## Demo Tips

### Do's
- ✅ Have 2-3 opportunities pre-selected as good examples
- ✅ Practice the demo flow beforehand
- ✅ Keep it fast-paced and energetic
- ✅ Emphasize time savings and quality
- ✅ Show the custom instructions feature
- ✅ Generate 2-3 different emails to show variation

### Don'ts
- ❌ Don't apologize for UI imperfections
- ❌ Don't get technical unless asked
- ❌ Don't wait awkwardly during generation (talk through what's happening)
- ❌ Don't show opportunities with $0 amounts or missing data
- ❌ Don't let the demo run longer than 5 minutes

## Handling Common Questions

**Q: Can this integrate with our email client?**
A: "Currently this is a standalone demo, but in production this could integrate directly into Salesforce, Outlook, Gmail, or any email platform via their APIs."

**Q: Can it send emails automatically?**
A: "This generates the email for rep review and approval. We always recommend human oversight. But yes, with appropriate safeguards, we could add automated sending via SendGrid or similar services."

**Q: What if it generates something wrong?**
A: "Great question. That's why we show the email to the rep first. They can regenerate, add custom instructions, or edit before sending. The AI is a productivity tool, not a replacement for human judgment."

**Q: How much does this cost?**
A: "AI API costs are typically a few cents per email generated. For a rep generating 20 emails per day, that's under $10/month in API costs—far less than the value of their time saved."

**Q: What about data privacy?**
A: "All communication happens over encrypted HTTPS. Salesforce data stays in transit only—we don't store anything. Anthropic (Claude's maker) has enterprise-grade security and GDPR compliance."

**Q: Can it handle different industries/tones/languages?**
A: "Absolutely. We can customize the prompts for different use cases: formal vs casual, different industries, multiple languages. This demo shows one configuration, but it's highly flexible."

## Troubleshooting During Demo

### If opportunities load slowly
"While Salesforce fetches our opportunities, let me explain how the AI works..."

### If email generation is slow
"Claude is analyzing all the context—company details, deal stage, industry trends—to craft the perfect message..."

### If an error occurs
"Looks like we hit an API rate limit [or other plausible excuse]. Let me show you an example I generated earlier..." [Have screenshots ready]

### If asked something you don't know
"Great question—I don't have that specific detail, but I'll find out and follow up with you after the demo."

## Post-Demo Follow-Up

Send the prospect:
1. Link to the demo (if deployed publicly)
2. Sample generated emails
3. Technical architecture overview
4. Pricing estimate based on their team size
5. Next steps for a pilot program

## Quick Reset Between Demos

```bash
# Clear browser cache
# Restart servers
./start.sh

# Verify health check
curl http://localhost:3001/api/health
```

## Backup Talking Points (If Technical Issues)

Have these ready in case of technical difficulties:
1. Screenshots of successful email generations
2. Statistics about time savings
3. Customer testimonials (if available)
4. Competitive comparisons
5. ROI calculations

## Customization for Different Audiences

### For Sales Leaders
- Emphasize: team productivity, consistent quality, coaching opportunities, metrics

### For Sales Reps
- Emphasize: time savings, ease of use, better response rates, more time selling

### For IT/Security
- Emphasize: security, API architecture, data privacy, compliance, scalability

### For Executives
- Emphasize: ROI, competitive advantage, scalability, strategic value

## Demo Success Metrics

Track these after each demo:
- Demo completion rate (started → finished)
- Questions asked (shows engagement)
- Follow-up requests (shows interest)
- Conversion to next step (pilot, POC, etc.)

Good luck with your demos! 🚀
