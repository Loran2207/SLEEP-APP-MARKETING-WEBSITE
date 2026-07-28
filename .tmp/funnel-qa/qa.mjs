import assert from "node:assert/strict";
import { chromium } from "playwright";

const baseUrl = "http://127.0.0.1:4443";
const email = "kirill.qa@example.com";
const stepIds = [
  "welcome",
  "promise",
  "age",
  "identity",
  "awake",
  "want",
  "insight-rhythm",
  "rating",
  "latency",
  "night-wakes",
  "early-wake",
  "racing-mind",
  "screens",
  "caffeine",
  "consistency",
  "ritual",
  "daytime",
  "insight-night",
  "sleep-goal",
  "wake-time",
  "bedtime-nudge",
  "analyzing",
  "profile",
  "preview",
  "email",
  "paywall",
  "checkout",
  "done",
];

const browser = await chromium.launch({
  headless: true,
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
});
const context = await browser.newContext({
  viewport: { width: 430, height: 932 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
const consoleErrors = [];
const pageErrors = [];

page.on("console", (message) => {
  if (message.type() === "error") {
    consoleErrors.push({
      text: message.text(),
      url: message.location().url,
    });
  }
});
page.on("pageerror", (error) => pageErrors.push(error.message));

const deepLinks = [];

for (const stepId of stepIds) {
  const response = await page.goto(`${baseUrl}/start?step=${stepId}`, {
    waitUntil: "networkidle",
  });

  assert.equal(response?.status(), 200, `${stepId} should return 200`);
  await page.locator("main#main").waitFor();

  const state = await page.evaluate(() => ({
    bodyText: document.body.innerText.trim(),
    horizontalOverflow:
      document.documentElement.scrollWidth - window.innerWidth,
    mainCount: document.querySelectorAll("main#main").length,
  }));

  assert.ok(state.bodyText.length > 0, `${stepId} should render content`);
  assert.equal(state.mainCount, 1, `${stepId} should render one main`);
  assert.ok(
    state.horizontalOverflow <= 1,
    `${stepId} should not overflow horizontally`,
  );

  deepLinks.push({
    id: stepId,
    heading:
      (await page.locator("h1").first().textContent().catch(() => null)) ??
      state.bodyText.split("\n")[0],
  });
}

async function waitForStep(stepId, timeout = 8_000) {
  await page.waitForURL(
    (url) => url.searchParams.get("step") === stepId,
    { timeout },
  );
}

async function clickAndWait(name, stepId) {
  await page.getByRole("button", { name, exact: true }).click();
  await waitForStep(stepId);
}

await page.goto(`${baseUrl}/start?step=welcome`, {
  waitUntil: "networkidle",
});
await clickAndWait("Start", "promise");
await clickAndWait("Continue", "age");
await clickAndWait("35-44", "identity");
await clickAndWait("Prefer not to say", "awake");
await clickAndWait("Afternoon", "want");

await page.getByRole("button", { name: "Calm a busy mind", exact: true }).click();
await page
  .getByText(
    "Breathing practices and a quick journal ease the racing thoughts that keep you up.",
    { exact: true },
  )
  .waitFor();
await page.getByRole("button", { name: "Sleep through the night", exact: true }).click();
await clickAndWait("Continue", "insight-rhythm");

await clickAndWait("Continue", "rating");
await clickAndWait("So-so", "latency");
await clickAndWait("20-40 minutes", "night-wakes");
await clickAndWait("Most nights", "early-wake");
await clickAndWait("Sometimes", "racing-mind");
await clickAndWait("Often", "screens");
await clickAndWait("Most nights", "caffeine");
await clickAndWait("Sometimes", "consistency");
await clickAndWait("Rarely", "ritual");
await clickAndWait("Not really", "daytime");
await clickAndWait("Dips often", "insight-night");
await clickAndWait("Keep going", "sleep-goal");

await page.getByRole("radio", { name: "8 hours", exact: true }).click();
await clickAndWait("Continue", "wake-time");
await page.locator('input[type="time"]').fill("07:30");
await clickAndWait("Continue", "bedtime-nudge");
await page
  .getByRole("button", { name: /^Yes, remind me/ })
  .click();
await waitForStep("analyzing");
await waitForStep("profile", 12_000);

await clickAndWait("See Sleep+", "preview");
await clickAndWait("See Sleep+", "email");

const emailInput = page.getByRole("textbox", { name: "Email address" });
await page.getByRole("button", { name: "Save my plan", exact: true }).click();
await page
  .getByText("Enter a valid email address.", { exact: true })
  .waitFor();
assert.equal(await emailInput.getAttribute("aria-invalid"), "true");

await emailInput.fill(email);
const subscribeResponsePromise = page.waitForResponse(
  (response) => response.url().endsWith("/api/subscribe"),
);
await page.getByRole("button", { name: "Save my plan", exact: true }).click();
const subscribeResponse = await subscribeResponsePromise;
assert.equal(subscribeResponse.status(), 503);
await page
  .getByText(
    "We could not save it just now, you can still continue",
    { exact: true },
  )
  .waitFor();
assert.equal(new URL(page.url()).searchParams.get("step"), "email");
await page.screenshot({
  path: ".tmp/funnel-qa/email-unavailable.png",
  fullPage: true,
});

await clickAndWait("Skip for now", "paywall");
await clickAndWait("Start 7-day free trial", "checkout");
await clickAndWait("Start free trial", "done");

await page.getByText(`Sign in with ${email}`, { exact: true }).waitFor();
await page
  .getByText(
    "Your answers could not be attached to your email yet, so SLEEP may ask them again",
    { exact: true },
  )
  .waitFor();

const storeButtons = page.locator('button[aria-disabled="true"]');
assert.equal(await storeButtons.count(), 2);
assert.deepEqual(
  await storeButtons.allTextContents(),
  ["Download onApp Store", "Get it onGoogle Play"],
);
for (const button of await storeButtons.all()) {
  assert.equal(await button.getAttribute("href"), null);
}

const doneLayout = await page.evaluate(() => ({
  horizontalOverflow:
    document.documentElement.scrollWidth - window.innerWidth,
  scrollX: window.scrollX,
  scrollY: window.scrollY,
}));
assert.ok(doneLayout.horizontalOverflow <= 1);
assert.equal(doneLayout.scrollX, 0);
assert.equal(doneLayout.scrollY, 0);

await page.keyboard.press("Tab");
assert.equal(
  await page.evaluate(() => document.activeElement?.textContent?.trim()),
  "Download onApp Store",
);
const focusStyle = await storeButtons.first().evaluate((element) => {
  const style = getComputedStyle(element);
  return {
    outlineStyle: style.outlineStyle,
    outlineWidth: style.outlineWidth,
  };
});
assert.notEqual(focusStyle.outlineStyle, "none");
assert.notEqual(focusStyle.outlineWidth, "0px");

await page.screenshot({
  path: ".tmp/funnel-qa/done.png",
  fullPage: true,
});

await page.setViewportSize({ width: 1440, height: 950 });
await page.goto(`${baseUrl}/start?step=done`, { waitUntil: "networkidle" });
const desktopFrame = await page.evaluate(() => {
  const frame = [...document.querySelectorAll("main#main > div")].find(
    (element) => getComputedStyle(element).maxWidth === "430px",
  );
  assertFrame(frame);
  const rect = frame.getBoundingClientRect();

  return {
    width: rect.width,
    left: rect.left,
    right: window.innerWidth - rect.right,
    reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
  };

  function assertFrame(element) {
    if (!element) {
      throw new Error("Centered 430px funnel frame was not found.");
    }
  }
});
assert.equal(desktopFrame.width, 430);
assert.ok(Math.abs(desktopFrame.left - desktopFrame.right) <= 1);
assert.equal(desktopFrame.reducedMotion, true);

const unexpectedConsoleErrors = consoleErrors.filter(
  (entry) => !entry.url.endsWith("/api/subscribe"),
);
assert.deepEqual(pageErrors, []);
assert.deepEqual(unexpectedConsoleErrors, []);

console.log(
  JSON.stringify(
    {
      deepLinks,
      flow: {
        email,
        subscribeStatus: subscribeResponse.status(),
        doneStep: new URL(page.url()).searchParams.get("step"),
        storeButtons: await storeButtons.allTextContents(),
        focusStyle,
        doneLayout,
        desktopFrame,
      },
      consoleErrors,
      pageErrors,
    },
    null,
    2,
  ),
);

await browser.close();
