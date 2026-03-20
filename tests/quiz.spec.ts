import { test, expect } from "@playwright/test";

test("opens the application", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("Viktoriin")).toBeVisible();
  await expect(page.getByTestId("question-text")).toBeVisible();
});

test("answers one question and shows immediate feedback", async ({ page }) => {
  await page.goto("/");

  await page.getByTestId("option-Tallinn").check();
  await page.getByTestId("button-Kontrolli").click();

  await expect(page.getByTestId("feedback-message")).toBeVisible();
  await expect(page.getByText("Õige vastus!")).toBeVisible();
});

test("tests wrong answer behavior", async ({ page }) => {
  await page.goto("/");

  await page.getByTestId("option-Tartu").check();
  await page.getByTestId("button-Kontrolli").click();

  await expect(page.getByTestId("feedback-message")).toBeVisible();
  await expect(
    page.getByText("Vale vastus! Õige vastus on: Tallinn"),
  ).toBeVisible();
});

test("completes the whole quiz and checks final result", async ({ page }) => {
  await page.goto("/");

  // Q1 correct
  await page.getByTestId("option-Tallinn").check();
  await page.getByTestId("button-Kontrolli").click();
  await page.getByTestId("button-Järgmine küsimus").click();

  // Q2 correct
  await page.getByTestId("option-Deltas").check();
  await page.getByTestId("button-Kontrolli").click();
  await page.getByTestId("button-Järgmine küsimus").click();

  // Q3 wrong
  await page.getByTestId("option-5").check();
  await page.getByTestId("button-Kontrolli").click();
  await page.getByTestId("button-Lõpeta").click();

  await expect(page.getByText("Viktoriini tulemused")).toBeVisible();
  await expect(page.getByTestId("final-score")).toHaveText("Sinu skoor: 2 / 3");
  await expect(page.getByTestId("results-table")).toBeVisible();

  await expect(page.getByTestId("result-row-0")).toContainText("Õige");
  await expect(page.getByTestId("result-row-1")).toContainText("Õige");
  await expect(page.getByTestId("result-row-2")).toContainText("Vale");
});

test("checks that the score changes depending on answers", async ({ page }) => {
  await page.goto("/");

  // all correct
  await page.getByTestId("option-Tallinn").check();
  await page.getByTestId("button-Kontrolli").click();
  await page.getByTestId("button-Järgmine küsimus").click();

  await page.getByTestId("option-Deltas").check();
  await page.getByTestId("button-Kontrolli").click();
  await page.getByTestId("button-Järgmine küsimus").click();

  await page.getByTestId("option-7").check();
  await page.getByTestId("button-Kontrolli").click();
  await page.getByTestId("button-Lõpeta").click();

  await expect(page.getByTestId("final-score")).toHaveText("Sinu skoor: 3 / 3");
});
