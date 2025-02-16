# Playwright Test

## Playwright proof of concept - access certain websites and perform a basic flow on them

### The purpose of this exercise is to serve as evidence of my ability to write an automation engine, but also to learn Playwright as I am more familiar with selenium.

#### Status:

GOOGLE - strong anti-bot protections - overcoming this far outside of the scope of the POC

SKYSCANNER - strong anti-bot protections - overcoming this far outside of the scope of the POC

OP.GG - non-commercial website for a very popular game with a large variety of characters and statistics, providing ample opportunities to test things

Until otherwise stated, this is a WIP and thus may include incomplete features

I am just learning as I go, so it's very likely that I'm not applying best practises, etc.

##### To Run

Use "npx playwright test (arg)"

The arg is optional and can be a substring to match the file name (e.g. "op" will give you leagueopgg)

The main development focus of this project will be op.gg, so highly recommended to use

"npx playwright text op" or similar
